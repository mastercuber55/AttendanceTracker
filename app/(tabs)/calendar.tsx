import { Text, SafeAreaView } from 'react-native';
import { stylesInit } from './styles';
import { useMemo } from 'react';
import { useTheme } from 'react-native-paper';

export default function TabTwoScreen() {

  const theme = useTheme();
  const styles = useMemo(() => stylesInit(theme), [theme]);
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Calendar</Text>
    </SafeAreaView>
  );
}
