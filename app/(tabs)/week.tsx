import { Button, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withTheme, Card, Text, List, Surface, PaperProvider, Portal, Modal  } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { stylesInit } from '../styles';
import { useMemo, useState } from 'react';
import ProgressBar from '@/components/ProgressBar';

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
    "Mon": "Already Present",
    "Tue": "Already Absent",
    "Wed": "Marked Present",
    "Thu": "Marked Absent",
    "Fri": "Marked Must Go",
    "Sat": "Marked Present",
    "Sun": "Marked Holiday"
};

const InitialDate = 14
 
function WeekScreen() {

  const theme = useTheme();
  
  const styles = useMemo(() => stylesInit(theme), [theme]);

  const [visible, setVisible] = useState(false);
  const [day, setDay] = useState("Mon")

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
                    <Card.Title title={`Mark ${InitialDate + Object.keys(status).indexOf(day)}th - ${day} as`} titleStyle={{ textAlign: 'center' }}/>
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
            <Card.Title title="Decide your holidays." subtitle="Recommended that you take 2/6 Holidays" titleStyle={{ textAlign: 'center' }} subtitleStyle={{ textAlign: 'center' }}/>
            <Card.Content style={{ gap: 5 }}>
                {Object.entries(status).map(([day, state], index) => (
                    <Surface key={index} elevation={2} style={{ borderRadius: 8 }}>
                        <List.Item
                            title={`${InitialDate + index}th ${day} - ${state}`}
                            titleStyle={{ textAlign: 'center' }}
                            left={props => <List.Icon {...props} icon={data[state as keyof typeof data].icon} color={data[state as keyof typeof data].color} />}
                            onPress={() => {
                                setVisible(true)
                                setDay(day)
                            }}
                        />
                    </Surface>
                ))}
            </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
}