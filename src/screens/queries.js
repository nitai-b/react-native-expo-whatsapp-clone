export const listChats = /* GraphQL */`
query ListChats($id: ID!) {
	getUser(id: $id) {
		id
		ChatRooms {
			items {
				_deleted
				chatRoom {
					id
					name
					image
					updatedAt
					users {
						items {
							user {
								id
								image
								name
							}
						}
					}
					LastMessage {
						id
						createdAt
						text
					}
				}
			}
		}
	}
}
`;
