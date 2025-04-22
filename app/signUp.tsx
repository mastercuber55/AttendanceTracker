import { View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  withTheme,
  Card,
  Text,
  TextInput,
  Button,
  HelperText,
} from "react-native-paper";
import { useTheme } from "react-native-paper";
import { stylesInit } from "./styles";
import { useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/utils/auth";

export default withTheme(Login);

function Login() {
  const router = useRouter();
  const theme = useTheme();
  const auth = useAuth();
  const styles = useMemo(() => stylesInit(theme), [theme]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorType, setErrorType] = useState("");
  const [loading, setLoading] = useState(false);

  const handler = async () => {
    setErrorMessage("");
    setErrorType("");

    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9 ]{2,}[a-zA-Z0-9]$/;
    const isUsernameValid = usernameRegex.test(username);

    if (!isUsernameValid) {
      setErrorType("usernameError");
      setErrorMessage(
        `The username must be atleast 4 characters long, start with a letter, only contain letters , numbers, spaces! 🤓`
      );
      return;
    }

    if (password != repassword) {
      setErrorType("passwordError");
      setErrorMessage("The passwords do not match. 😔☝");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    const isPasswordValid = passwordRegex.test(password);

    if (!isPasswordValid) {
      setErrorType("passwordError");
      setErrorMessage(
        "The password must be atleast 6 characters long, must have, atleast a uppercase letter, atleast a lowercase letter, atleast a number, atleast a special character. 🤓"
      );
      return;
    }

    if (errorType != "") return;

    setLoading(true);

    const [data, error] = await auth.signup({ username, password });

    if (data) {
      router.replace("/(tabs)");
    }

    if (error) {
      setErrorType("authError");
      if (error == "already exists")
        setErrorMessage(
          "Seems like the account already exists, perhaps you wanted to login??."
        );
      else {
        setErrorMessage(error);
        console.log(error);
      }
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../assets/images/icon.png")}
          style={{ width: 32, height: 32, marginRight: 8 }}
        />
        <Text
          variant="displaySmall"
          style={[styles.textCentered, { paddingBottom: 25 }]}
        >
          Attendance Tracker
        </Text>
      </View>
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Title
            title="Create an account."
            titleStyle={{ textAlign: "center" }}
            titleVariant="titleLarge"
          />
          {errorType != "" && (
            <HelperText
              padding="normal"
              type="error"
              visible={errorType != ""}
              style={{ alignSelf: "center" }}
            >
              {errorMessage}
            </HelperText>
          )}
          <Card.Content>
            <TextInput
              mode="outlined"
              label="Enter your beloved username."
              placeholder="sosukeaizen"
              onChangeText={setUsername}
              error={errorType == "usernameError"}
            />
            <TextInput
              mode="outlined"
              label="Enter your magical password."
              placeholder="projectIchigo@4290"
              onChangeText={setPassword}
              error={errorType == "passwordError"}
              right={
                <TextInput.Icon
                  icon="eye"
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
            <TextInput
              mode="outlined"
              label="Confirm your magical password."
              placeholder="projectIchigo@4290"
              onChangeText={setRepassword}
              error={errorType == "passwordError"}
              right={
                <TextInput.Icon
                  icon="eye"
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
            <Button
              mode="contained-tonal"
              style={{ borderRadius: 4, marginTop: 20 }}
              loading={loading}
              onPress={handler}
            >
              Sign Up
            </Button>
            <Text
              style={{ alignSelf: "center", paddingTop: 10 }}
              onPress={() => router.navigate("/login")}
            >
              Looking to login into your existing account? Login.
            </Text>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
}
