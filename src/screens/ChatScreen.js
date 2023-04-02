import {useNavigation, useRoute} from '@react-navigation/native';
import {API, graphqlOperation} from 'aws-amplify';
import {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, ImageBackground, KeyboardAvoidingView, StyleSheet} from 'react-native';
import bg from '../../assets/images/BG.png';
import InputBox from '../components/InputBox';
import Message from '../components/Message';
import {getChatRoom, listMessagesByChatRoom} from '../graphql/queries';
import {onCreateMessage, onUpdateChatRoom} from '../graphql/subscriptions';

const ChatScreen = () => {
	// Necessary objects and values
	const route = useRoute();
	const navigation = useNavigation();
	const chatroomID = route.params.id;
	
	const [chatRoom, setChatRoom] = useState(null);
	const [messages, setMessages] = useState([]);
	
	// responsible for fetching the chatroom
	useEffect(() => {
		API.graphql(graphqlOperation(getChatRoom, { id: chatroomID })).then((result) => setChatRoom(result.data?.getChatRoom));
		const subscription = API.graphql(graphqlOperation(onUpdateChatRoom, { input: { filter: { id: { eq: chatroomID } } } }),
		).subscribe({
			next: ({ value }) => {
				setChatRoom(cr => ({ ...(cr || {}), ...value.data.onUpdateChatroom }));
			},
			error: (error) => console.warn(error),
		});
		
		return () => subscription.unsubscribe();
	}, [chatroomID]);
	
	// fetching messages
	useEffect(() => {
		API.graphql(graphqlOperation(listMessagesByChatRoom, {
			chatroomID,
			sortDirection: 'DESC',
		})).then((result) => {
			setMessages(result.data?.listMessagesByChatRoom?.items);
		});
		
		// subscribe to new messages
		const subscription = API.graphql(graphqlOperation(onCreateMessage, { filter: { chatroomID: { 'eq': chatroomID } } })).subscribe({
			next: ({ value }) => {
				setMessages((m) => [value.data.onCreateMessage, ...m]);
			},
			error: (err) => {
				console.warn(err);
			},
		});
		
		return () => subscription.unsubscribe();
	}, [chatroomID]);
	
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