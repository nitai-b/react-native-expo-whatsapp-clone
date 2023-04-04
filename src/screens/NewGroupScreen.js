import React, {useState, useEffect} from 'react';
import {FlatList, View, TextInput, StyleSheet, Button} from 'react-native';
import ContactListItem from '../components/ContactListItem';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {createChatRoom, createUserChatRoom} from '../graphql/mutations';
import {listUsers} from '../graphql/queries';
import {useNavigation} from '@react-navigation/native';

const NewGroupScreen = () => {
	const [users, setUsers] = useState([]);
	const [name, setName] = useState('');
	const [selectedUserIds, setSelectedUserIds] = useState([]);
	
	const navigation = useNavigation();
	
	useEffect(() => {
		API.graphql(graphqlOperation(listUsers)).then((result) => {
			setUsers(result.data?.listUsers?.items);
		});
	}, []);
	
	useEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<Button title="Create" disabled={!name || selectedUserIds.length < 1} onPress={onCreateGroupPress}/>
				);
			},
		});
	}, [name, selectedUserIds]);
	
	const onCreateGroupPress = async () => {
		// Create a new ChatRoom
		const newChatRoomData = await API.graphql(graphqlOperation(createChatRoom, { input: { name } }));
		
		const newChatRoom = newChatRoomData.data?.createChatRoom;
		
		// Add the selected users to the ChatRoom
		await Promise.all(selectedUserIds.map((uid) =>
			API.graphql(graphqlOperation(createUserChatRoom, {
					input: {
						chatRoomId: newChatRoom.id,
						userId: uid,
					},
				}),
			),
		));
		// const addUser = await API.graphql(graphqlOperation(createUserChatRoom, {
		// 	input: {
		// 		chatRoomId: newChatRoom.id,
		// 		userId: user.id,
		// 	},
		// }));
		
		
		// Add the authUser to the ChatRoom
		const authUser = await Auth.currentAuthenticatedUser();
		const addAuthUser = await API.graphql(graphqlOperation(createUserChatRoom, {
			input: {
				chatRoomId: newChatRoom.id,
				userId: authUser.attributes.sub,
			},
		}));
		
		setSelectedUserIds([]);
		setName('');
		
		// navigate to the newly created chatroom
		navigation.navigate('Chat', {
			id: newChatRoom.id,
		});
	};
	
	const onContactPress = (id) => {
		setSelectedUserIds((userIds) => {
			if (userIds.includes(id)) {
				// remove id from selected
				return [...userIds.filter(uid => uid !== id)];
			} else {
				// add id to selected
				return [...userIds, id];
			}
		});
	};
	
	return (
		<View style={styles.container}>
			<TextInput
				placeholder="Group name"
				value={name}
				onChangeText={setName}
				style={styles.input}
			/>
			<FlatList
				data={users}
				renderItem={({ item }) => (
					<ContactListItem
						user={item}
						onPress={() => onContactPress(item.id)}
						selectable={true}
						isSelected={selectedUserIds.includes(item.id)}
					/>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { backgroundColor: 'white' },
	input: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: 'lightgray',
		padding: 10,
		margin: 10,
	},
});

export default NewGroupScreen;