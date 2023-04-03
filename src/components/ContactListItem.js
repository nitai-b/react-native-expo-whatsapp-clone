import {Text, View, Image, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

dayjs.extend(relativeTime);

const ContactListItem = ({ user , onPress = () => {}}) => {
	return (
		<Pressable
			onPress={onPress}
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
