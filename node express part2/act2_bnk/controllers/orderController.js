const pool = require("../db/connection");

const placeOrder = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const { custname, items } = req.body;
    let totalAmount = 0;

    for (const item of items) {
      const [products] = await connection.execute(
        "SELECT id, name, price, stock FROM products WHERE id = ?",
        [item.product_id]
      );

      if (products.length === 0) {
        throw new Error(`Product with id ${item.product_id} not found`);
      }

      const product = products[0];
      if (product.stock < item.quantity) {
        throw new Error(
          `Insufficient stock for product ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`
        );
      }
      totalAmount += product.price * item.quantity;

      await connection.execute(
        "UPDATE products SET stock = stock - ? WHERE id = ?",
        [item.quantity, item.product_id]
      );
    }

    const [orderResult] = await connection.execute(
      "INSERT INTO orders (custname, totalamount) VALUES (?, ?)",
      [custname, totalAmount]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      await connection.execute(
        "INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)",
        [orderId, item.product_id, item.quantity]
      );
    }

    await connection.commit();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: {
        orderId,
        custname,
        totalAmount,
        items
      }
    });
  } catch (error) {
    await connection.rollback();
    res.status(400).json({
      error: error.message || "Failed to place order. Please try again later"
    });
  } finally {
    connection.release();
  }
};

const getAllOrders = async (req, res) => {
  try {
    const [orders] = await pool.execute(
      "SELECT * FROM orders ORDER BY created_at DESC"
    );
    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch orders. Please try again later"
    });
  }
};

module.exports = {
  placeOrder,
  getAllOrders
};
