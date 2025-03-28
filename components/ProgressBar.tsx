import {  MD3Theme as Theme } from 'react-native-paper';
import { View, Text } from "react-native";

export default function ProgressBar({ theme, progress, styles, title }: { theme: Theme, progress: number, styles: any, title: string }) {

  return (
    <View style={{ width: "100%"}}>
      <Text style={styles.text}>{title}</Text>
      <View style={{
        width: "100%",
        height: 10, 
        backgroundColor: theme.colors.onPrimaryContainer,
        borderRadius: 5,
        overflow: "hidden",
        position: "relative",
      }}>
        <View
          style={{
            width: `${progress*100}%`,
            height: "100%",
            backgroundColor: theme.colors.primary,
            position: "absolute",
            left: 0,
          }}
        />
      </View>
    </View>
  );
}