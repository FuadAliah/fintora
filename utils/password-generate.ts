export const handleGeneratePassword = (): string => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let password = '';

    // Ensure at least one character from each required type
    password += uppercase[Math.floor(Math.random() * uppercase.length)]; // 1 uppercase
    password += symbols[Math.floor(Math.random() * symbols.length)]; // 1 symbol
    password += numbers[Math.floor(Math.random() * numbers.length)]; // 1 number

    // Fill the rest with random characters
    const allChars = uppercase + lowercase + numbers + symbols;
    for (let i = password.length; i < 12; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password to make it more random
    return password
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');
};
