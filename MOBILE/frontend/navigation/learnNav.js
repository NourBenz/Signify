import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { BackHandler } from "react-native";

// Learning Flow Screens
import LearnScreen from "../screens/main/LearnScreen";
import DailyChallengeScreen from "../screens/quiz/DailyChallengeScreen";
import Lessons from "../screens/main/Lessons";
import LessonDetail from "../screens/main/LessonDetail";
import UnitsScreen from "../screens/main/Units";
import QuizScreen from "../screens/quiz/quizScreen";
import QuizResults from "../screens/quiz/quizResults";

const Stack = createStackNavigator();

const LearnStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        gestureEnabled: !["DailyChallenge", "QuizScreen"].includes(route.name),
      })}
    >
      {/* Main Learning Hub */}
      <Stack.Screen name="LearnScreen" component={LearnScreen} />

      {/* Unit Selection */}
      <Stack.Screen
        name="Units"
        component={UnitsScreen}
        options={{
          headerShown: true,
          title: "All Units",
          headerBackTitleVisible: false,
        }}
      />

      {/* Lesson Flow */}
      <Stack.Screen
        name="Lessons"
        component={Lessons}
        options={({ route }) => ({
          headerShown: true,
          title: route.params?.unitTitle || "Lessons",
          headerBackTitleVisible: false,
        })}
      />

      <Stack.Screen name="LessonDetail" component={LessonDetail} />

      {/* Quiz Flow */}
      <Stack.Screen
        name="DailyChallenge"
        component={DailyChallengeScreen}
        options={{
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="QuizScreen"
        component={QuizScreen}
        options={{
          gestureEnabled: false,
        }}
      />

      <Stack.Screen name="QuizResults" component={QuizResults} />
    </Stack.Navigator>
  );
};

export default LearnStack;
