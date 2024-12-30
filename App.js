import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import CustomText from './components/CustomText';

export default function App() {
  return (
    <View style={styles.container}>
      <CustomText>Open up App.js to start working on your app!</CustomText>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
