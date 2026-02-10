const { space, lines } = require('../utils/display');

const menu = [
    {
        itemid: 1, itemName: "Espresso", price: 80, sizes: ["Small", "Medium", "Large"]
    },
    {
        itemid: 2, itemName: "Americano", price: 90, sizes: ["Small", "Medium", "Large"]
    },
    {
        itemid: 3, itemName: "Cappucino", price: 120, sizes: ["Small", "Medium", "Large"]
    },
    {
        itemid: 4, itemName: "Latte", price: 120, sizes: ["Small", "Medium", "Large"]
    },
    {
        itemid: 5, itemName: "Mocha", price: 130, sizes: ["Small", "Medium", "Large"]
    },
    {
        itemid: 6, itemName: "Macchiato", price: 110, sizes: ["Small", "Medium", "Large"]
    },
    {
        itemid: 7, itemName: "Flat White", price: 120, sizes: ["Small", "Medium", "Large"]
    },
    {
        itemid: 8, itemName: "Iced Coffee", price: 100, sizes: ["Medium", "Large"]
    },
    {
        itemid: 9, itemName: "Cold Brew", price: 130, sizes: ["Medium", "Large"]
    },
    {
        itemid: 10, itemName: "Cold Brewv", price: 150, sizes: ["Medium", "Large"]
    },
];

module.exports = { menu }