import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import ProgressHeader from './progress_header';

const Progress = () => {
  
  const progressData = [
    { category: 'Points', progress: 0.75, value: '120/160' },
    { category: 'Streak', progress: 0.3, value: '1/7' },
    { category: 'Signs', progress: 0.5, value: '5/10' },
  ];

 
  const achievements = [
    { id: 1, name: 'Beginner', icon: '🏅', description: 'Complete 5 signs' },
    { id: 2, name: 'Streak Starter', icon: '🔥', description: '3-day streak' },
    { id: 3, name: 'Point Collector', icon: '⭐', description: 'Earn 100 points' },
  ];

 
  const activityHistory = [
    { id: 1, activity: 'Learned "Hello"', date: '2023-10-01' },
    { id: 2, activity: 'Earned 20 points', date: '2023-10-02' },
    { id: 3, activity: 'Completed "Alphabet A-L"', date: '2023-10-03' },
  ];

  return (
    <ScrollView style={styles.container}>

      <ProgressHeader />
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Progress</Text>
        {progressData.map((item, index) => (
          <View key={index} style={styles.progressBarContainer}>
            <Text style={styles.progressLabel}>{item.category}</Text>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressFill, { width: `${item.progress * 100}%` }]}
              />
            </View>
            <Text style={styles.progressValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementsContainer}>
          {achievements.map((achievement) => (
            <View key={achievement.id} style={styles.achievementCard}>
              <Text style={styles.achievementIcon}>{achievement.icon}</Text>
              <Text style={styles.achievementName}>{achievement.name}</Text>
              <Text style={styles.achievementDescription}>{achievement.description}</Text>
            </View>
          ))}
        </View>
      </View>

      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {activityHistory.map((activity) => (
          <View key={activity.id} style={styles.activityItem}>
            <Text style={styles.activityText}>{activity.activity}</Text>
            <Text style={styles.activityDate}>{activity.date}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginTop:15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressBarContainer: {
    marginBottom: 15,
  },
  progressLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50', // Green color for progress
  },
  progressValue: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  achievementsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: '48%', // Two cards per row
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  achievementIcon: {
    fontSize: 30,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  achievementDescription: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  activityText: {
    fontSize: 16,
  },
  activityDate: {
    fontSize: 14,
    color: 'gray',
  },
});