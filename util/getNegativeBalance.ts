// import 'negative.json';

const negative = require('./negative.json');

for (let i = 0; i<negative.users.length; i++) {
    console.log(negative.users[i].name, negative.users[i].balance);
}