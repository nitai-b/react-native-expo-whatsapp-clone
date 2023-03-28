import {API, Auth, graphqlOperation} from 'aws-amplify';
import {useEffect} from 'react';
import {FlatList} from 'react-native';
import chats from '../../assets/data/chats.json';
import {listChats} from './queries';
import ChatListItem from '../components/ChatListItem';

const ChatsScreen = () => {
	
	const getChatRooms = async () => {
		const authUser = await Auth.currentAuthenticatedUser();
		console.log(authUser.attributes.sub);
		
		console.log('is null?', authUser.attributes.sub == null || false || authUser.attributes.sub == '')
		
		const response = await API.graphql(
			graphqlOperation(listChats, { id: authUser.attributes.sub }),
		);
		console.log(response);
	};
	
	useEffect(() => {
		getChatRooms();
	}, []);
	
	return (
		<FlatList
			data={chats}
			renderItem={({ item }) => <ChatListItem chat={item}/>}
			style={{ backgroundColor: 'whitesmoke' }}
		/>
	);
};

export default ChatsScreen;