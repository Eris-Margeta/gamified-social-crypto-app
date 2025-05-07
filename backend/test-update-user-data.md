curl -X PATCH http://localhost:5001/api/user-data/chameleon_dowser51 \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer xxxxxxxxxxxxx" \
 -d '{
"discordUsername": "newDiscordUser#1234",
"instagramUsername": "newInstagramUser",
"twitterUsername": "newTwitterUser",
"phoneNumber": "+1234567890",
"country": "Wonderland",
"age": 30,
"profilePicture": "http://example.com/newpic.jpg",
"lastLoggedIn": "2023-01-01T00:00:00Z"
}'

## update discord username only

curl -X PATCH http://localhost:5001/api/user-data/chameleon_dowser51 \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer xxxxxxxxxxxxx" \
 -d '{"discordUsername": "updatedDiscordUser#5678"}'

## update instagram username only

curl -X PATCH http://localhost:5001/api/user-data/chameleon_dowser51 \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer xxxxxxxxxxxxx" \
 -d '{"instagramUsername": "updatedInstagramUser"}'

## update twitter username only

curl -X PATCH http://localhost:5001/api/user-data/chameleon_dowser51 \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer xxxxxxxxxxxx" \
 -d '{"twitterUsername": "updatedTwitterUser"}'

 curl -X PATCH https://api.midnightapes.com/api/user-data/chameleon_trader76 \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer xxxxxxxxxxxxx" \
 -d '{"twitterUsername": "updatedTwitterUser"}'

## update phone number only

curl -X PATCH http://localhost:5001/api/user-data/chameleon_dowser51 \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer xxxxxxxxxxxx" \
 -d '{"phoneNumber": "+0987654321"}'

## update country only

curl -X PATCH http://localhost:5001/api/user-data/chameleon_dowser51 \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer xxxxxxxxxx" \
 -d '{"country": "Neverland"}'

## update age only

curl -X PATCH http://localhost:5001/api/user-data/chameleon_dowser51 \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer xxxxxxxxxx" \
 -d '{"age": 35}'

## update profile picture only

curl -X PATCH http://localhost:5001/api/user-data/chameleon_dowser51 \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer xxxxxxxxxxxxx" \
 -d '{"profilePicture": "http://example.com/updatedpic.jpg"}'

## update last logged in only

curl -X PATCH http://localhost:5001/api/user-data/chameleon_dowser51 \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer xxxxxxxxxxxxxxx" \
 -d '{"lastLoggedIn": "2023-02-01T00:00:00Z"}'

## update multiple separate values (any)

curl -X PATCH http://localhost:5001/api/user-data/chameleon_dowser51 \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer xxxxxxxxxxxxx" \
 -d '{
"instagramUsername": "updatedInstagramUser",
"phoneNumber": "+0987654321"
}'



# Update isWhitelisted 

curl -X PATCH http://localhost:5001/api/user-data/ape_luthier52 \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer xxxxxxxxxxxx" \
 -d '{"web3address": "0x123...abc", "isWhitelisted": true}'



# update web3 address only 

curl -X PATCH http://localhost:5001/api/user-data/ape_luthier52 \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer xxxxxxxxxxxxx" \
 -d '{"web3address": "0x456...def"}'



# update ownsnft only

curl -X PATCH http://localhost:5001/api/user-data/ape_luthier52 \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer xxxxxxxxxxxxxxx" \
 -d '{"ownsnft": true}'
