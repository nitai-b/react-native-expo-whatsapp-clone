import {StatusBar} from 'expo-status-bar';
import {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {createUser} from './src/graphql/mutations';
import {getUser} from './src/graphql/queries';
import Navigator from './src/navigation/Navigatior';
import {Amplify, API, Auth, graphqlOperation} from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';
import awsconfig from './src/aws-exports';

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {
	const syncUser = async () => {
		// get Auth user
		const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
		const sub = authUser.attributes.sub;
		console.log(sub);
		// query the database using Auth user id (sub)
		const userData = await API.graphql(graphqlOperation(getUser, { id: sub }));
		
		console.log(authUser.attributes.phone_number == undefined);
		if (userData.data.getUser) {
			console.log('User already exists in DB');
			return;
		}
		
		const validPhoneNumber = authUser.attributes.phone_number == undefined || authUser.attributes.phone_number == null;
		if (sub == null && validPhoneNumber) {
			console.log('Cannot create user in Users table');
			return;
		}
		
		const newUser = {
			id: sub,
			name: validPhoneNumber ? authUser.attributes.phone_number : 'some-random-name',
			status: 'Hey there! I am using WhatsApp',
		};
		
		// if there is no users in db, create one
		const newUserResponse = await API.graphql(
			graphqlOperation(createUser, { input: newUser }),
		);
	};
	
	useEffect(() => {
		syncUser();
	}, []);
	
	return (
		<View style={styles.container}>
			<Navigator/>
			<StatusBar style="auto"/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'whitesmoke',
		justifyContent: 'center',
	},
});

export default withAuthenticator(App);
