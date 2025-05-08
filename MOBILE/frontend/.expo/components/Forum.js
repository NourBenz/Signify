import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Text} from "react-native";
import Question from "../temp/Question";

const { width } = Dimensions.get("window");

const Forum = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");

  const handlePostQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([
        ...questions,
        { id: questions.length + 1, text: newQuestion, replies: [] },
      ]);
      setNewQuestion("");
    }
  };

  const handleReply = (questionId, replyText) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, replies: [...q.replies, replyText] } : q
      )
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {questions.map((question) => (
          <Question
            key={question.id}
            question={question.text}
            onReply={(replyText) => handleReply(question.id, replyText)}
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.postButton} onPress={handlePostQuestion} >
        <Text style={styles.postButtonText}>Post a Question</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#304FFE",
    width: Dimensions.get("window").width,
    alignItems: "center"
    
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  postButton: {
    padding: 16,
    backgroundColor: '#FFFFFF', 
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 16,
    width: 200,
  },
  postButtonText: {
    color: '#000000',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Forum;
