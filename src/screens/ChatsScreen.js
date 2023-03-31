import {API, Auth, graphqlOperation} from 'aws-amplify';
import {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {listChats} from './queries';
import ChatListItem from '../components/ChatListItem';

const ChatsScreen = () => {
	const [chatRooms, setChatRooms] = useState([]);
	
	const getChatRooms = async () => {
		const authUser = await Auth.currentAuthenticatedUser();
		
		const response = await API.graphql(
			graphqlOperation(listChats, { id: authUser.attributes.sub }),
		);
		// console.log(response.data.getUser.ChatRooms.items.map((value, index, array) => {
		// 	return value.chatRoom.updatedAt
		// }));
		
		const rooms = response?.data?.getUser?.ChatRooms?.items || [];
		const sortedRooms = rooms.sort((room1, room2) => {
			return new Date(room2.chatRoom.updatedAt) - new Date(room1.chatRoom.updatedAt);
		});
		
		setChatRooms(sortedRooms);
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