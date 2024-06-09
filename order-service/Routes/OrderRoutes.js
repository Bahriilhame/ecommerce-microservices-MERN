const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/OrderController');

router.post('', orderController.createOrder);
router.get('/:userId', orderController.getUserOrders);
router.get('/:sellerId/seller', orderController.getOrdersBySeller);
// router.get('/:id', orderController.getOrderById);
// router.put('/:id', orderController.updateOrderStatus);
// router.delete('/:id', orderController.deleteOrder);

module.exports = router;
