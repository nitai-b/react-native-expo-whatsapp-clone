import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import ContactListItem from '../components/ContactListItem';
import ListHeaderComponent from '../components/ListHeaderComponent';
import {createChatRoom, createUserChatRoom} from '../graphql/mutations';
import {listUsers} from '../graphql/queries';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {getMyChatRoomWithUser} from '../services/chatRoomService';

const ContactsScreen = () => {
	const [users, setUsers] = useState([]);
	const navigation = useNavigation();
	
	useEffect(() => {
		API.graphql(graphqlOperation(listUsers)).then((result) => {
			setUsers(result.data?.listUsers?.items);
		});
	}, []);
	
	const createPrivateChatRoomWithUser = async (user) => {
		// check if we already have a chatroom with this user
		const existingChatRooms = await getMyChatRoomWithUser(user.id);
		if (existingChatRooms) {
			console.log('existing chatrooms');
			console.log(existingChatRooms);
			// navigate to the newly created chatroom
			navigation.navigate('Chat', {
				id: existingChatRooms.chatRoom.id,
			});
			return;
		}
		
		// Create a new ChatRoom
		const newChatRoomData = await API.graphql(graphqlOperation(createChatRoom, { input: {} }));
		
		const newChatRoom = newChatRoomData.data?.createChatRoom;
		
		// Add the clicked user to the ChatRoom
		const addUser = await API.graphql(graphqlOperation(createUserChatRoom, {
			input: {
				chatRoomId: newChatRoom.id,
				userId: user.id,
			},
		}));
		
		// Add the authUser to the ChatRoom
		const authUser = await Auth.currentAuthenticatedUser();
		const addAuthUser = await API.graphql(graphqlOperation(createUserChatRoom, {
			input: {
				chatRoomId: newChatRoom.id,
				userId: authUser.attributes.sub,
			},
		}));
		
		// navigate to the newly created chatroom
		navigation.navigate('Chat', {
			id: newChatRoom.id,
		});
	};
	
	return (
		<FlatList
			data={users}
			renderItem={({ item }) => <ContactListItem user={item} onPress={() => createPrivateChatRoomWithUser(item)}/>}
			style={{ backgroundColor: 'whitesmoke' }}
			ListHeaderComponent={ListHeaderComponent}
		/>
	);
};

export default ContactsScreen;
