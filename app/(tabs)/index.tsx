import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  withTheme,
  Card,
  Text,
  SegmentedButtons,
  Surface,
  List,
} from "react-native-paper";
import { useTheme } from "react-native-paper";
import { stylesInit } from "../../styles";
import { useMemo, useState } from "react";
import PieChart from "react-native-pie-chart";
import Attendance from "@/Attendance";

export default withTheme(HomeScreen);

const seriesStyle = { fill: "white", fontWeight: "bold", fontSize: 15 };

function HomeScreen() {

  const theme = useTheme();
  const styles = useMemo(() => stylesInit(theme), [theme]);

  const [today, setToday] = useState<string>("");

  const series = [
    { value: 67, color: "#4CAF50", label: { text: "Present", ...seriesStyle } },
    { value: 0, color: "#F44336", label: { text: "Absent", ...seriesStyle } },
  ];
  series[1].value = 100 - series[0].value;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Title
            title="Current Attendance Percentage"
            titleStyle={{ textAlign: "center" }}
          />
          <Card.Content>
            <View
              style={{
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PieChart
                widthAndHeight={256}
                series={series}
                cover={0.5}
                padAngle={0.05}
              />
              <Text
                style={{
                  position: "absolute",
                  fontSize: 50,
                  fontWeight: "bold",
                  color: "#4CAF50",
                }}
              >
                {series[0].value}%
              </Text>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Title
            title="Quick View and Actions"
            titleStyle={{ textAlign: "center" }}
          />
          <Card.Content>
            <Text style={styles.text} variant="bodyLarge">
              Mark Today As
            </Text>
          </Card.Content>
          <Surface elevation={2} style={{ borderRadius: 8 }}>
            <SegmentedButtons
              value={today}
              onValueChange={async (text) => {
                const date = new Date().toISOString().split("T")[0];
                setToday(text);

                // const data = await profile.setStatus(date, text);
                const result = await Attendance.setDate(date, text)
                // Implement react native paper snackbar here
              }}
              style={{ width: "100%" }}
              buttons={[
                {
                  value: "Present",
                  label: "Present",
                  icon: "checkbox-marked-circle-outline",
                  style: styles.SegBtn,
                  checkedColor: theme.colors.primary,
                  uncheckedColor: theme.colors.onSurface,
                },
                {
                  value: "Absent",
                  label: "Absent",
                  icon: "close-circle-outline",
                  style: styles.SegBtn,
                  checkedColor: theme.colors.primary,
                  uncheckedColor: theme.colors.onSurface,
                },
              ]}
            />
          </Surface>
          <View style={{ padding: 5 }} />
          <Card.Content>
            <Text style={styles.text} variant="bodyLarge">
              Next to Attend
            </Text>
          </Card.Content>
          <Surface elevation={2} style={{ borderRadius: 8 }}>
            <List.Item
              title="24th - Monday - Tommorrow"
              titleStyle={{ textAlign: "center" }}
            />
          </Surface>
        </Card>
      </View>
    </SafeAreaView>
  );
}
