// Conversion rates and functions
const conversions = {
    weight: {
        kg: 1,
        lbs: 2.20462
    },
    distance: {
        meters: 1,
        km: 0.001,
        miles: 0.000621371,
        inches: 39.3701,
        ft: 3.28084,
        cm: 100
    },
    temperature: {
        celsius: (value, to) => to === 'fahrenheit' ? (value * 9/5) + 32 : value,
        fahrenheit: (value, to) => to === 'celsius' ? (value - 32) * 5/9 : value
    },
    currency: {
        // Placeholder for currency (expandable with real rates or an API)
        usd: 1,
        eur: 0.85 // Example rate
    }
};

// Determine the type of unit (weight, distance, temperature, etc.)
function getUnitType(unit) {
    if (['kg', 'lbs'].includes(unit)) return 'weight';
    if (['meters', 'km', 'miles', 'inches', 'ft', 'cm'].includes(unit)) return 'distance';
    if (['celsius', 'fahrenheit'].includes(unit)) return 'temperature';
    if (['usd', 'eur'].includes(unit)) return 'currency'; // Placeholder
    return null;
}

// Perform the conversion
function convert() {
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const inputUnit = document.getElementById('inputUnit').value;
    const outputUnit = document.getElementById('outputUnit').value;
    const resultDiv = document.getElementById('result');

    // Check if all fields are filled
    if (!inputValue || !inputUnit || !outputUnit) {
        resultDiv.textContent = 'Please fill in all fields.';
        return;
    }

    const inputType = getUnitType(inputUnit);
    const outputType = getUnitType(outputUnit);

    // Check if units are compatible
    if (inputType !== outputType) {
        resultDiv.textContent = 'Units not compatible.';
        return;
    }

    let convertedValue;
    if (inputType === 'temperature') {
        // Special handling for temperature conversions
        convertedValue = conversions.temperature[inputUnit](inputValue, outputUnit);
    } else {
        // Convert to base unit (e.g., meters for distance) then to target unit
        const baseValue = inputValue / conversions[inputType][inputUnit];
        convertedValue = baseValue * conversions[inputType][outputUnit];
    }

    resultDiv.textContent = `${inputValue} ${inputUnit} = ${convertedValue.toFixed(4)} ${outputUnit}`;
}

// Swap the input and output units
function swapUnits() {
    const inputUnit = document.getElementById('inputUnit');
    const outputUnit = document.getElementById('outputUnit');
    const temp = inputUnit.value;
    inputUnit.value = outputUnit.value;
    outputUnit.value = temp;
}

// Add event listeners to buttons
document.getElementById('convertBtn').addEventListener('click', convert);
document.getElementById('swapBtn').addEventListener('click', swapUnits);
