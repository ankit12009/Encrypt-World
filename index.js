document.getElementById('generate').addEventListener('click', generatePassword);
document.getElementById('copy').addEventListener('click', copyToClipboard);

function generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSpecial = document.getElementById('special').checked;
    const exclusions = document.getElementById('exclusions').value;

    let characterSet = '';
    if (includeUppercase) characterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) characterSet += 'abcdefghijklmnopqrstuvwxyz';
    if ( includeNumbers) characterSet += '0123456789';
    if (includeSpecial) characterSet += '!@#$%^&*';

    // Remove excluded characters from the character set
    characterSet = characterSet.split('').filter(char => !exclusions.includes(char)).join('');

    if (characterSet.length === 0) {
        document.getElementById('password').innerText = 'Please select at least one character type.';
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterSet.length);
        password += characterSet[randomIndex];
    }

    document.getElementById('password').innerText = password;
    evaluatePasswordStrength(password);
}

function copyToClipboard() {
    const passwordText = document.getElementById('password').innerText;
    navigator.clipboard.writeText(passwordText).then(() => {
        alert('Password copied to clipboard!');
    });
}

function evaluatePasswordStrength(password) {
    let strength = 'Weak';
    if (password.length >= 12 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[!@#$%^&*]/.test(password)) {
        strength = 'Strong';
    } else if (password.length >= 8) {
        strength = 'Medium';
    }
    document.getElementById('strength').innerText = `Strength: ${strength}`;
    document.getElementById('recommendation').innerText = strength === 'Weak' ? 'Consider using a longer password with a mix of character types.' : '';
}