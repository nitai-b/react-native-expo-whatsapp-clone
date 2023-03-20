import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import ChatScreen from './src/screens/ChatScreen';
import Navigator from "./src/navigation/Navigatior";

export default function App() {
    return (
        <View style={styles.container}>
            <Navigator/>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'whitesmoke',
        justifyContent: 'center',
    },
});
