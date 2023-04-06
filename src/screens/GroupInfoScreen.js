import {useEffect, useState} from 'react';
import {
	StyleSheet,
	FlatList,
	View,
	Text,
	ActivityIndicator,
	Alert, Button,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {API, graphqlOperation} from 'aws-amplify';
import {onUpdateChatRoom} from '../graphql/subscriptions';
import ContactListItem from '../components/ContactListItem';
import {deleteUserChatRoom} from '../graphql/mutations';

const ChatRoomInfo = () => {
	const [chatRoom, setChatRoom] = useState(null);
	const [loading, setLoading] = useState(false);
	const route = useRoute();
	const navigation = useNavigation();
	
	const chatroomID = route.params.id;
	
	const fetchChatRoom = async () => {
		setLoading(true);
		const result = await API.graphql(graphqlOperation(getChatRoom, { id: chatroomID }));
		setChatRoom(result.data?.getChatRoom);
		setLoading(false);
	};
	
	useEffect(() => {
		fetchChatRoom();
		// Subscribe to onUpdateChatRoom
		const subscription = API.graphql(
			graphqlOperation(onUpdateChatRoom, {
				filter: { id: { eq: chatroomID } },
			}),
		).subscribe({
			next: ({ value }) => {
				setChatRoom((cr) => ({
					...(cr || {}),
					...value.data.onUpdateChatRoom,
				}));
			},
			error: (error) => console.warn(error),
		});
		
		// Stop receiving data updates from the subscription
		return () => subscription.unsubscribe();
	}, [chatroomID]);
	
	if (!chatRoom) {
		return <ActivityIndicator/>;
	}
	
	const removeChatRoomUser = async (chatRoomUser) => {
		const api = await API.graphql(graphqlOperation(deleteUserChatRoom, {
			input: {
				_version: chatRoomUser._version,
				id: chatRoomUser.id,
			},
		}));
		
	};
	
	const onContactPress = (chatRoomUser) => {
		Alert.alert(
			'Removing the user',
			`Are you sure you want to remove ${chatRoomUser.user.name} from this group?`,
			[
				{ text: 'Cancel', style: 'default' },
				{
					text: `Remove ${chatRoomUser.user.name}`,
					onPress: () => removeChatRoomUser(chatRoomUser),
					style: 'destructive',
				},
			]);
	};
	
	const users = chatRoom.users.items.filter((value, index, array) => {
		return !value._deleted;
	});
	
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{chatRoom.name}</Text>
			
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 }}>
				<Text style={styles.sectionTitle}>
					{users.length} Participants
				</Text>
				<Text style={{ fontWeight: 'bold', color: 'royalblue' }}
							onPress={() => navigation.navigate('Add Contacts', { chatRoom })}>
					Add friends
				</Text>
			</View>
			
			<View style={styles.section}>
				<FlatList
					data={users}
					renderItem={({ item }) => (
						<ContactListItem
							user={item.user}
							// this is how you call a function that needs to pass a variable to it in an onPress or any prop
							onPress={() => onContactPress(item)}
						/>
					)}
					onRefresh={fetchChatRoom}
					refreshing={loading}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flex: 1,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 30,
	},
	sectionTitle: {
		fontWeight: 'bold',
		fontSize: 18,
	},
	section: {
		backgroundColor: 'white',
		borderRadius: 5,
		marginVertical: 10,
	},
});

export const getChatRoom = /* GraphQL */ `
    query GetChatRoom($id: ID!) {
        getChatRoom(id: $id) {
            id
            updatedAt
            name
            users {
                items {
                    id
                    chatRoomId
                    userId
                    createdAt
                    updatedAt
                    #                    _version
                    #                    _deleted
                    #                    _lastChangedAt
                    user {
                        id
                        name
                        status
                        image
                    }
                }
                nextToken
                #                startedAt
            }
            createdAt
            #            _version
            #            _deleted
            #            _lastChangedAt
            chatRoomLastMessageId
        }
    }
`;

export default ChatRoomInfo;