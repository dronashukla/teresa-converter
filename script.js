// Conversion factors (example values, adjust as needed)
const conversionRates = {
    // Length
    meters: { meters: 1, km: 0.001, miles: 0.000621371, ft: 3.28084, inches: 39.3701, cm: 100 },
    km: { meters: 1000, km: 1, miles: 0.621371, ft: 3280.84, inches: 39370.1, cm: 100000 },
    miles: { meters: 1609.34, km: 1.60934, miles: 1, ft: 5280, inches: 63360, cm: 160934 },
    ft: { meters: 0.3048, km: 0.0003048, miles: 0.000189394, ft: 1, inches: 12, cm: 30.48 },
    inches: { meters: 0.0254, km: 0.0000254, miles: 0.000015783, ft: 0.0833333, inches: 1, cm: 2.54 },
    cm: { meters: 0.01, km: 0.00001, miles: 0.00000621371, ft: 0.0328084, inches: 0.393701, cm: 1 },
    // Weight
    kg: { kg: 1, lbs: 2.20462 },
    lbs: { kg: 0.453592, lbs: 1 },
    // Currency (example rates, static)
    USD: { USD: 1, EUR: 0.85, GBP: 0.73, JPY: 110, AUD: 1.35, CAD: 1.25, CHF: 0.92, CNY: 6.45, INR: 74, BRL: 5.2 },
    EUR: { USD: 1.18, EUR: 1, GBP: 0.86, JPY: 129.5, AUD: 1.59, CAD: 1.47, CHF: 1.08, CNY: 7.6, INR: 87, BRL: 6.1 },
    GBP: { USD: 1.37, EUR: 1.16, GBP: 1, JPY: 150, AUD: 1.84, CAD: 1.71, CHF: 1.25, CNY: 8.8, INR: 101, BRL: 7.1 },
    JPY: { USD: 0.0091, EUR: 0.0077, GBP: 0.0067, JPY: 1, AUD: 0.0123, CAD: 0.0114, CHF: 0.0084, CNY: 0.059, INR: 0.67, BRL: 0.047 },
    AUD: { USD: 0.74, EUR: 0.63, GBP: 0.54, JPY: 81.5, AUD: 1, CAD: 0.93, CHF: 0.68, CNY: 4.8, INR: 55, BRL: 3.85 },
    CAD: { USD: 0.80, EUR: 0.68, GBP: 0.58, JPY: 87.5, AUD: 1.08, CAD: 1, CHF: 0.73, CNY: 5.15, INR: 59, BRL: 4.1 },
    CHF: { USD: 1.09, EUR: 0.93, GBP: 0.80, JPY: 119, AUD: 1.47, CAD: 1.37, CHF: 1, CNY: 7, INR: 80, BRL: 5.6 },
    CNY: { USD: 0.15, EUR: 0.13, GBP: 0.11, JPY: 16.9, AUD: 0.21, CAD: 0.19, CHF: 0.14, CNY: 1, INR: 11.5, BRL: 0.81 },
    INR: { USD: 0.013, EUR: 0.011, GBP: 0.0099, JPY: 1.49, AUD: 0.018, CAD: 0.017, CHF: 0.0125, CNY: 0.087, INR: 1, BRL: 0.07 },
    BRL: { USD: 0.19, EUR: 0.16, GBP: 0.14, JPY: 21.3, AUD: 0.26, CAD: 0.24, CHF: 0.18, CNY: 1.24, INR: 14.3, BRL: 1 }
};

// Conversion function
document.getElementById('convertBtn').addEventListener('click', function() {
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const inputUnit = document.getElementById('inputUnit').value;
    const outputUnit = document.getElementById('outputUnit').value;
    const resultDiv = document.getElementById('result');

    if (!inputValue || !inputUnit || !outputUnit) {
        resultDiv.textContent = 'Please enter a value and select both units.';
        return;
    }

    if (conversionRates[inputUnit] && conversionRates[inputUnit][outputUnit]) {
        const result = inputValue * conversionRates[inputUnit][outputUnit];
        resultDiv.textContent = `${inputValue} ${inputUnit} = ${result.toFixed(2)} ${outputUnit}`;
    } else {
        resultDiv.textContent = 'Units not compatible.';
    }
});

// Swap units function
document.getElementById('swapUnitsBtn').addEventListener('click', function() {
    const inputUnit = document.getElementById('inputUnit');
    const outputUnit = document.getElementById('outputUnit');
    const temp = inputUnit.value;
    inputUnit.value = outputUnit.value;
    outputUnit.value = temp;
});
