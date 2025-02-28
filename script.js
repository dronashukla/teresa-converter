const conversionRates = {
    meters: 1,
    km: 1000,
    miles: 1609.34,
    ft: 0.3048,
    inches: 0.0254,
    cm: 0.01,
    kg: 1,
    lbs: 0.453592,
    USD: 1,
    EUR: 0.85,
    GBP: 0.75
};

const unitGroups = {
    distance: ['meters', 'km', 'miles', 'ft', 'inches', 'cm'],
    weight: ['kg', 'lbs'],
    currency: ['USD', 'EUR', 'GBP'],
    temperature: ['celsius', 'fahrenheit']
};

function getUnitGroup(unit) {
    for (const group in unitGroups) {
        if (unitGroups[group].includes(unit)) {
            return group;
        }
    }
    return null;
}

function convert() {
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const inputUnit = document.getElementById('inputUnit').value;
    const outputUnit = document.getElementById('outputUnit').value;
    const resultDiv = document.getElementById('result');

    if (!inputValue || !inputUnit || !outputUnit) {
        resultDiv.textContent = 'Please fill in all fields.';
        return;
    }

    const inputGroup = getUnitGroup(inputUnit);
    const outputGroup = getUnitGroup(outputUnit);
    if (inputGroup !== outputGroup) {
        resultDiv.textContent = 'Units not compatible';
        return;
    }

    if (inputGroup === 'temperature') {
        let outputValue;
        if (inputUnit === 'celsius' && outputUnit === 'fahrenheit') {
            outputValue = (inputValue * 9/5) + 32;
        } else if (inputUnit === 'fahrenheit' && outputUnit === 'celsius') {
            outputValue = (inputValue - 32) * 5/9;
        } else {
            outputValue = inputValue; // Same unit, no conversion needed
        }
        resultDiv.textContent = `${inputValue} ${inputUnit} = ${outputValue.toFixed(2)} ${outputUnit}`;
    } else {
        const baseValue = inputValue / conversionRates[inputUnit];
        const outputValue = baseValue * conversionRates[outputUnit];
        resultDiv.textContent = `${inputValue} ${inputUnit} = ${outputValue.toFixed(4)} ${outputUnit}`;
    }
}

document.getElementById('convertBtn').addEventListener('click', convert);const conversionRates = {
    meters: 1,
    km: 1000,
    miles: 1609.34,
    ft: 0.3048,
    inches: 0.0254,
    cm: 0.01,
    kg: 1,
    lbs: 0.453592,
    USD: 1,
    EUR: 0.85,
    GBP: 0.75
};

const unitGroups = {
    distance: ['meters', 'km', 'miles', 'ft', 'inches', 'cm'],
    weight: ['kg', 'lbs'],
    currency: ['USD', 'EUR', 'GBP'],
    temperature: ['celsius', 'fahrenheit']
};

function getUnitGroup(unit) {
    for (const group in unitGroups) {
        if (unitGroups[group].includes(unit)) {
            return group;
        }
    }
    return null;
}

function convert() {
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const inputUnit = document.getElementById('inputUnit').value;
    const outputUnit = document.getElementById('outputUnit').value;
    const resultDiv = document.getElementById('result');

    if (!inputValue || !inputUnit || !outputUnit) {
        resultDiv.textContent = 'Please fill in all fields.';
        return;
    }

    const inputGroup = getUnitGroup(inputUnit);
    const outputGroup = getUnitGroup(outputUnit);
    if (inputGroup !== outputGroup) {
        resultDiv.textContent = 'Units not compatible';
        return;
    }

    if (inputGroup === 'temperature') {
        let outputValue;
        if (inputUnit === 'celsius' && outputUnit === 'fahrenheit') {
            outputValue = (inputValue * 9/5) + 32;
        } else if (inputUnit === 'fahrenheit' && outputUnit === 'celsius') {
            outputValue = (inputValue - 32) * 5/9;
        } else {
            outputValue = inputValue; // Same unit, no conversion needed
        }
        resultDiv.textContent = `${inputValue} ${inputUnit} = ${outputValue.toFixed(2)} ${outputUnit}`;
    } else {
        const baseValue = inputValue / conversionRates[inputUnit];
        const outputValue = baseValue * conversionRates[outputUnit];
        resultDiv.textContent = `${inputValue} ${inputUnit} = ${outputValue.toFixed(4)} ${outputUnit}`;
    }
}

document.getElementById('convertBtn').addEventListener('click', convert);
