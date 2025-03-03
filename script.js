// Currencylayer API Setup
const apiKey = '762e1edc7d1add0e3468d647367c3c3f'; // Your API key
const currencies = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD', 'MXN', 'SGD', 'INR'];

// Cached rates and last fetch time
let cachedRates = null;
let lastFetchTime = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Fetch real-time currency rates
async function fetchRates() {
    if (cachedRates && lastFetchTime && (Date.now() - lastFetchTime < CACHE_DURATION)) {
        return cachedRates;
    }
    const url = `https://api.currencylayer.com/live?access_key=${apiKey}&currencies=${currencies.join(',')}`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data); // Uncomment for debugging API response
    if (data.success) {
        cachedRates = data.quotes;
        lastFetchTime = Date.now();
        return cachedRates;
    } else {
        throw new Error('Failed to fetch rates');
    }
}

// Conversion rates for other units
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
    }
};

// Determine the type of unit
function getUnitType(unit) {
    if (currencies.includes(unit)) return 'currency';
    if (['kg', 'lbs'].includes(unit)) return 'weight';
    if (['meters', 'km', 'miles', 'inches', 'ft', 'cm'].includes(unit)) return 'distance';
    if (['celsius', 'fahrenheit'].includes(unit)) return 'temperature';
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

    if (inputType === 'currency') {
        fetchRates().then(rates => {
            const rateKeyInput = 'USD' + inputUnit;
            const rateKeyOutput = 'USD' + outputUnit;
            const rateInput = rates[rateKeyInput];
            const rateOutput = rates[rateKeyOutput];
            if (rateInput && rateOutput) {
                const convertedValue = (inputValue / rateInput) * rateOutput;
                resultDiv.textContent = `${inputValue} ${inputUnit} = ${convertedValue.toFixed(4)} ${outputUnit}`;
            } else {
                resultDiv.textContent = 'Currency rates not available.';
            }
        }).catch(error => {
            resultDiv.textContent = 'Error fetching currency rates.';
            console.error(error);
        });
    } else if (inputType === 'temperature') {
        let convertedValue;
        if (inputUnit === 'celsius' && outputUnit === 'fahrenheit') {
            convertedValue = (inputValue * 9/5) + 32;
        } else if (inputUnit === 'fahrenheit' && outputUnit === 'celsius') {
            convertedValue = (inputValue - 32) * 5/9;
        } else {
            convertedValue = inputValue; // Same unit
        }
        resultDiv.textContent = `${inputValue} ${inputUnit} = ${convertedValue.toFixed(2)} ${outputUnit}`;
    } else {
        const baseValue = inputValue / conversions[inputType][inputUnit];
        const convertedValue = baseValue * conversions[inputType][outputUnit];
        resultDiv.textContent = `${inputValue} ${inputUnit} = ${convertedValue.toFixed(4)} ${outputUnit}`;
    }
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
