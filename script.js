const amount = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const result = document.getElementById('result');
const convertBtn = document.getElementById('convert-btn');
const swapBtn = document.getElementById('swap');
const rateInfo = document.getElementById('rate-info');

// Fetch exchange rates from API
async function calculate() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amt = parseFloat(amount.value);

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const data = await response.json();
        const rate = data.rates[to];
        const convertedAmount = (amt * rate).toFixed(2);
        
        result.value = convertedAmount;
        rateInfo.textContent = `1 ${from} = ${rate} ${to}`;
    } catch (error) {
        rateInfo.textContent = "Error fetching exchange rates. Try again later.";
    }
}

// Swap currencies
function swapCurrencies() {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    calculate();
}

// Event Listeners
convertBtn.addEventListener('click', calculate);
swapBtn.addEventListener('click', swapCurrencies);
amount.addEventListener('input', calculate);
fromCurrency.addEventListener('change', calculate);
toCurrency.addEventListener('change', calculate);

// Initial calculation on page load
calculate();