import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  withTheme,
  Card,
  List,
  Surface,
  Portal,
  Modal,
  FAB,
} from "react-native-paper";
import { useTheme } from "react-native-paper";
import { stylesInit } from "../../styles";
import { useEffect, useMemo, useState } from "react";
import ProgressBar from "@/components/ProgressBar";

export default withTheme(WeekScreen);
const seriesStyle = { fill: "white", fontWeight: "bold", fontSize: 15 };

interface status {
  color: string;
  icon: string;
}

const data: Record<string, status> = {
  Present: {
    color: "#4CAF50",
    icon: "checkbox-marked-circle-outline",
  },
  Absent: { color: "#F44336", icon: "close-circle-outline" },
  "Marked Present": { color: "#4CAF50", icon: "progress-check" },
  "Marked Absent": { color: "#F44336", icon: "progress-close" },
  "Must Go": { color: "#FFC107", icon: "progress-alert" },
  Holiday: { color: "#FFB74D", icon: "home-circle-outline" },
};

let status = {
  "2025-04-20": "Present",
  "2025-04-21": "Absent",
  "2025-04-22": "Present",
  "2025-04-23": "Absent",
  "2025-04-24": "Must Go",
  "2025-04-25": "Present",
  "2025-04-26": "Holiday",
};

function checkDate(dateStr: string): "past" | "today" | "future" {
  const inputDate = new Date(dateStr);
  const today = new Date();

  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (inputDate.getTime() < today.getTime()) {
    return "past";
  } else if (inputDate.getTime() > today.getTime()) {
    return "future";
  } else {
    return "today";
  }
}

function WeekScreen() {
  const theme = useTheme();

  const styles = useMemo(() => stylesInit(theme), [theme]);

  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const series = [
    { value: 67, color: "#4CAF50", label: { text: "Present", ...seriesStyle } },
    { value: 0, color: "#F44336", label: { text: "Absent", ...seriesStyle } },
  ];
  series[1].value = 100 - series[0].value;

  return (
    <SafeAreaView style={styles.container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.cardContainer}
          theme={{ colors: { backdrop: "rgba(0, 0, 0, 0.5)" } }}
        >
          <Card style={styles.card}>
            <Card.Title
              title={`Mark ${date} as`}
              titleStyle={{ textAlign: "center" }}
            />
            <Card.Content style={{ gap: 5 }}>
              {Object.entries(data)
                .filter(([key]) => !key.startsWith("Marked"))
                .map(([key, value], index) => (
                  <Surface
                    key={index}
                    elevation={2}
                    style={{ borderRadius: 8 }}
                  >
                    <List.Item
                      title={key}
                      titleStyle={{ textAlign: "center" }}
                      left={(props) => (
                        <List.Icon
                          {...props}
                          icon={value.icon}
                          color={value.color}
                        />
                      )}
                      onPress={async () => {
                        // const data = await profile.setStatus(date, key);
                        console.log(data);
                      }}
                    />
                  </Surface>
                ))}
            </Card.Content>
            <Card.Actions>
              <Surface key={0} elevation={2} style={{ borderRadius: 8 }}>
                <List.Item
                  title={`Close`}
                  titleStyle={{ textAlign: "center" }}
                  left={(props) => (
                    <List.Icon {...props} icon="close" color="red" />
                  )}
                  onPress={hideModal}
                />
              </Surface>
            </Card.Actions>
          </Card>
        </Modal>
      </Portal>

      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Title
            title="Current Attendance Percentage"
            titleStyle={{ textAlign: "center" }}
          />
          <Card.Content>
            <ProgressBar
              theme={theme}
              progress={series[0].value / 100}
              styles={styles}
              title={`Current Attendance: ${series[0].value}%`}
            />
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Title
            title="Decide your holidays."
            subtitle="Recommended that you take 2/6 Holidays"
            titleStyle={{ textAlign: "center" }}
            subtitleStyle={{ textAlign: "center" }}
          />
          <Card.Content style={{ gap: 5 }}>
            {Object.entries(status).map(([day, state], index) => (
              <Surface key={index} elevation={2} style={{ borderRadius: 8 }}>
                <List.Item
                  title={`${day} - ${(() => {
                    const time = checkDate(day);

                    if (!["past", "today"].includes(time) && state != "Holiday")
                      state = "Marked " + state;

                    return state;
                  })()}`}
                  titleStyle={{ textAlign: "center" }}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon={data[state as keyof typeof data].icon}
                      color={data[state as keyof typeof data].color}
                    />
                  )}
                  onPress={() => {
                    showModal();
                    setDate(day);
                  }}
                />
              </Surface>
            ))}
          </Card.Content>
        </Card>
      </View>
      <FAB
        icon="logout"
        style={{ 
          position: "absolute",
          alignSelf: "flex-end",
          margin: 10,
          bottom: 0,
          right: 5
        }}
        variant="surface"
        onPress={console.log}
      />
    </SafeAreaView>
  );
}
