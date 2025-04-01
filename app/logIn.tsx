import { View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withTheme, Card, Text, TextInput, Button  } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { stylesInit } from './styles';
import { useMemo, useState } from 'react';
import Divider from '@/components/Divider';

export default withTheme(LogIn)

function LogIn() {

  const theme = useTheme();
  const styles = useMemo(() => stylesInit(theme), [theme]);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
            source={require("../assets/images/icon.png")}
            style={{ width: 32, height: 32, marginRight: 8 }}
          />
        <Text variant='displaySmall' style={[styles.textCentered, {paddingBottom: 25}]}>
          Attendance Tracker
        </Text>
      </View>
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Title title="Log in into your account." titleStyle={{ textAlign: 'center' }} titleVariant='titleLarge'/>
          <Card.Content>
            <TextInput
              mode="outlined"
              label="Enter your beloved email."
              placeholder='sosukeaizen@soulsociety.com'
              onChangeText={setEmail}
            />
            <TextInput
              mode="outlined"
              secureTextEntry={!showPassword}
              label="Enter your magical password."
              placeholder='projectIchigo4290'
              onChangeText={setPassword}
              right={
                <TextInput.Icon icon="eye" onPress={() => setShowPassword(!showPassword)}/>
              }
            />
            <Button mode="contained-tonal" style={{ borderRadius: 4, marginTop: 20 }}>Log In with Email</Button>
            {/* <Divider text="OR" theme={theme} percentage="45%"/> */}
            {/* <Button mode="contained-tonal" style={{ borderRadius: 4, marginTop: 5 }}>Log In With Google</Button> */}
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
}
