import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import Navigator from './src/navigation/Navigatior';
import {Amplify} from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native/src';
import awsconfig from './src/aws-exports';

Amplify.configure(awsconfig);
function App() {
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
