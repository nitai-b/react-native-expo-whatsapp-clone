import {View, Text, ImageBackground, FlatList} from "react-native";
import {StyleSheet} from "react-native";
import bg from '../../assets/images/BG.png';
import messages from '../../assets/data/messages.json';
import Message from "../components/Message";
import InputBox from "../components/InputBox";

const ChatScreen = () => {
    return (
        <ImageBackground source={bg} style={styles.bg}>
            <FlatList
                data={messages}
                renderItem={({item}) => <Message message={item}/>}
                style={styles.list}
                inverted
            />
            <InputBox/>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
    },
})

export default ChatScreen;