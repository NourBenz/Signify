import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  BackHandler,
  SafeAreaView,
  Alert
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/fbConfig';
import { fetchVideos } from '../../firebase/vidServices';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Ionicons } from '@expo/vector-icons';

const DailyChallengeScreen = () => {
    const navigation = useNavigation();
    const [videos, setVideos] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [choices, setChoices] = useState([]);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const playerRef = useRef();

   

    useEffect(() => {
        async function loadChallenge() {
            try {
                setLoading(true);
                const unitsSnapshot = await getDocs(collection(db, 'units'));
                const units = unitsSnapshot.docs.map(doc => ({ id: doc.id }));

                let allVideos = [];
                for (const unit of units) {
                    const unitVideos = await fetchVideos(unit.id);
                    allVideos.push(...unitVideos);
                }

                const shuffledVideos = shuffleArray(allVideos);
                const selected = shuffledVideos.slice(0, 10); // Take 10 random videos
                
                setVideos(selected);
                if (selected.length > 0) {
                    generateChoices(selected[0], selected);
                }
            } catch (error) {
                console.error('Error loading challenge:', error);
                Alert.alert("Error", "Failed to load daily challenge");
            } finally {
                setLoading(false);
            }
        }

        loadChallenge();
    }, []);

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const generateChoices = (correctVideo, allVideos) => {
        let options = [correctVideo];
        while (options.length < 4) {
            const random = allVideos[Math.floor(Math.random() * allVideos.length)];
            if (!options.find(opt => opt.id === random.id)) {
                options.push(random);
            }
        }
        const shuffledOptions = shuffleArray(options).map(option => ({
            title: option.title,
            isCorrect: option.id === correctVideo.id,
        }));
        setChoices(shuffledOptions);
    };

    const handleAnswer = useCallback((isCorrect) => {
        const newScore = isCorrect ? score + 1 : score;
        
        if (currentVideoIndex < videos.length - 1) {
            const nextIndex = currentVideoIndex + 1;
            setCurrentVideoIndex(nextIndex);
            setScore(newScore);
            generateChoices(videos[nextIndex], videos);
        } else {
            // Navigate to quiz results with proper params
            navigation.replace('quizResults', {
                score: newScore,
                totalQuestions: videos.length,
                quizType: 'dailyChallenge',
                unitId: null // Indicates this is a daily challenge
            });
        }
    }, [currentVideoIndex, videos, score, navigation]);

    const handleQuitChallenge = useCallback(() => {
        Alert.alert(
          "Quit Challenge",
          "Are you sure you want to quit? Your progress will be lost.",
          [
            { text: "Cancel", style: "cancel" },
            { 
              text: "Quit", 
              onPress: () => {
                // Navigate to LearnScreen and reset the stack
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'LearnScreen' }],
                });
              }
            }
          ]
        );
      }, [navigation]);

    const getYouTubeVideoId = (url) => {
        if (!url) return null;
        const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regExp);
        return match ? match[1] : null;
    };

    if (loading || videos.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3B82F6" />
                <Text>Preparing your daily challenge...</Text>
            </View>
        );
    }

    const currentVideo = videos[currentVideoIndex];
    const youtubeVideoId = getYouTubeVideoId(currentVideo.videoURL);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header with progress and quit button */}
                <View style={styles.header}>
                    <Text style={styles.progressText}>
                        Question {currentVideoIndex + 1} of {videos.length}
                    </Text>
                    <TouchableOpacity onPress={handleQuitChallenge}>
                        <Ionicons name="exit-outline" size={24} color="#E53935" />
                    </TouchableOpacity>
                </View>

                {/* Score display */}
                <Text style={styles.scoreText}>Score: {score}</Text>

                {/* Video player */}
                <View style={styles.videoContainer}>
                    {youtubeVideoId ? (
                        <YoutubePlayer
                            height={215}
                            play={false}
                            videoId={youtubeVideoId}
                        />
                    ) : (
                        <View style={styles.videoPlaceholder}>
                            <Text>Video not available</Text>
                        </View>
                    )}
                </View>

                {/* Answer choices */}
                <View style={styles.choicesContainer}>
                    {choices.map((choice, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.choiceButton}
                            onPress={() => handleAnswer(choice.isCorrect)}
                        >
                            <Text style={styles.choiceText}>{choice.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    progressText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    scoreText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#3B82F6',
    },
    videoContainer: {
        width: '100%',
        aspectRatio: 16/9,
        backgroundColor: '#000',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 20,
    },
    videoPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
    },
    choicesContainer: {
        marginTop: 10,
    },
    choiceButton: {
        backgroundColor: '#f0f4ff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 12,
    },
    choiceText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
    },
});

export default DailyChallengeScreen;