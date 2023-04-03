import {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import ContactListItem from '../components/ContactListItem';
import {API, graphqlOperation} from 'aws-amplify';
import ListHeaderComponent from '../components/ListHeaderComponent';
import {listUsers} from '../graphql/queries';

const ContactsScreen = () => {
	const [users, setUsers] = useState([]);
	
	useEffect(() => {
		API.graphql(graphqlOperation(listUsers)).then((result) => {
			setUsers(result.data?.listUsers?.items);
		});
	}, []);
	
	return (
		<FlatList
			data={users}
			renderItem={({ item }) => <ContactListItem user={item}/>}
			style={{ backgroundColor: 'whitesmoke' }}
			ListHeaderComponent={ListHeaderComponent}
		/>
	);
};

export default ContactsScreen;
