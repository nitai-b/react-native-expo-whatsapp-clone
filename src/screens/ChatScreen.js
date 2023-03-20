import {useEffect} from 'react';
import {View, Text, ImageBackground, FlatList, KeyboardAvoidingView} from 'react-native';
import {StyleSheet} from 'react-native';
import bg from '../../assets/images/BG.png';
import messages from '../../assets/data/messages.json';
import Message from '../components/Message';
import InputBox from '../components/InputBox';
import {useRoute, useNavigation} from '@react-navigation/native';

const ChatScreen = () => {
	const route = useRoute();
	const navigation = useNavigation();
	
	useEffect(() => {
		navigation.setOptions({title: route.params.name});
	}, [route.params.name]);
	
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={Platform.OS === 'ios' ? 65 : 90}
			style={styles.bg}
		>
			<ImageBackground source={bg} style={styles.bg}>
				<FlatList
					data={messages}
					renderItem={({item}) => <Message message={item}/>}
					style={styles.list}
					inverted
				/>
				<InputBox/>
			</ImageBackground>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	bg: {
		flex: 1,
	},
});

export default ChatScreen;