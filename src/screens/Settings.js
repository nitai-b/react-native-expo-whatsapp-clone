import {View, Text, Button} from 'react-native';
import {Auth} from 'aws-amplify';
import {StyleSheet} from 'react-native';

const Settings = ({message}) => {
	return (
		<View style={styles.container}>
			<Button onPress={() => Auth.signOut()} title="Sign Out"/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default Settings;
