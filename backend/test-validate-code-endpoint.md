curl -X POST http://localhost:5001/api/verify-code \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer de9b80151989d0c4c2cf36b78b35e72a" \
     -d '{"email": "email@gmail.com", "code": "bi4nb9"}'

curl -X POST http://localhost:5001/api/verify-code \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer de9b80151989d0c4c2cf36b78b35e72a" \
     -d '{"email": "email@gmail.com", "code": "3oz0f9"}'


curl -X POST http://localhost:5001/api/verify-code \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer de9b80151989d0c4c2cf36b78b35e72a" \
     -d '{"email": "email@gmail.com", "code": "lP82S3"}'

curl -X POST http://localhost:5001/api/verify-code \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer de9b80151989d0c4c2cf36b78b35e72a" \
     -d '{"email": "email@gmail.com", "code": "lp82S3"}'
