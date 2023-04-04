import {API, Auth, graphqlOperation} from 'aws-amplify';
import {useEffect, useState} from 'react';
import {Text, View, Image, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import {onUpdateChatRoom} from '../graphql/subscriptions';

dayjs.extend(relativeTime);

const ChatListItem = ({ chat }) => {
	const navigation = useNavigation();
	const [user, setUser] = useState(null);
	const [chatRoom, setChatRoom] = useState(chat);
	
	const fetchUser = async () => {
		const authUser = await Auth.currentAuthenticatedUser();
		const userItem = chatRoom.users.items.find(item => item.user.id !== authUser.attributes.id);
		setUser(userItem?.user);
	};
	
	useEffect(() => {
		const subscription = API.graphql(graphqlOperation(onUpdateChatRoom, {
				filter: { id: { eq: chat.id } },
			}),
		).subscribe({
			next: ({ value }) => {
				setChatRoom((cr) => ({ ...(cr || {}), ...value.data.onUpdateChatRoom }));
			},
			error: (error) => console.warn(error),
		});
		return () => subscription.unsubscribe();
	}, [chat.id]);
	
	useEffect(() => {
		fetchUser();
	}, []);
	
	return (
		<Pressable onPress={() => navigation.navigate('Chat', { id: chatRoom.id, name: user?.name })}
							 style={styles.container}>
			<Image style={styles.image} source={{ uri: user?.image }}/>
			<View style={styles.content}>
				<View style={styles.row}>
					<Text numberOfLines={1} style={styles.name}>
						{chatRoom.name || user?.name}
					</Text>
					{
						chatRoom.LastMessage
							?
							<Text style={styles.subTitle}>
								{dayjs(chatRoom.LastMessage?.createdAt).fromNow(true)}
							</Text>
							:
							''
					}
				</View>
				<Text numberOfLines={2} style={styles.subTitle}>{chatRoom.LastMessage?.text}</Text>
			</View>
		</Pressable>);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'stretch',
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
	content: {
		flex: 1,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: 'lightgray',
		flexDirection: 'column',
		marginHorizontal: 6,
	},
	row: {
		flexDirection: 'row',
		marginBottom: 5,
	},
	name: {
		flex: 1,
		fontWeight: 'bold',
	},
	subTitle: {
		color: 'grey',
	},
});

export default ChatListItem;
