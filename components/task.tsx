import { MD3Theme as Theme, Checkbox  } from 'react-native-paper';
import { useState } from "react";
import { View, Text } from "react-native";

export default function Task({ styles, name, theme }: { styles: any, name: string, theme: Theme }) {

  const [checked, setChecked] = useState(false);

  return (
    <View style={{ flexDirection: "row", width: "100%" }}>
      <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked(!checked)}/>
      <Text style={[styles.text, {paddingTop: 5}]}>{name}</Text>
    </View>
  );
}