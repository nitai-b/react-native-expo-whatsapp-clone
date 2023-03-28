import {Text, View, Image, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

dayjs.extend(relativeTime);

const ChatListItem = ({ chat }) => {
	const navigation = useNavigation();
	
	// loop through chat users items and find the user that isn't the authenticated user
	const user = chat.users.items[0].user;
	
	return (
		<Pressable onPress={() => navigation.navigate('Chat', { id: chat.id, name: user?.name })} style={styles.container}>
			<Image style={styles.image} source={{ uri: user?.image }}/>
			<View style={styles.content}>
				<View style={styles.row}>
					<Text numberOfLines={1} style={styles.name}>
						{user?.name}
					</Text>
					<Text style={styles.subTitle}>
						{dayjs(chat.lastMessage?.createdAt).fromNow(true)}
					</Text>
				</View>
				<Text numberOfLines={2} style={styles.subTitle}>{chat.lastMessage?.text}</Text>
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
