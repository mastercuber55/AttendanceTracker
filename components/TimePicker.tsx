import {  Button, MD3Theme as Theme } from 'react-native-paper';
import { View, Text } from "react-native";
import { useEffect, useState } from 'react';
import { TimePickerModal  } from 'react-native-paper-dates';

export default function DatePicker({ theme, styles }: { theme: Theme, styles: any }) {

    const [visible, setVisible] = useState(false)
    const [selectedTime, setSelectedTime] = useState<Date>(() => {
      const now = new Date();
      now.setHours(6, 0, 0, 0); // Set to 6:00 AM
      return now;
    });

    return (
        <View style={{ width: "100%"}}>
            <TimePickerModal
                locale='en'
                visible={visible}
                onDismiss={() => setVisible(false)}
                onConfirm={(params) => {
                    const now = new Date();
                    now.setHours(params.hours);
                    now.setMinutes(params.minutes);
                    setSelectedTime(now);
                    setVisible(false);
                }}
                hours={6}
                minutes={0}
            />

          {/* Row Layout for Date and Button */}
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={[styles.text, {color: theme.colors.primary}]}> {selectedTime ? selectedTime.toLocaleTimeString() : "No time selected"}</Text>
            <Button mode="elevated" onPress={() => setVisible(true)}>
              Pick Time
            </Button>
          </View>
        </View>
    );
}