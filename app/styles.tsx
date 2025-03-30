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
      backgroundColor: theme.dark ? "#121212" : "#F5F5F5", // Dark mode vs Light mode
      paddingBottom: 48
    },
    title: {
      color: theme.colors.onSurface,
      // fontWeight: "bold",
      textAlign: "center"
    },
    text: {
      color: theme.colors.onSurface,
    },
    cardContainer: {
      width: "100%",
      gap: "15",
      ...center,
    },
    card: {
      // minHeight: "20%",
      width: '80%',
      borderRadius: 10,
      padding: 10,
    },
    SegBtn: { 
      borderRadius: 4, 
      borderWidth: 2.5, 
      borderColor: theme.colors.elevation.level2,
      // backgroundColor: theme.colors.background
    }
  });
}
