loadtest -c 10 --rps 2 --data '{
    "productName": "LoadTesting",
    "description": "Load testing description",
    "productPrice": 50,
    "count": 5
}' -T 'application/json' -m POST http://18.210.14.242/api/v1/products
