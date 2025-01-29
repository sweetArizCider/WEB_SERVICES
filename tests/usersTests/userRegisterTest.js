const validator = require('../../routers/users/validators/userValidator.js');

const userValidator = new validator();

const user_data = {
    username: "pyapplecider",
    password: "pass123",
    name: "Carlos",
    lastName: "Arizpe",
    secondLastName: "Hernandez",
    email: "pycarizpehdz@outlook.com",
    enabled: true
}

console.log(userValidator.validateUser(user_data));

