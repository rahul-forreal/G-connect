#Graph Recommendation System

## Product Vision
Build a graph based recommendation engine that recommends users and communities using social connections and interest similarities.

## Functional requirements
1. user can create account.
2. user can update account.
3. user can add interests.
4. user can send friend requests.
5. user can accept friend requests.
6. user can join communities.
7. user can follow users.
8. user can get user recommendations.
9. user can get community recommendations.

## Out of scope

1. chat
2. notifications
3. photo/video uploads
4. likes/ comments
5. feed generation

## Recommendation strategy

1. Generate candidate user. (candidate user are the one who possibly satisfy the conditions like mutual interests, social connections etc)
2. Find mutual friends.
3. calculate interest similarity.
4. assign scores.
5. rank candidates.
6. returns top K.

