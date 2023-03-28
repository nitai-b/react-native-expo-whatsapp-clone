import {API, Auth, graphqlOperation} from 'aws-amplify';
import {Text, View, Image, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import {createChatRoom, createUserChatRoom} from '../graphql/mutations';

dayjs.extend(relativeTime);

const ContactListItem = ({ user }) => {
	const navigation = useNavigation();
	const chatRoomInit = async () => {
		console.warn('pressed');
		// check if we already have a chatroom with this user
		
		// Create a new ChatRoom
		const newChatRoomData = await API.graphql(graphqlOperation(createChatRoom, { input: {} }));
		console.log(newChatRoomData);
		
		if (!newChatRoomData.data.createChatRoom) {
			console.log('Error createign the chatroom');
		}
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
		<Pressable
			onPress={() => chatRoomInit()}
			style={styles.container}>
			
			<Image style={styles.image} source={{ uri: user.image }}/>
			
			<View style={styles.content}>
				<Text numberOfLines={1} style={styles.name}>
					{user.name}
				</Text>
				
				<Text numberOfLines={1} style={styles.subTitle}>
					{user.status}
				</Text>
			</View>
		
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 10,
		marginVertical: 5,
		height: 70,
	},
	image: {
		width: 60,
		height: 60,
		borderRadius: 30,
		marginRight: 10,
	},
	name: {
		fontWeight: 'bold',
	},
	content: {
		flex: 1,
	},
	subTitle: {
		color: 'gray',
	},
});

export default ContactListItem;
