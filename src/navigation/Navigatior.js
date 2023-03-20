import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import ChatScreen from '../screens/ChatScreen';
import ChatsScreen from '../screens/ChatsScreen';
import MainTabNavigator from './MainTabNavigatior';

const Stack = createNativeStackNavigator();

const Navigator = ({message}) => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={MainTabNavigator} options={{headerShown: false}}/>
				<Stack.Screen name="Chat" component={ChatScreen}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	container: {},
});

export default Navigator;
