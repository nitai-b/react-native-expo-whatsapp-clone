import {MaterialIcons} from '@expo/vector-icons';
import {View, Text, Pressable} from 'react-native';
import {StyleSheet} from 'react-native';

const ListHeaderComponent = ({}) => {
	return (
		<Pressable
			onPress={() => {
			}}
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				padding: 15,
				paddingHorizontal: 20,
			}}
		>
			<MaterialIcons
				name="group"
				size={24}
				color="royalblue"
				style={{
					marginRight: 20,
					backgroundColor: 'gainsboro',
					padding: 7,
					borderRadius: 20,
					overflow: 'hidden',
				}}
			/>
			<Text style={{ color: 'royalblue', fontSize: 16 }}>New Group</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {},
});

export default ListHeaderComponent;
