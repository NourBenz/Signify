import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
import ProgressHeader from "./progress_header";

const units = [
  { id: 1, title: 'Welcome', progress: 0.75, image: require('../assets/units/Star.png'), lessons: 5 },
  { id: 2, title: 'Introduction', progress: 0.5, image: require('../assets/units/introduction.png'), lessons: 3 },
  { id: 3, title: 'Numbers', progress: 0.25, image: require('../assets/units/numbers.png'), lessons: 4 },
  { id: 4, title: 'Small Talk', progress: 0.9, image: require('../assets/units/small_talk.png'), lessons: 6 },
  { id: 5, title: 'Facial Expressions', progress: 0.6, image: require('../assets/units/facial_expressions.png'), lessons: 7 },
  { id: 6, title: 'Alphabet A-L', progress: 0.3, image: require('../assets/units/alpha.png'), lessons: 8 },
  { id: 7, title: 'Alphabet M-Z', progress: 0.8, image: require('../assets/units/ha.png'), lessons: 8 },
  { id: 8, title: 'Everyday Signs', progress: 0.4, image: require('../assets/units/everyday_signs.png'), lessons: 10 },
  { id: 9, title: 'Family', progress: 0.7, image: require('../assets/units/Family.png'), lessons: 12 },
];

const LearnScreen = () => {
  const renderUnit = ({ item }) => (
    <TouchableOpacity style={styles.unitCard}>
      <Image source={item.image} style={styles.unitImage} />
      <Text style={styles.unitTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.lessonsText}>{`${item.lessons} lessons`}</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${item.progress * 100}%` }]} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
    <ProgressHeader />
    <FlatList
      data={units}
      renderItem={renderUnit}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2} // Display items in two columns
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 16,
    backgroundColor: '#f5f5f5',
  },
  unitCard: {
    width: screenWidth * 0.46, // 46% of the screen width for each card
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  unitImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  unitTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  lessonsText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  progressBar: {
    width: '80%',
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
  },
});

export default LearnScreen;
