import {StatusBar} from 'expo-status-bar';
import {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {createUser} from './src/graphql/mutations';
import {getUser} from './src/graphql/queries';
import Navigator from './src/navigation/Navigatior';
import {Amplify, API, Auth, graphqlOperation} from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native/src';
import awsconfig from './src/aws-exports';

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {
	const syncUser = async () => {
		try {
			// get Auth user
			const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
			const sub = authUser.attributes.sub;
			
			// query the database using Auth user id (sub)
			const userData = await API.graphql(graphqlOperation(getUser, { id: sub }));
			
			if (userData.data.getUser) {
				console.log('User already exists in DB');
				return;
			}
			
			if (sub == null && authUser.attributes.phone_number == null) {
				console.log('Cannot create user in Users table');
				return;
			}
			
			const newUser = {
				id: sub,
				name: authUser.attributes.phone_number,
				status: 'Hey there! I am using WhatsApp',
			};
			
			// if there is no users in db, create one
			const newUserResponse = await API.graphql(
				graphqlOperation(createUser, { input: newUser }),
			);
		} catch (e) {
			console.log(e);
		}
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
