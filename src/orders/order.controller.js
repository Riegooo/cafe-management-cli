
const { menu } = require('../config/menu-data');
const { space, lines } = require('../utils/display');
const orderService = require('./order.service');
const store = require('../state/store');
const { rl } = require('../utils/input');

function createOrder(backToMenu) {
    space();
    lines(30, "=")
    console.log("  === {COFFEE SHOP MENU} ===");
    lines(30, "=")
    menu.forEach((item, index) => {
        console.log(`${1 + index}. ITEM: ${item.itemName} | PRICE: ${item.price}`);
    })
    lines(30, "=")
    rl.question("Enter item id, to order : ", (order) => {
        let orderId = Number(order) - 1;

        if (orderId >= menu.length || orderId < 0 || isNaN(orderId)){
            console.log("Invalid item!");
            return createOrder(backToMenu);
        } else {
            space();
            lines(30, "=")
            console.log("  === {COFFEE CUP SIZES} ===");
            lines(30, "=")
            menu[orderId].sizes.forEach((i, index) => { console.log(`${1 + index}. ${i}`); })
            lines(30, "=")

            rl.question("Enter size id: ", (sizeNum) => {
                let sizeId = Number(sizeNum) - 1;

                if (sizeId >= 11 || sizeId < 0 || isNaN(sizeId)){
                    console.log("Invalid size!");
                    return createOrder(backToMenu);
                } 

                orderService.createOrder(orderId, sizeId);

                lines(30, '-')
                console.log("Order created:", order);
                lines(30, '-')

                rl.question("Press Enter to go back...", () => {
                    backToMenu();
                });
            });
        }
    });
};

function viewOrders(backToMenu) {
    const orders = orderService.getOrder();
    let orderNum = orders.length;
    if (orderNum <= 0) {
        console.log("You don't have a order yet");
        backToMenu();
        return;
    }
    space();
    lines(30, "-")
    console.log("       === {ORDERS} ===");
    lines(30, "-")    
    orders.forEach((o) => {
    console.log(
        `ID: ${o.id} | Item: ${o.itemName} | Size: ${o.size} | Price: ${o.price} | Status: ${o.status}`
        );
    });
    lines(30, "-")
    space();
    rl.question("Press Enter to go back...", () => {
        backToMenu();
    });
};

function updateOrdersController(backToMenu) {
    const ordersList = orderService.getOrder();
    if (ordersList.length <= 0) {
        console.log("No orders to update.");
        backToMenu();
        return;
    }
    space();
    lines(30, "-")
    console.log("       === {ORDERS} ===");
    lines(30, "-") 
    ordersList.forEach((o) => {
        console.log(
            `ID: ${o.id} | Item: ${o.itemName} | Size: ${o.size} | Price: ${o.price} | Status: ${o.status}`
        );
    });
    lines(30, "-");
    rl.question("enter id to update the order : ", (order) => {
        let orderId = Number(order);
    
        if (isNaN(orderId)) {
            console.log("Invalid input. Please enter a number.");
            return updateOrdersController(backToMenu);
        }

        //check if id is exists or valid in orders array
        const findOrderId = store.orders.find(o => o.id === orderId);
        //if not exists
        if (!findOrderId) {
            console.log("Order not found.");
            return updateOrdersController(backToMenu);
        }

        space();
        menu.forEach((item, index) => {
            console.log(`${1 + index}. ITEM: ${item.itemName} | PRICE: ${item.price}`);
        })
        rl.question("Enter new item id : ", (newItem) => {
            let newItemNum = Number(newItem) - 1;

            if (isNaN(newItemNum) || newItemNum < 0 || newItemNum >= menu.length){
                console.log("Invalid menu item!");
                return backToMenu();
            }

            menu[newItemNum].sizes.forEach((i, index) => { console.log(`${1 + index}. ${i}`); })
            rl.question("Enter new size: ", (newSize) =>{
                let newSizeNum = Number(newSize) - 1;
                
                if (isNaN(newSizeNum) || newSizeNum < 0 || newSizeNum >= menu[newItemNum].sizes.length) {
                    console.log("Invalid menu size!");
                    return backToMenu();
                }

                orderService.updateOrders(orderId, newItemNum, newSizeNum);
                backToMenu();
            });
        });

    });

};

function deleteOrderController(backToMenu) {
    const orderList = orderService.getOrder()
    if (orderList.length <= 0) {
        space()
        lines(30, '-')
        console.log("No Orders to Delete.");
        lines(30, '-')
        backToMenu();
        return;
    }
    space();
    lines(30, "-")
    console.log("       === {ORDERS} ===");
    lines(30, "-") 
    orderList.forEach(o => {
        console.log(`ID: ${o.id} | Item: ${o.itemName} | Sizes: ${o.size} | Price: ${o.price} | Status: ${o.status}`);
    })
    lines(30, "-") 
    rl.question("Enter id to delete the order : ", (order) => {
        let orderNumDel = Number(order);

        if (isNaN(orderNumDel) || orderNumDel <= 0) {
            console.log("Invalid ID!");
            return deleteOrderController(backToMenu);
        }

        const findOrderDel = orderList.find(o => o.id === orderNumDel);
        
        if (!findOrderDel) {
            console.log("Order id not found.");
            return deleteOrderController(backToMenu);
        }

        orderService.deleteOrder(orderNumDel);
        backToMenu();
    });
}

module.exports = { createOrder, viewOrders, updateOrdersController, deleteOrderController };