# act2_bnk - Banking Backend Order Management

## Structure
```
act2_bnk/
├── db/
│   └── connection.js
├── middleware/
│   └── validateOrder.js
├── controllers/
│   └── orderController.js
├── routes/
│   └── orderRoutes.js
├── app.js
├── .env
├── create_tables.sql
└── package.json
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create database tables:
Run `create_tables.sql` in MySQL

3. Update .env file with your database credentials

4. Run server:
```bash
npm start
```

## API Endpoints

### Place Order
POST http://localhost:4000/api/orders/place
Body:
```json
{
  "custname": "John Doe",
  "items": [
    {
      "product_id": 1,
      "quantity": 2
    }
  ]
}
```

### Get All Orders
GET http://localhost:4000/api/orders
