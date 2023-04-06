import * as ImagePicker from 'expo-image-picker';
import React, {useState} from 'react';
import {View, Image, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {API, graphqlOperation, Auth, Storage} from 'aws-amplify';
import {createMessage, updateChatRoom} from '../graphql/mutations';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

dayjs.extend(relativeTime);

const InputBox = ({ chatroom }) => {
	
	const [text, setText] = useState('');
	const [image, setImage] = useState('');
	
	const onSend = async () => {
		const authUser = await Auth.currentAuthenticatedUser();
		
		const newMessage = {
			chatroomID: chatroom.id,
			text: text,
			userID: authUser.attributes.sub,
		};
		
		if (image) {
			newMessage.images = [await uploadFile(image)];
			setImage(null);
		}
		
		const newMessageData = await API.graphql(graphqlOperation(createMessage, { input: newMessage }));
		setText('');
		
		// set the new message as the last message of that chatroom
		await API.graphql(graphqlOperation(updateChatRoom, {
			input: {
				_version: chatroom._version,
				chatRoomLastMessageId: newMessageData.data.createMessage.id,
				id: chatroom.id,
			},
		}));
	};
	
	const pickImage = async () => {
		// no permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			quality: 1,
		});
		
		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
		
	};
	
	const uploadFile = async (fileUri) => {
		try {
			const response = await fetch(fileUri);
			const blob = await response.blob();
			const key = `${uuidv4()}.png`;
			await Storage.put(key, blob, {
				contentType: 'image/png', // contentType is optional
			});
			return key;
		} catch (err) {
			console.log('Error uploading file:', err);
		}
	};
	
	return (
		<>
			{image && (
				<View style={styles.attachmentContainer}>
					<Image source={{ uri: image }} style={styles.selectedImage} resizeMode="contain"/>
					<MaterialIcons
						name="highlight-remove"
						onPress={() => setImage(null)}
						size={20}
						color="gray"
						style={styles.removeSelectedImage}
					/>
				</View>
			)}
			<SafeAreaView edges={['bottom']} style={styles.container}>
				{/*    Icon*/}
				<AntDesign onPress={pickImage} name="plus" size={20} color="royalblue"/>
				{/*    Text Input*/}
				<TextInput value={text} onChangeText={setText} placeholder="Type your message"
									 style={styles.input}></TextInput>
				{/*    Icon*/}
				<MaterialIcons onPress={onSend} name="send" size={16} color="white" style={styles.send}/>
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: 'whitesmoke',
		padding: 5,
		paddingHorizontal: 10,
		alignItems: 'center',
	},
	input: {
		flex: 1,
		backgroundColor: 'white',
		padding: 5,
		borderRadius: 50,
		paddingHorizontal: 10,
		borderColor: 'lightgray',
		borderWidth: StyleSheet.hairlineWidth,
		marginHorizontal: 10,
	},
	send: {
		backgroundColor: 'royalblue',
		padding: 7,
		borderRadius: 15,
		overflow: 'hidden',
	},
	attachmentsContainer: {
		alignItems: 'flex-end',
	},
	selectedImage: {
		height: 100,
		width: 200,
		margin: 5,
	},
	removeSelectedImage: {
		position: 'absolute',
		right: 10,
		backgroundColor: 'white',
		borderRadius: 10,
		overflow: 'hidden',
	},
});

export default InputBox;
