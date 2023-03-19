import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import ChatsScreen from './src/screens/ChatsScreen';

export default function App() {
    return (
        <View style={styles.container}>
            <ChatsScreen></ChatsScreen>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
});
