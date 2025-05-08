import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Dimensions,
  BackHandler,
  SafeAreaView
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Ionicons } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/fbConfig';
import { fetchVideos } from '../../firebase/vidServices';

const { width } = Dimensions.get('window');

const DailyChallengeScreen = ({ navigation }) => {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [choices, setChoices] = useState([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleQuitChallenge = useCallback(() => {
    Alert.alert(
      "Quit Challenge",
      "Are you sure you want to quit? Your progress will be lost.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Quit", 
          style: "destructive",
          onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: 'LearnScreen' }]
          })
        }
      ]
    );
  }, [navigation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        handleQuitChallenge();
        return true;
      }
    );
    return () => backHandler.remove();
  }, [handleQuitChallenge]);

  useEffect(() => {
    const loadChallenge = async () => {
      try {
        setLoading(true);
        const unitsSnapshot = await getDocs(collection(db, 'units'));
        const units = unitsSnapshot.docs.map(doc => ({ id: doc.id }));
        
        let allVideos = [];
        for (const unit of units) {
          const unitVideos = await fetchVideos(unit.id);
          allVideos.push(...unitVideos);
        }

        const shuffledVideos = shuffleArray(allVideos).slice(0, 10);
        setVideos(shuffledVideos);
        if (shuffledVideos.length > 0) {
          generateChoices(shuffledVideos[0], shuffledVideos);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load challenge");
      } finally {
        setLoading(false);
      }
    };

    loadChallenge();
  }, []);

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  const generateChoices = (correctVideo, allVideos) => {
    let options = [correctVideo];
    while (options.length < 4) {
      const randomVideo = allVideos[Math.floor(Math.random() * allVideos.length)];
      if (!options.some(v => v.id === randomVideo.id)) {
        options.push(randomVideo);
      }
    }
    setChoices(shuffleArray(options).map(video => ({
      title: video.title,
      isCorrect: video.id === correctVideo.id
    })));
  };

  const handleAnswer = (isCorrect) => {
    const newScore = isCorrect ? score + 1 : score;
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setScore(newScore);
      generateChoices(videos[currentIndex + 1], videos);
    } else {
      const percentage = Math.round((newScore / videos.length) * 100);
      Alert.alert(
        "Challenge Complete!",
        `Your score: ${newScore}/${videos.length} (${percentage}%)`,
        [
          { 
            text: "OK", 
            onPress: () => navigation.reset({
              index: 0,
              routes: [{ name: 'LearnScreen' }]
            })
          }
        ]
      );
    }
  };

  if (loading || !videos.length) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text>Loading challenge...</Text>
      </View>
    );
  }

  const currentVideo = videos[currentIndex];
  const videoId = currentVideo.videoURL.split('v=')[1]?.split('&')[0];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progress}>
          Question {currentIndex + 1}/{videos.length}
        </Text>
        <TouchableOpacity onPress={handleQuitChallenge}>
          <Ionicons name="exit-outline" size={24} color="#E53935" />
        </TouchableOpacity>
      </View>

      <Text style={styles.score}>Score: {score}</Text>

      <View style={styles.videoWrapper}>
        <View style={styles.videoContainer}>
          <YoutubePlayer
            height={(width - 32) * 0.5625}
            width={width - 32}
            play={false}
            videoId={videoId}
          />
        </View>
      </View>
    
      <View style={styles.choicesContainer}>
        {choices.map((choice, i) => (
          <TouchableOpacity
            key={i}
            style={styles.choiceButton}
            onPress={() => handleAnswer(choice.isCorrect)}
          >
            <Text style={styles.choiceText}>{choice.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  progress: {
    fontSize: 16,
    fontWeight: '600'
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  choicesContainer: {
    marginTop: 20
  },
  choiceButton: {
    backgroundColor: '#f0f4ff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12
  },
  choiceText: {
    textAlign: 'center',
    fontSize: 16
  }, 
  videoWrapper: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    alignItems: 'center',
  },
  videoContainer: {
    width: width - 32,
    height: (width - 32) * 0.5625,
    backgroundColor: '#000',
    marginVertical: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default DailyChallengeScreen;