import { MD3Theme as Theme, Text } from "react-native-paper";
import { View } from "react-native";

export default function ProgressBar({
  theme,
  progress,
  styles,
  title,
}: {
  theme: Theme;
  progress: number;
  styles: any;
  title: string;
}) {
  return (
    <View style={{ width: "100%" }}>
      <Text
        style={[styles.text, { alignSelf: "center" }]}
        variant="titleMedium"
      >
        {title}
      </Text>
      <View
        style={{
          width: "100%",
          height: 10,
          backgroundColor: "#F44336",
          borderRadius: 5,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <View
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            backgroundColor: "#4CAF50",
            position: "absolute",
            left: 0,
          }}
        />
      </View>
    </View>
  );
}
