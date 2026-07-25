# Recommendation Engine Performance

Dataset
- Users: 10,000
- Friendships: 40,442
- User-Interest mappings: 54,956

## Benchmark

Command

ab -n 100 -c 10 http://localhost:3000/user/202/recommendations

### Initial

Requests/sec: ~4
Latency: ~2500 ms

### After Neo4j Constraint

Requests/sec: ~6
Latency: ~1600 ms

### After Batch Query Optimization

Requests/sec: ~25
Latency: ~399 ms

Optimizations:
- Eliminated N+1 queries
- Batched PostgreSQL lookups
- Batched interest loading
- Batched mutual friend counting

### After Redis

Requests/sec: 1444.09
Average latency: 6.925 ms

Optimizations:
- Redis cache (TTL = 300 seconds)
- Cache-aside pattern