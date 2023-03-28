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
