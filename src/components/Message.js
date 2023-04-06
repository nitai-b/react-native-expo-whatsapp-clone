import {Auth, Storage} from 'aws-amplify';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, View, Text, Pressable, useWindowDimensions} from 'react-native';
import ImageView from 'react-native-image-viewing';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

dayjs.extend(relativeTime);

const Message = ({ message }) => {
	const [isMe, setIsMe] = useState(false);
	const [imageSources, setImageSources] = useState([]);
	const [imageViewerVisible, setImageViewerVisible] = useState(false);
	const { width } = useWindowDimensions();
	
	useEffect(() => {
		isMyMessage();
	}, []);
	
	useEffect(() => {
		const downloadImages = async () => {
			if (message.images?.length > 0) {
				const uris = await Promise.all(message.images.map((img) => Storage.get(img)));
				setImageSources(uris.map((uri) => ({ uri })));
			}
		};
		downloadImages();
	}, [message.images]);
	
	const isMyMessage = async () => {
		const authUser = await Auth.currentAuthenticatedUser();
		setIsMe(message.userID === authUser.attributes.sub);
	};
	
	const imageContainerWidth = width * 0.8 - 30;
	
	return (
		<View style={[
			styles.container,
			{
				backgroundColor: isMe ? '#DCF8C5' : 'white',
				alignSelf: isMe ? 'flex-end' : 'flex-start',
			},
		]}>
			{imageSources.length > 0 && (
				<View style={[{ width: imageContainerWidth }, styles.images]}>
					{imageSources.map((imageSource) =>
						(<Pressable style={[styles.imageContainer, imageSources.length === 1 && { flex: 1 }]}
												onPress={() => setImageViewerVisible(true)}>
							<Image source={imageSource} style={styles.image}/>
						</Pressable>))}
					<ImageView
						images={imageSources} imageIndex={0} visible={imageViewerVisible}
						onRequestClose={() => setImageViewerVisible(false)}
					/>
				</View>
			)}
			<Text>{message.text}</Text>
			<Text style={styles.time}>{dayjs(message.createdAt).fromNow(true)}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		margin: 5,
		padding: 10,
		borderRadius: 10,
		maxWidth: '80%',
		shadowColor: '#000',
		shadowOffset: {
			width: 0, height: 1,
		},
		shadowOpacity: 0.18,
		shadowRadius: 1.00,
		elevation: 1,
	},
	time: {
		color: 'gray',
		alignSelf: 'flex-end',
	},
	imageContainer: {
		width: '50%',
		aspectRatio: 1,
		padding: 2,
	},
	images: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	image: {
		flex: 1,
		borderColor: 'white',
		borderWidth: this.hairlineWidth,
		borderRadius: 5,
	},
});

export default Message;
