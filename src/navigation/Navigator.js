import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import ChatScreen from '../screens/ChatScreen';
import ContactsScreen from '../screens/ContactsScreen';
import GroupInfoScreen from '../screens/GroupInfoScreen';
import NewGroupScreen from '../screens/NewGroupScreen';
import MainTabNavigator from './MainTabNavigatior';

const Stack = createNativeStackNavigator();

const Navigator = ({message}) => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{headerStyle: {backgroundColor: 'whitesmoke'}}}>
				<Stack.Screen name="Home" component={MainTabNavigator} options={{headerShown: false}}/>
				<Stack.Screen name="Chat" component={ChatScreen}/>
				<Stack.Screen name="Contacts" component={ContactsScreen}/>
				<Stack.Screen name="New Group" component={NewGroupScreen}/>
				<Stack.Screen name="Group Info" component={GroupInfoScreen}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	container: {},
});

export default Navigator;