import {API, Auth, graphqlOperation} from 'aws-amplify';
import {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {listChats} from './queries';
import ChatListItem from '../components/ChatListItem';

const ChatsScreen = () => {
	const [chatRooms, setChatRooms] = useState([]);
	
	const getChatRooms = async () => {
		const authUser = await Auth.currentAuthenticatedUser();
		console.log(authUser.attributes.sub);
		
		console.log('is null?', authUser.attributes.sub == null || false || authUser.attributes.sub == '');
		
		const response = await API.graphql(
			graphqlOperation(listChats, { id: authUser.attributes.sub }),
		);
		setChatRooms(response.data.getUser.ChatRooms.items);
	};
	
	useEffect(() => {
		getChatRooms();
	}, []);
	
	return (
		<FlatList
			data={chatRooms}
			renderItem={({ item }) => <ChatListItem chat={item.chatRoom}/>}
			style={{ backgroundColor: 'whitesmoke' }}
		/>
	);
};

export default ChatsScreen;