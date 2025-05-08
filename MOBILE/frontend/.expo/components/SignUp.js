import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false); // For toggling password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // For toggling confirm password visibility

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleEmailChange = (email) => {
    setEmail(email);
    setEmailValid(validateEmail(email));
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
    setPasswordMatch(password === confirmPassword);
  };

  const handleConfirmPasswordChange = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
    setPasswordMatch(password === confirmPassword);
  };

  const handleSignUp = () => {
    if (password === confirmPassword && emailValid) {
      console.log("Signing up with:", email, password);
      // Add backend logic here
      navigation.navigate("Home"); // Navigate to Home page after successful sign up
    } else {
      alert("Please fix the errors!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.subtitle}>Join us today!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
      />
      {!emailValid && (
        <Text style={styles.error}>Please enter a valid email.</Text>
      )}

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!passwordVisible} // Toggle visibility based on state
          value={password}
          onChangeText={handlePasswordChange}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
        >
          <Text style={styles.eyeText}>{passwordVisible ? "👁️" : "🙈"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={!confirmPasswordVisible} // Toggle visibility based on state
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} // Toggle visibility
        >
          <Text style={styles.eyeText}>
            {confirmPasswordVisible ? "👁️" : "🙈"}
          </Text>
        </TouchableOpacity>
      </View>

      {!passwordMatch && (
        <Text style={styles.error}>Passwords do not match!</Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
        disabled={
          !emailValid || !passwordMatch || !password || !confirmPassword
        }
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.linkText}>
        Already have an account?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("SignIn")}>
          Sign In
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#304fff",
    padding: 16,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 8,
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
  },
  eyeText: {
    fontSize: 20,
  },
  button: {
    backgroundColor: "#ffb702",
    width: "100%",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  linkText: {
    color: "#fff",
    marginTop: 20,
  },
  link: {
    color: "#ffb702",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 12,
  },
});

export default SignUp;
