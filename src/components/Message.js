import {Auth} from 'aws-amplify';
import {useEffect, useState} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {StyleSheet} from 'react-native';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

dayjs.extend(relativeTime);

const Message = ({ message }) => {
	const [isMe, setIsMe] = useState(false);
	
	useEffect(() => {
		isMyMessage();
	}, []);
	
	const isMyMessage = async () => {
		const authUser = await Auth.currentAuthenticatedUser();
		setIsMe(message.userID === authUser.attributes.sub);
	};
	
	return (
		<View style={[
			styles.container,
			{
				backgroundColor: isMe ? '#DCF8C5' : 'white',
				alignSelf: isMe ? 'flex-end' : 'flex-start',
			},
		]}>
			<Text>{message.text}</Text>
			<Text style={styles.time}>{dayjs(message.createdAt).fromNow(true)}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		margin: 5,
		padding: 10,
		borderRadius: 10,
		maxWidth: '80%',
		shadowColor: '#000',
		shadowOffset: {
			width: 0, height: 1,
		},
		shadowOpacity: 0.18,
		shadowRadius: 1.00,
		elevation: 1,
	},
	time: {
		color: 'gray',
		alignSelf: 'flex-end',
	},
});

export default Message;
