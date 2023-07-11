export const generateUuid = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let uuid = "";
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            uuid += characters[Math.floor(Math.random() * characters.length)];
        }
        uuid += "-";
    }
    uuid = uuid.slice(0, -1);
    return uuid;
}