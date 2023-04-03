import React, {useState, useEffect} from 'react';
import {FlatList, View, TextInput, StyleSheet, Button} from 'react-native';
import ContactListItem from '../components/ContactListItem';
import {API, graphqlOperation} from 'aws-amplify';
import {listUsers} from '../graphql/queries';
import {useNavigation} from '@react-navigation/native';

const ContactsScreen = () => {
	const [users, setUsers] = useState([]);
	const [name, setName] = useState('');
	const [selecteduserIds, setSelectedUserIds] = useState([]);
	
	const navigation = useNavigation();
	
	useEffect(() => {
		API.graphql(graphqlOperation(listUsers)).then((result) => {
			setUsers(result.data?.listUsers?.items);
		});
	}, []);
	
	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Button title="Create" disabled={!name} onPress={onCreateGroupPress}/>
			),
		});
	}, [name]);
	
	const onCreateGroupPress = () => {
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
						isSelected={selecteduserIds.includes(item.id)}
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

export default ContactsScreen;