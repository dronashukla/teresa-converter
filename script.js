// Conversion rates relative to a base unit
const conversionRates = {
    // Distance (base: meters)
    meters: 1,
    km: 1000,
    miles: 1609.34,
    ft: 0.3048,
    inches: 0.0254,
    cm: 0.01,
    // Weight (base: kg)
    kg: 1,
    lbs: 0.453592,
    // Currency (base: USD) - approximate rates
    USD: 1,
    EUR: 0.85,
    GBP: 0.75,
    JPY: 110,
    AUD: 1.35,
    CAD: 1.25,
    CHF: 0.92,
    CNY: 6.45,
    INR: 74,
    BRL: 5.25
};

// Groups of units to check compatibility
const unitGroups = {
    distance: ['meters', 'km', 'miles', 'ft', 'inches', 'cm'],
    weight: ['kg', 'lbs'],
    currency: ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 'BRL']
};

// Function to figure out which group a unit belongs to
function getUnitGroup(unit) {
    for (const group in unitGroups) {
        if (unitGroups[group].includes(unit)) {
            return group;
        }
    }
    return null;
}

// Function to do the conversion
function convert() {
    const inputValue = parseFloat(document.getElementById('inputValue').value); // Get the number
    const inputUnit = document.getElementById('inputUnit').value; // Get the starting unit
    const outputUnit = document.getElementById('outputUnit').value; // Get the unit to convert to
    const resultDiv = document.getElementById('result'); // Where the result shows

    // Check if all fields are filled
    if (!inputValue || !inputUnit || !outputUnit) {
        resultDiv.textContent = 'Please fill in all fields.';
        return;
    }

    // Check if units are compatible
    const inputGroup = getUnitGroup(inputUnit);
    const outputGroup = getUnitGroup(outputUnit);
    if (inputGroup !== outputGroup) {
        resultDiv.textContent = 'Units not compatible';
        return;
    }

    // Convert to the base unit first, then to the output unit
    const baseValue = inputValue / conversionRates[inputUnit]; // To base (e.g., meters or kg or USD)
    const outputValue = baseValue * conversionRates[outputUnit]; // To output unit

    // Show the result with 4 decimal places for precision
    resultDiv.textContent = `${inputValue} ${inputUnit} = ${outputValue.toFixed(4)} ${outputUnit}`;
}

// Make the button work
document.getElementById('convertBtn').addEventListener('click', convert);
