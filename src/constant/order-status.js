

function randomStatus(max) {
    return Math.floor(Math.random() * max)
};

const statusList = ["Pending", "Processing", "Completed", "Cancelled"]

let myStatus = statusList[randomStatus(3)]



module.exports = {
    STATUS: myStatus
};

