import {View, Text, ImageBackground} from "react-native";
import {StyleSheet} from "react-native";

const Message = ({message}) => {
    return (
        <View>
            <Text>{message.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Message;
