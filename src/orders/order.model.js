const orderStatus = require("../constant/order-status");

class Order {
    constructor(id, itemId, itemName, size, price, status) {
        this.id = id;
        this.itemId = itemId;
        this.itemName = itemName;
        this.size = size
        this.price = price
        this.status = status
    }
}

module.exports = { Order }