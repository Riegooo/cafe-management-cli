const { PENDING, PROCESSING, COMPLETED, CANCELLED } = require('../constant/order-status')
// const { orders, nextOrderId } = require('../state/store');
const store = require('../state/store');
const { menu } = require('../config/menu-data');
const { Order } = require('./order.model');

function createOrder(orderId, sizeId) {
    const menuItem = menu[orderId]; 

    if (!menuItem) {
        console.log("Invalid item ID");
        return;
    }

    let price = menu[orderId].price
    if (menu[orderId].sizes[sizeId] === "Medium") price += 20;
    if (menu[orderId].sizes[sizeId] === "Large") price += 40;

    const order = new Order(
        store.nextOrderId++,
        menuItem.itemid,
        menuItem.itemName,
        menuItem.sizes[sizeId],
        price,
        PENDING
    )
    store.orders.push(order)
    return order
}

function getOrder() {
    return store.orders;
}

function updateOrders(orderId, newItem, newSizes) {
    const order = store.orders.find(o => o.id === orderId);
    const menuItem = menu[newItem];
    
    if (!order) {
        console.log("Invalid item ID");
        return
    }

    if (!menuItem || !menuItem.sizes[newSizes]){
        console.log("Invalid item or size!");
        return
    }

    let newPrice = menuItem.price;
    if (menuItem.sizes[newSizes] === "Medium") newPrice += 20;
    if (menuItem.sizes[newSizes] == "Large") newPrice += 40;

    order.price = newPrice;

    let updateOrder = new Order(
        order.id,
        menuItem.itemid,
        menuItem.itemName,
        menuItem.sizes[newSizes],
        newPrice,
        PENDING
    )

    const index = store.orders.findIndex(o => o.id === orderId);
    store.orders[index] = updateOrder;

    lines(30, "-");
    console.log("Update Successfully!");
    lines(30, "-");
}

function deleteOrder(orderId) {
    const orderDel = store.orders.find(o => o.id === orderId);

    if (!orderDel) {
        console.log("Invalid item ID");
        return
    }

    const index = store.orders.findIndex(o => o.id === orderId);
    if (index !== -1){
        store.orders.splice(index, 1)
    }

    console.log("Delete Successfully!");
}

module.exports = { createOrder, getOrder, updateOrders, deleteOrder }