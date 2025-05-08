import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { BackHandler } from "react-native";

// Learning Flow Screens
import LearnScreen from "../screens/main/LearnScreen";
import DailyChallengeScreen from "../screens/quiz/DailyChallengeScreen";
import Lessons from "../screens/main/Lessons";
import LessonDetail from "../screens/main/LessonDetail";
import QuizScreen from "../screens/quiz/quizScreen";
import QuizResults from "../screens/quiz/quizResults";

const Stack = createStackNavigator();

const LearnStack = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        const routeName = navigation.getCurrentRoute()?.name;
        if (["DailyChallenge", "QuizScreen"].includes(routeName)) {
          return true; // Block back in these screens
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [navigation]);
  
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        gestureEnabled: !["DailyChallenge", "QuizScreen"].includes(route.name),
      })}
    >
      <Stack.Screen name="LearnScreen" component={LearnScreen} />
      <Stack.Screen name="DailyChallenge" component={DailyChallengeScreen} />
      <Stack.Screen
        name="Lessons"
        component={Lessons}
        options={({ route }) => ({
          headerShown: true,
          title: route.params?.unitTitle || "Lessons",
        })}
      />
      <Stack.Screen name="LessonDetail" component={LessonDetail} />
      <Stack.Screen name="QuizScreen" component={QuizScreen} />
      <Stack.Screen name="QuizResults" component={QuizResults} />
    </Stack.Navigator>
  );
};

export default LearnStack;
