import {View, Text, TextInput} from "react-native";
import {StyleSheet} from "react-native";
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from "dayjs";
import {AntDesign, MaterialIcons} from '@expo/vector-icons';

dayjs.extend(relativeTime)

const InputBox = ({message}) => {
    return (
        <View style={styles.container}>
            {/*    Icon*/}
            <AntDesign name='plus' size={20} color='royalblue'/>
            {/*    Text Input*/}
            <TextInput placeholder='Type your message' style={styles.input}></TextInput>
            {/*    Icon*/}
            <MaterialIcons name='send' size={16} color='white' style={styles.send}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'whitesmoke',
        padding: 5,
        paddingHorizontal: 10,
        alignItems: "center",
    },
    input: {
        flex: 1,
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 50,
        paddingHorizontal: 10,
        borderColor: 'lightgray',
        borderWidth: StyleSheet.hairlineWidth,
        marginHorizontal: 10,
    },
    send: {
        backgroundColor: 'royalblue',
        padding: 7,
        borderRadius: 15,
        overflow: 'hidden',
    }
})

export default InputBox;
