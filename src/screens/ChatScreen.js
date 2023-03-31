import {API, graphqlOperation} from 'aws-amplify';
import {useEffect, useState} from 'react';
import {ImageBackground, FlatList, KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import {StyleSheet} from 'react-native';
import bg from '../../assets/images/BG.png';
import messages from '../../assets/data/messages.json';
import Message from '../components/Message';
import InputBox from '../components/InputBox';
import {useRoute, useNavigation} from '@react-navigation/native';
import {getChatRoom, listMessagesByChatRoom} from '../graphql/queries';

const ChatScreen = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const chatroomID = route.params.id;
	
	const [chatRoom, setChatRoom] = useState(null);
	const [messages, setMessages] = useState([]);
	
	// responsible for fetching the chatroom
	useEffect(() => {
		API.graphql(graphqlOperation(getChatRoom, { id: chatroomID })).then((result) => setChatRoom(result.data?.getChatRoom));
	}, []);
	
	// fetching messages
	useEffect(() => {
		API.graphql(graphqlOperation(listMessagesByChatRoom, {
			chatroomID,
			sortDirection: 'DESC',
		})).then((result) => {
			setMessages(result.data?.listMessagesByChatRoom?.items);
		});
	}, []);
	
	//
	useEffect(() => {
		navigation.setOptions({ title: route.params.name });
	}, [route.params.name]);
	
	if (!chatRoom) {
		return <ActivityIndicator/>;
	}
	
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={Platform.OS === 'ios' ? 65 : 90}
			style={styles.bg}
		>
			<ImageBackground source={bg} style={styles.bg}>
				<FlatList
					data={messages}
					renderItem={({ item }) => <Message message={item}/>}
					style={styles.list}
					inverted
				/>
				<InputBox chatroom={chatRoom}/>
			</ImageBackground>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	bg: {
		flex: 1,
	},
});

export default ChatScreen;