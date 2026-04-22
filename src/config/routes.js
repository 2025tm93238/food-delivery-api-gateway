const CUSTOMER = process.env.CUSTOMER_SERVICE_URL || "http://localhost:3001";
const RESTAURANT = process.env.RESTAURANT_SERVICE_URL || "http://localhost:3002";
const ORDER = process.env.ORDER_SERVICE_URL || "http://localhost:3003";
const PAYMENT = process.env.PAYMENT_SERVICE_URL || "http://localhost:3004";
const DELIVERY = process.env.DELIVERY_SERVICE_URL || "http://localhost:3005";
const NOTIFICATION = process.env.NOTIFICATION_SERVICE_URL || "http://localhost:3006";

module.exports = [
  { path: "/v1/customers", target: CUSTOMER },
  { path: "/v1/addresses", target: CUSTOMER },
  { path: "/v1/restaurants", target: RESTAURANT },
  { path: "/v1/menu", target: RESTAURANT },
  { path: "/v1/orders", target: ORDER },
  { path: "/v1/payments", target: PAYMENT },
  { path: "/v1/drivers", target: DELIVERY },
  { path: "/v1/deliveries", target: DELIVERY },
  { path: "/v1/notifications", target: NOTIFICATION },
];
