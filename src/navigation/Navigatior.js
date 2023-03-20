import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import ChatScreen from '../screens/ChatScreen';
import ChatsScreen from '../screens/ChatsScreen';

const Stack = createNativeStackNavigator();

const Navigator = ({message}) => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Chats" component={ChatsScreen}></Stack.Screen>
				<Stack.Screen name="Chat" component={ChatScreen}></Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	container: {},
});

export default Navigator;
