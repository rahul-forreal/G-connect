# Recommendation pipeline   
User

↓

Candidate Generation

↓

Scoring

↓

Ranking

↓

Top K Recommendations

# MutualFriendScore

MutualFriendScore = No. of mutual friends.

# InterestSimilarity

InterestSimilarity = Common interests / total unique interests

# Final Score
 
 FinalScore = 0.7 * MutualFriendScore + 0.3 * InterestSimilarity
