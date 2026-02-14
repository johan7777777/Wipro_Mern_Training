const validateOrder = (req, res, next) => {
  try {
    const { custname, items } = req.body;

    if (!custname || custname.trim() === "") {
      return res.status(400).json({
        error: "Customer name is required"
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: "Items array is required and must not be empty"
      });
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      
      if (!item.product_id || !item.quantity) {
        return res.status(400).json({
          error: `Item ${i + 1}: product_id and quantity are required`
        });
      }

      if (typeof item.quantity !== "number" || item.quantity <= 0) {
        return res.status(400).json({
          error: `Item ${i + 1}: quantity must be a positive number`
        });
      }
    }

    next();
  } catch (error) {
    res.status(500).json({
      error: "Server error during validation. Please try again later"
    });
  }
};

module.exports = validateOrder;
