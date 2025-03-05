// Currency Layer API Setup
const apiKey = '762e1edc7d1add0e3468d647367c3c3f'; // Your API key
const currencies = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD', 'MXN', 'SGD', 'INR'];

// Cached rates and last fetch time
let cachedRates = null;
let lastFetchTime = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

// Fetch real-time currency rates
async function fetchRates() {
    // Use cached rates if available and not expired
    if (cachedRates && lastFetchTime && (Date.now() - lastFetchTime < CACHE_DURATION)) {
        return cachedRates;
    }

    const url = `https://api.currencylayer.com/live?access_key=${apiKey}&currencies=${currencies.join(',')}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.success) {
            cachedRates = data.quotes;
            lastFetchTime = Date.now();
            return cachedRates;
        } else {
            throw new Error('API request failed: ' + (data.error?.info || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error fetching rates:', error);
        throw error;
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
async function convert() {
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const inputUnit = document.getElementById('inputUnit').value;
    const outputUnit = document.getElementById('outputUnit').value;
    const resultDiv = document.getElementById('result');

    // Validate inputs
    if (isNaN(inputValue) || !inputUnit || !outputUnit) {
        resultDiv.textContent = 'Please fill in all fields with valid values.';
        return;
    }

    const inputType = getUnitType(inputUnit);
    const outputType = getUnitType(outputUnit);

    // Check unit compatibility
    if (inputType !== outputType) {
        resultDiv.textContent = 'Units not compatible.';
        return;
    }

    // Handle currency conversions
    if (inputType === 'currency') {
        try {
            const rates = await fetchRates();
            // Define rates relative to USD (base currency)
            const rateInput = inputUnit === 'USD' ? 1 : rates['USD' + inputUnit];
            const rateOutput = outputUnit === 'USD' ? 1 : rates['USD' + outputUnit];

            // Verify rates exist
            if (!rateInput || !rateOutput) {
                resultDiv.textContent = 'Currency rates not available.';
                return;
            }

            // Convert: input -> USD -> output
            const valueInUSD = inputValue / rateInput;
            const convertedValue = valueInUSD * rateOutput;
            resultDiv.textContent = `${inputValue} ${inputUnit} = ${convertedValue.toFixed(4)} ${outputUnit}`;
        } catch (error) {
            resultDiv.textContent = 'Error fetching currency rates.';
            console.error(error);
        }
    }
    // Handle temperature conversions
    else if (inputType === 'temperature') {
        let convertedValue;
        if (inputUnit === 'celsius' && outputUnit === 'fahrenheit') {
            convertedValue = (inputValue * 9/5) + 32;
        } else if (inputUnit === 'fahrenheit' && outputUnit === 'celsius') {
            convertedValue = (inputValue - 32) * 5/9;
        } else {
            convertedValue = inputValue; // Same unit
        }
        resultDiv.textContent = `${inputValue} ${inputUnit} = ${convertedValue.toFixed(2)} ${outputUnit}`;
    }
    // Handle weight and distance conversions
    else {
        const baseValue = inputValue / conversions[inputType][inputUnit];
        const convertedValue = baseValue * conversions[inputType][outputUnit];
        resultDiv.textContent = `${inputValue} ${inputUnit} = ${convertedValue.toFixed(4)} ${outputUnit}`;
    }
}

// Swap input and output units
function swapUnits() {
    const inputUnit = document.getElementById('inputUnit');
    const outputUnit = document.getElementById('outputUnit');
    const temp = inputUnit.value;
    inputUnit.value = outputUnit.value;
    outputUnit.value = temp;
}

// Add event listeners
document.getElementById('convertBtn').addEventListener('click', convert);
document.getElementById('swapBtn').addEventListener('click', swapUnits);
