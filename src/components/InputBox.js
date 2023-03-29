import {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {createMessage} from '../graphql/mutations';

dayjs.extend(relativeTime);

const InputBox = ({ chatroomID }) => {
	
	const [text, setText] = useState('');
	
	const onSend = async () => {
		console.warn('Sending a new message: ', text);
		
		const authUser = await Auth.currentAuthenticatedUser();
		
		const newMessage = {
			chatroomID: chatroomID,
			text: text,
			userID: authUser.attributes.sub,
		};
		await API.graphql(graphqlOperation(createMessage, { input: newMessage }));
		setText('');
	};
	
	return (
		<SafeAreaView edges={['bottom']} style={styles.container}>
			{/*    Icon*/}
			<AntDesign name="plus" size={20} color="royalblue"/>
			{/*    Text Input*/}
			<TextInput value={text} onChangeText={setText} placeholder="Type your message"
								 style={styles.input}></TextInput>
			{/*    Icon*/}
			<MaterialIcons onPress={onSend} name="send" size={16} color="white" style={styles.send}/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: 'whitesmoke',
		padding: 5,
		paddingHorizontal: 10,
		alignItems: 'center',
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
	},
});

export default InputBox;
