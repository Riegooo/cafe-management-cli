
const { menu } = require('./config/menu-data');
const { createOrder, viewOrders, updateOrdersController, deleteOrderController } = require('./orders/order.controller');
const { lines, space } = require('./utils/display');
const { rl } = require('./utils/input');

function mainSystem() {
    space()
    lines(30, "=")
    console.log("   === {COFFEE OPTION} ===");
    lines(30, "=")
    const options = ["View Menu", "Create Order", "View Orders", "Update Order", "Delete Order", "Exit"]
    options.forEach((opt, index) => {
        console.log(`${1 + index}. ${opt}`);
    })
    lines(30, "=")
    rl.question("Enter : ", (chooseOption) => {
        switch(parseInt(chooseOption)){
            case 1: 
                space();
                lines(30, "=")
                console.log("  === {COFFEE SHOP MENU} ===");
                lines(30, "=")
                menu.forEach((item, index) => {
                    console.log(`${1 + index}. ITEM: ${item.itemName} | PRICE: ${item.price}`);
                })
                lines(30, "=")
                rl.question("Press Enter to go back...", () => {
                    mainSystem();
                });
                break;
            case 2:
                createOrder(mainSystem);
                break;
            case 3:
                viewOrders(mainSystem);
                break;
            case 4: 
                updateOrdersController(mainSystem);
                break;
            case 5:
                deleteOrderController(mainSystem);
                break;
            case 6:
                rl.close();
                return;
            default:
                console.log("Invalid option");
                return mainSystem();
        };
    });

}


module.exports = { mainSystem }; 