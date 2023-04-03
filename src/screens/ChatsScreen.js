import {API, Auth, graphqlOperation} from 'aws-amplify';
import {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {listChats} from './queries';
import ChatListItem from '../components/ChatListItem';

const ChatsScreen = () => {
	const [chatRooms, setChatRooms] = useState([]);
	const [loading, setLoading] = useState(false);
	
	const getChatRooms = async () => {
		setLoading(true);
		const authUser = await Auth.currentAuthenticatedUser();
		
		const response = await API.graphql(
			graphqlOperation(listChats, { id: authUser.attributes.sub }),
		);
		
		const rooms = response?.data?.getUser?.ChatRooms?.items || [];
		const sortedRooms = rooms.sort((room1, room2) => {
			return new Date(room2.chatRoom.updatedAt) - new Date(room1.chatRoom.updatedAt);
		});
		
		setChatRooms(sortedRooms);
		setLoading(false);
	};
	
	useEffect(() => {
		getChatRooms();
	}, []);
	
	return (
		<FlatList
			data={chatRooms}
			renderItem={({ item }) => <ChatListItem chat={item.chatRoom}/>}
			style={{ backgroundColor: 'whitesmoke' }}
			onRefresh={getChatRooms}
			refreshing={loading}
		/>
	);
};

export default ChatsScreen;