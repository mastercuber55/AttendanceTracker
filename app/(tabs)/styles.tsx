import { StyleSheet, FlexAlignType } from 'react-native';
import { MD3Theme as Theme } from "react-native-paper";

const center: {
  justifyContent: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | undefined,
  alignItems: FlexAlignType,

} = {
  justifyContent: 'center',
  alignItems: 'center',
}

export function stylesInit(theme: Theme) {
  return StyleSheet.create({
    container: {
      ...center,
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 64,
      color: theme.colors.onSurface,
      fontWeight: "bold",
      textAlign: "center"
    },
    subtitle: {
      fontSize: 32,
      color: theme.colors.onSurface,
      fontWeight: "bold",
    },
    text: {
      fontSize: 24,
      color: theme.colors.onSurface,
    },
    cardContainer: {
      width: '100%',
      // height: '100%',
      gridAutoRows: '1fr',
      gridTemplateRows: '1fr 1fr',
      gap: "2.5%",
      ...center,
    },
    card: {
      minHeight: "20%",
      width: '80%',
      height: '25%',
      backgroundColor: theme.colors.secondaryContainer,
      borderRadius: 10,
      padding: 10,
      ...center
    },
  });
}
