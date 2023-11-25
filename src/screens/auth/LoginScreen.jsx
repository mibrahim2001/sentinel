import { View, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import { Button, Input, Text } from "@rneui/themed";
import { COLORS } from "../../constants";
import useAuth from "../../hooks/useAuth";

const Login = ({ navigation }) => {
  // Variables
  const { login } = useAuth();
  const [email, setEmail] = useState({ value: null, errorMessage: null });
  const [password, setPassword] = useState({ value: null, errorMessage: null });

  // Event handlers
  const handleRegisterNowPress = () => {
    navigation.navigate("Register");
  };

  const handleLoginPress = () => {
    setEmail({ ...email, errorMessage: null });
    setPassword({ ...password, errorMessage: null });
    if (!email.value) {
      setEmail({ ...email, errorMessage: "Please fill out all fields." });
    }
    if (!password.value) {
      setPassword({ ...password, errorMessage: "Please fill out all fields." });
    }
    if (!(email.value && password.value)) {
      return;
    }

    try {
      login(email.value, password.value);
    } catch (error) {
      console.error("Error while loggin in: ", error);
    }
  };

  return (
    <ScrollView
      style={{ width: "100%" }}
      contentContainerStyle={{
        flexGrow: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
      }}
    >
      <Text h2>Login</Text>
      <View
        style={{ width: "100%", alignItems: "center", paddingVertical: 40 }}
      >
        <Input
          label={"Email"}
          labelStyle={styles.inputLabel}
          value={email.value}
          onChangeText={(value) => setEmail({ ...email, value: value })}
          errorMessage={email.errorMessage}
        />
        <Input
          label={"Password"}
          labelStyle={styles.inputLabel}
          value={password.value}
          onChangeText={(value) => setPassword({ ...password, value: value })}
          errorMessage={password.errorMessage}
          secureTextEntry
        />

        <Button
          color="primary"
          title={"Login"}
          size="lg"
          containerStyle={{ width: 200, borderRadius: 5 }}
          onPress={handleLoginPress}
        />
      </View>
      <Text style={{ paddingVertical: 10 }}>
        Don't have an account?{" "}
        <Text
          style={{ color: "blue", fontWeight: "bold" }}
          onPress={handleRegisterNowPress}
        >
          Register Now
        </Text>
      </Text>
    </ScrollView>
  );
};

export default Login;
const styles = StyleSheet.create({
  inputLabel: {
    color: COLORS.black,
  },
});
