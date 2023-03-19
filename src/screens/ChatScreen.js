import {View, Text, ImageBackground} from "react-native";
import {StyleSheet} from "react-native";
import bg from '../../assets/images/BG.png';

const ChatScreen = () => {
    return (
        <ImageBackground source={bg} style={styles.bg}>
            <Text>ChatScreen</Text>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
    },
})

export default ChatScreen;