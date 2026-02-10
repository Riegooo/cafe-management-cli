const readline = require('readline');
const prompt = require('prompt-sync');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

module.exports = { rl, readline, prompt };