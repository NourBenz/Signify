import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import ProgressHeader from './progress_header';




const Profile = () => {
  // Example user data
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    profileImage: require('../assets/LP/LP1.png'), // Replace with your image path
    bio: 'Passionate about learning new things and exploring the world of sign language.',
    stats: {
      points: 120,
      streak: 1,
      signsLearned: 5,
    },
  });

  // Progress data
  const progressData = [
    { category: 'Points', progress: 0.75, value: `${user.stats.points}/160` },
    { category: 'Streak', progress: 0.3, value: `${user.stats.streak}/7` },
    { category: 'Signs', progress: 0.5, value: `${user.stats.signsLearned}/10` },
  ];

  // Achievements data
  const achievements = [
    { id: 1, name: 'Beginner', icon: '🏅', description: 'Complete 5 signs' },
    { id: 2, name: 'Streak Starter', icon: '🔥', description: '3-day streak' },
    { id: 3, name: 'Point Collector', icon: '⭐', description: 'Earn 100 points' },
  ];

  // Activity history
  const activityHistory = [
    { id: 1, activity: 'Learned "Hello"', date: '2023-10-01' },
    { id: 2, activity: 'Earned 20 points', date: '2023-10-02' },
    { id: 3, activity: 'Completed "Alphabet A-L"', date: '2023-10-03' },
  ];

  // Edit profile handler
  const handleEditProfile = () => {
    // Implement navigation or modal for editing profile
    console.log('Edit Profile Pressed');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={user.profileImage} style={styles.profileImage} />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Bio Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.bioText}>{user.bio}</Text>
      </View>

      {/* Progress Section */}
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

      {/* Achievements Section */}
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

   

      {/* Settings Section */}
      <View style={styles.section}>
        
        <Text style={styles.sectionTitle}>Settings</Text>
        <TouchableOpacity style={styles.settingItem}>
          <MaterialIcons name="notifications" size={24} color="#000" />
          <Text style={styles.settingText}>Notification Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <MaterialIcons name="security" size={24} color="#000" />
          <Text style={styles.settingText}>Privacy & Security</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <MaterialIcons name="help" size={24} color="#000" />
          <Text style={styles.settingText}>Help & Support</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.cont}>

      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bioText: {
    fontSize: 16,
    color: 'gray',
    lineHeight: 24,
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
    width: '48%',
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingText: {
    fontSize: 16,
    marginLeft: 10,
  },
  cont : {marginBottom: 55,},
});