import {  Button, MD3Theme as Theme } from 'react-native-paper';
import { View, Text } from "react-native";
import { useState } from 'react';
import { DatePickerModal } from 'react-native-paper-dates';

export default function DatePicker({ theme, styles }: { theme: Theme, styles: any }) {

    const [visible, setVisible] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    return (
        <View style={{ width: "100%"}}>
            <DatePickerModal
            locale="en"
            mode="single"
            visible={visible}
            onDismiss={() => setVisible(false)}
            onConfirm={(params) => {
              if (params.date) {
                setSelectedDate(params.date);
              }
              setVisible(false);
            }}
          />

          {/* Row Layout for Date and Button */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={[styles.text, { color: theme.colors.primary, paddingStart: 10 }]}>
                    {selectedDate ? selectedDate.toDateString() : "No date selected"}
                </Text>
                <Button mode="elevated" onPress={() => setVisible(true)}>
                    Pick Date
                </Button>
            </View>
        </View>
    );
}