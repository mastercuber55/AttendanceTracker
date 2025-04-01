import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withTheme, Card, Text, List, Surface, Portal, Modal, Icon  } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { stylesInit } from '../styles';
import { useMemo, useState } from 'react';
import ProgressBar from '@/components/ProgressBar';
import { Calendar } from 'react-native-calendars';

export default withTheme(WeekScreen)
const seriesStyle = { fill: "white", fontWeight: "bold", fontSize: 15 }

const data = {
  "Already Present": { color: "#4CAF50", icon: "checkbox-marked-circle-outline" },
  "Already Absent": { color: "#F44336", icon: "close-circle-outline" },
  "Marked Present": { color: "#4CAF50", icon: "progress-check" },
  "Marked Absent": { color: "#F44336", icon: "progress-close" },
  "Marked Must Go": { color: "#FFC107", icon: "progress-alert" },
  "Marked Holiday": { color: "#FFB74D", icon: "home-circle-outline" }
};

const status = {
  "1": "Already Present",
  "2": "Already Absent",
  "3": "Marked Present",
  "4": "Marked Absent",
  "5": "Marked Must Go",
  "6": "Marked Present",
  "7": "Marked Holiday",
  "8": "Already Present",
  "9": "Already Absent",
  "10": "Marked Present",
  "11": "Marked Absent",
  "12": "Marked Must Go",
  "13": "Marked Present",
  "14": "Marked Holiday",
  "15": "Already Present",
  "16": "Already Absent",
  "17": "Marked Present",
  "18": "Marked Absent",
  "19": "Marked Must Go",
  "20": "Marked Present",
  "21": "Marked Holiday",
  "22": "Already Present",
  "23": "Already Absent",
  "24": "Marked Present",
  "25": "Marked Absent",
  "26": "Marked Must Go",
  "27": "Marked Present",
  "28": "Marked Holiday",
  "29": "Already Present",
  "30": "Already Absent",
  "31": "Marked Present"
};
 
function WeekScreen() {

  const theme = useTheme();
  
  const styles = useMemo(() => stylesInit(theme), [theme]);

  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState<{ dateString: string; day: number; month: number; year: number }>()

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const series = [
    { value: 67, color: '#4CAF50', label: { text: "Present", ...seriesStyle } },
    { value: 0, color: '#F44336', label: { text: "Absent", ...seriesStyle } },
  ];
  series[1].value = 100 - series[0].value;

  
  return (
    
    <SafeAreaView style={styles.container}>
        
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.cardContainer} theme={{ colors: { backdrop: "rgba(0, 0, 0, 0.5)" }}}>
            <Card style={styles.card}>
              <Card.Title title={`Mark ${date?.day} as`} titleStyle={{ textAlign: 'center' }}/>
              <Card.Content style={{ gap: 5 }}>
                {Object.entries(data)
                  .filter(([key]) => key.startsWith("Marked"))
                  .map(([key, value], index) => (
                    <Surface key={index} elevation={2} style={{ borderRadius: 8 }}>
                      <List.Item
                        title={key.split(' ').slice(1).join(' ')}
                        titleStyle={{ textAlign: 'center' }}
                        left={props => <List.Icon {...props} icon={value.icon} color={value.color} />}
                        onPress={() => console.log(`Selected: ${key}`)}
                      />
                    </Surface>
                ))}
              </Card.Content>
              <Card.Actions>
                <Surface key={0} elevation={2} style={{ borderRadius: 8 }}>
                  <List.Item
                    title={`Close`}
                    titleStyle={{ textAlign: 'center' }}
                    left={props => <List.Icon {...props} icon="close" color="red" />}
                    onPress={hideModal}
                  />
                </Surface>
              </Card.Actions>
            </Card>
          </Modal>
        </Portal>

      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Title title="Current Attendance Percentage" titleStyle={{ textAlign: 'center' }}/>
          <Card.Content>
            <ProgressBar theme={theme} progress={series[0].value/100} styles={styles} title={`Current Attendance: ${series[0].value}%`}/>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Title title="Calendar View" titleStyle={{ textAlign: 'center' }} subtitle="View allllll of your attendances." subtitleStyle={{ textAlign: "center" }}/>
            <Card.Content>
              <Calendar

                // minDate={'2025-03-01'}
                // maxDate={'2025-04-30'}

                dayComponent={({ date, state }: { date: { dateString: string; day: number; month: number; year: number }; state: string }) => {

                  let textColor;
                  
                  switch (state) {
                    case "disabled":
                      textColor = theme.colors.onSurfaceDisabled;
                      break;
                    case 'today':
                      textColor = theme.colors.primary
                      break;
                    default:
                      textColor = theme.colors.onSurface;
                  }

                  return (
                    <View>
                      <Surface
                        elevation={2}
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 8,
                          alignItems: 'center',
                          justifyContent: 'center',
                          // backgroundColor: `${data[state as keyof typeof data].color}90`, // Adding transparency
                        }}
                        onTouchEnd={() => {
                          setVisible(true);
                            setDate(date);
                          }}
                          >
                        <View style={{ position: "absolute", top: 20, left: 20 }}>
                          <Icon
                            source={Math.random() > 0.5 ? "check-circle-outline" : "close-circle-outline"}
                            color={Math.random() > 0.5 ? "lime" : "red"} 
                            size={16}
                          />
                        </View>
                        <Text style={{ 
                          fontWeight: 'bold', 
                          color: textColor,
                        }}>
                          { date.day }
                        </Text>
                      </Surface>
                    </View>
                  )
                }}

                markingType='custom'
                hideExtraDays={false}
                enableSwipeMonths={true}
                theme={{
                  calendarBackground: theme.colors.elevation,
                  textDisabledColor: theme.colors.surfaceDisabled,
                  dayTextColor: theme.colors.onSurface,
                  monthTextColor: theme.colors.onSurface,
                }}
                onDayPress={console.log}
              />
            </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
}