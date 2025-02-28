function convert() {
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const inputUnit = document.getElementById('inputUnit').value;
    const outputUnit = document.getElementById('outputUnit').value;
    const resultDiv = document.getElementById('result');

    if (!inputValue || !inputUnit || !outputUnit) {
        resultDiv.textContent = 'Please fill in all fields.';
        return;
    }

    let convertedValue;
    if (inputUnit === 'celsius' && outputUnit === 'fahrenheit') {
        convertedValue = (inputValue * 9/5) + 32;
    } else if (inputUnit === 'fahrenheit' && outputUnit === 'celsius') {
        convertedValue = (inputValue - 32) * 5/9;
    } else {
        resultDiv.textContent = 'Units not compatible.';
        return;
    }

    resultDiv.textContent = `${inputValue} ${inputUnit} = ${convertedValue.toFixed(2)} ${outputUnit}`;
}

function swapUnits() {
    const inputUnit = document.getElementById('inputUnit');
    const outputUnit = document.getElementById('outputUnit');
    const temp = inputUnit.value;
    inputUnit.value = outputUnit.value;
    outputUnit.value = temp;
}

document.getElementById('convertBtn').addEventListener('click', convert);
document.getElementById('swapBtn').addEventListener('click', swapUnits);
