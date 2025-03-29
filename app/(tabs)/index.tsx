import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withTheme, MD3Theme as Theme, Checkbox, Card, Text  } from 'react-native-paper';
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
      <Text style={styles.title}>Academic Tracker</Text>
      <View style={{padding: 20}}></View>
      <Text style={styles.subtitle}>Authentication</Text>
      <Card>
        <Card.Title title="Hello"></Card.Title>
        <Card.Content>
          <Text>Hello World</Text>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
}


