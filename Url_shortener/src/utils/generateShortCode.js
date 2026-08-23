export const generateShortCode = () => {

    let shortCode = "";

    const chars = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
    "u", "v", "w", "x", "y", "z",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

    // generate a 8 chars long random string

    for(let i = 0; i<8; i++){
        const rand = Math.floor(Math.random() * 36);

        shortCode += chars[rand];
    }

    return shortCode;
    
}
