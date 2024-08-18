/****************************************************************************/
/*                          Validation Function                             */
/****************************************************************************/
const isValidInput = (text) => {
    const regex = /^[a-z\s]+$/; // Permitir solo letras minúsculas y espacios
    return regex.test(text);
};

/****************************************************************************/
/*                          Switch View Elements Function                             */
/****************************************************************************/
const ChangingViewElements = (isValid) => {
    if (isValid)
    {
        document.querySelector('.decrypt__msg').style.display = "none";
        document.querySelector('.decrypt__outcome').style.display = "flex";
    }
    else
    {
        document.querySelector('.decrypt__msg').style.display = "flex";
        document.querySelector('.decrypt__outcome').style.display = "none";
    }
};

/****************************************************************************/
/*                          Text Encryption                                 */
/****************************************************************************/
const encryptText = (text) => {
    if (!isValidInput(text)) {
        alert('Error: El texto debe contener solo letras minúsculas sin acentos.');
        return '';
    }
    // Ejemplo simple de encriptación: desplazar caracteres 3 posiciones en ASCII
    return text
        .split('')
        .map(char => char === ' ' ? ' ' : String.fromCharCode(((char.charCodeAt(0) - 97 + 3) % 26) + 97))
        .join('');
};

/****************************************************************************/
/*                          Text Decryption                                 */
/****************************************************************************/
const decryptText = (text) => {
    if (!isValidInput(text)) {
        alert('Error: El texto debe contener solo letras minúsculas sin acentos.');
        return '';
    }
    // Ejemplo simple de desencriptación: desplazar caracteres 3 posiciones hacia atrás en ASCII
    return text
        .split('')
        .map(char => char === ' ' ? ' ' : String.fromCharCode(((char.charCodeAt(0) - 97 - 3 + 26) % 26) + 97))
        .join('');
};

/****************************************************************************/
/*                          Buttons                                         */
/****************************************************************************/

/****************************************************************************/
/*                          Encription Button                               */
/****************************************************************************/
document.querySelector('#btn-encrypt').addEventListener('click', () => {
    //console.log('btn-encrypt');
    const inputText = document.getElementById('input_text');
    const encryptedText = encryptText(inputText.value);
    if (encryptedText) { // Solo mostrar si pasa la validación
        //console.log(encryptedText);
        document.getElementById('encrypted-data').textContent = encryptedText;
        inputText.value = "";
        ChangingViewElements(true);
    }
    else {
        ChangingViewElements(false);
    }
});

/****************************************************************************/
/*                          Decryption button                               */
/****************************************************************************/
document.querySelector('#btn-decrypt').addEventListener('click', () => {
    //console.log('btn-decrypt');
    const inputText = document.getElementById('input_text');
    const decryptedText = decryptText(inputText.value);
    if (decryptedText) { // Solo mostrar si pasa la validación
        //console.log(decryptedText);
        document.getElementById('encrypted-data').textContent = decryptedText;
        inputText.value = "";
        ChangingViewElements(true);
    }
    else {
        ChangingViewElements(false);
    }
});

/****************************************************************************/
/*                          Copy button                                     */
/****************************************************************************/
document.querySelector('#btn-copy').addEventListener('click', () => {
    //console.log('btn-copy');
    const outputText = document.getElementById('encrypted-data');
    navigator.clipboard.writeText(outputText.textContent).then(() => {
        outputText.textContent = '';
        alert('Texto copiado al portapapeles');
    });
});
