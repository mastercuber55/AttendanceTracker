import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withTheme, MD3Theme as Theme, Checkbox  } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { stylesInit } from './styles';
import { useMemo, useState } from 'react';
import ProgressBar from '@/components/ProgressBar';
import Task from '@/components/task';

export default withTheme(HomeScreen)

function HomeScreen() {

  const theme = useTheme();
  const styles = useMemo(() => stylesInit(theme), [theme]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TodoTrack</Text>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.subtitle}>Overview</Text>
          <ProgressBar theme={theme} progress={0.25} styles={styles} title="Overall [5/20]"/>
          <ProgressBar theme={theme} progress={0.75} styles={styles} title="Stared [15/20]"/>
          <ProgressBar theme={theme} progress={0.5} styles={styles} title="Today [10/20]"/>
        </View>
        <View style={styles.card}>
          <Text style={styles.subtitle}>Stared</Text>
          <ScrollView style={{ maxHeight: 200, width: "100%" }} nestedScrollEnabled={true}>
            {[...Array(10)].map((_, index) => (
              <Task key={index} styles={styles} name={`Make Destiny wash the dishes ${index + 1}x`} theme={theme} />
            ))}
          </ScrollView>
        </View>
        <View style={styles.card}>
          <Text style={styles.subtitle}>Today</Text>
          <ScrollView style={{ maxHeight: 200, width: "100%" }} nestedScrollEnabled={true}>
            {[...Array(10)].map((_, index) => (
              <Task key={index} styles={styles} name={`Make Destiny wash the dishes ${index + 1}x`} theme={theme} />
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}


