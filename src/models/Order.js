import db from "../config/db.js";

const Order = {
  create: (user_id, subtotal_amount, order_date, status, orderDetails, callback) => {
    const query = `INSERT INTO Orders (user_id, subtotal_amount, order_date, status) VALUES (?, ?, ?, ?)`;

    db.query(query, [user_id, subtotal_amount, order_date, status], (err, result) => {
      if (err) return callback(err);

      const orderId = result.insertId;


      if (orderDetails && orderDetails.length > 0) {
        const orderDetailsQuery = `INSERT INTO OrderDetails (order_id, product_id, quantity) VALUES ?`;
        const values = orderDetails.map(({ product_id, quantity }) => [orderId, product_id, quantity]);

        db.query(orderDetailsQuery, [values], (err) => {
          if (err) return callback(err);
          callback(null, result);
        });
      } else {
        callback(null, result);
      }
    });
  },

  findAll: (callback) => {
    const query = `
      SELECT Orders.* 
      FROM Orders
    `;

    db.query(query, (err, orders) => {
      if (err) return callback(err);

      
      const ordersWithDetails = [];
      let orderCount = 0;

      orders.forEach(order => {
        const detailsQuery = `
          SELECT product_id, quantity 
          FROM OrderDetails 
          WHERE order_id = ?
        `;

        db.query(detailsQuery, [order.id], (err, details) => {
          if (err) return callback(err);

          ordersWithDetails.push({ ...order, orderDetails: details });
          orderCount++;

        
              if (orderCount === orders.length) {
                callback(null, ordersWithDetails);
              }
        });
      });
    });
  },

  findByUserId: (user_id, callback) => {
    const query = `
      SELECT Orders.* 
      FROM Orders 
      WHERE Orders.user_id = ?
    `;

    db.query(query, [user_id], (err, orders) => {
      if (err) return callback(err);

      const ordersWithDetails = [];
      let orderCount = 0;

      orders.forEach(order => {
        const detailsQuery = `
          SELECT product_id, quantity 
          FROM OrderDetails 
          WHERE order_id = ?
        `;

        db.query(detailsQuery, [order.id], (err, details) => {
          if (err) return callback(err);

          ordersWithDetails.push({ ...order, orderDetails: details });
          orderCount++;

          if (orderCount === orders.length) {
            callback(null, ordersWithDetails);
          }
        });
      });
    });
  },

  findByIdAndUser: (id, user_id, callback) => {
    const query = `
      SELECT Orders.* 
      FROM Orders 
      WHERE Orders.id = ? AND Orders.user_id = ?
    `;

    db.query(query, [id, user_id], (err, orders) => {
      if (err) return callback(err);
      if (orders.length === 0) return callback(null, null); 

      const detailsQuery = `
        SELECT product_id, quantity 
        FROM OrderDetails 
        WHERE order_id = ?
      `;

      db.query(detailsQuery, [orders[0].id], (err, details) => {
        if (err) return callback(err);

        const orderWithDetails = { ...orders[0], orderDetails: details };
        callback(null, orderWithDetails);
      });
    });
  },

  // Deletion
  delete: (id, callback) => {
    const deleteDetailsQuery = `DELETE FROM OrderDetails WHERE order_id = ?`;

    db.query(deleteDetailsQuery, [id], (err) => {
      if (err) return callback(err);

      
      const deleteOrderQuery = `DELETE FROM Orders WHERE id = ?`;
      db.query(deleteOrderQuery, [id], callback);
    });
  }
};

export default Order;