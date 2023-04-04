import React, {useState, useEffect} from 'react';
import {FlatList, View, TextInput, StyleSheet, Button} from 'react-native';
import ContactListItem from '../components/ContactListItem';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {createChatRoom, createUserChatRoom} from '../graphql/mutations';
import {listUsers} from '../graphql/queries';
import {useNavigation, useRoute} from '@react-navigation/native';

const AddContactsToGroupScreen = () => {
	const [users, setUsers] = useState([]);
	const [selectedUserIds, setSelectedUserIds] = useState([]);
	
	const navigation = useNavigation();
	const route = useRoute();
	const chatRoom = route.params.chatRoom;
	
	useEffect(() => {
		API.graphql(graphqlOperation(listUsers)).then((result) => {
			setUsers(
				result.data?.listUsers?.items.filter(
					(item) =>
						!chatRoom.users.items.some(
							(chatRoomUser) =>
								item.id === chatRoomUser.userID,
						),
				),
			);
		});
	}, []);
	
	useEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<Button title="Add" disabled={selectedUserIds.length < 1} onPress={onCreateGroupPress}/>
				);
			},
		});
	}, [selectedUserIds]);
	
	const onCreateGroupPress = async () => {
		// Add the selected users to the ChatRoom
		await Promise.all(selectedUserIds.map((uid) =>
			API.graphql(graphqlOperation(createUserChatRoom, {
					input: {
						chatRoomId: chatRoom.id,
						userId: uid,
					},
				}),
			),
		));
		
		setSelectedUserIds([]);
		navigation.goBack();
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

export default AddContactsToGroupScreen;