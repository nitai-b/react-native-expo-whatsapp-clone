import {API, graphqlOperation, Auth} from 'aws-amplify';

export const getMyChatRoomWithUser = async (userID) => {
	const authUser = await Auth.currentAuthenticatedUser();
	// get all chat rooms of user 1
	const response = await API.graphql(
		graphqlOperation(listChats, { id: authUser.attributes.sub }),
	);
	
	const chatRooms = response.data?.getUser?.ChatRooms?.items || [];
	
	const chatRoom = chatRooms.find((chatRoomItem) => {
		return (
			chatRoomItem.chatRoom.users.items.length === 2 &&
			chatRoomItem.chatRoom.users.items.some(
				(userItem) => userItem.user.id === userID
			)
		);
	});
	
	return chatRoom;
};

export const listChats = /* GraphQL */`
query ListChats($id: ID!) {
	getUser(id: $id) {
		id
		ChatRooms {
			items {
				chatRoom {
					id
					users {
						items {
							user {
								id
							}
						}
					}
				}
			}
		}
	}
}
`;
