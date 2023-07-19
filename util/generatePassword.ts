export const generatePassword = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password: string = "";
    for (let i = 0; i < 6; i++) {
        password += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return password;
};

console.log(generatePassword());