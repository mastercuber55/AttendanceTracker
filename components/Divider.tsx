import { View } from "react-native";
import { Divider, MD3Theme, Text } from "react-native-paper";

export default function ({
  text = "",
  theme,
  percentage,
}: {
  text: string;
  theme: MD3Theme;
  percentage: any;
}) {
  const style: any = {
    backgroundColor: theme.colors.primary,
    width: percentage,
    alignSelf: "center",
    marginVertical: 10,
    height: 3,
  };

  if (text != "")
    return (
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Divider bold={true} theme={theme} style={style} />
        <Text style={{ paddingTop: 3, fontWeight: "bold" }} variant="bodyLarge">
          {text}
        </Text>
        <Divider bold={true} theme={theme} style={style} />
      </View>
    );
  else return <Divider bold={true} theme={theme} style={style} />;
}
