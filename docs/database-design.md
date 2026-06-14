# Database design

## Entities
1. User
2. Interest
3. Community
4. Friend requests

### User
id
name 
email
bio
createdAt

### Interest
id 
name

### Community
id 
name
description
createdAt

### Friend requests
id
senderId
receiverId
status (PENDING,REJECTED,ACCEPTED)
createdAt

## Relationships
User Friend User
User Follows User
User INTERESTED_IN Interests
User MEMBER_IN Community


