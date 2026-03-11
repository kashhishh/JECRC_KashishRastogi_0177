const prices = [1200, 800, 1500, 2000];

document.getElementById("originalPrices").innerText = prices;

function applyDiscount()
{
const discounted = prices.map(price => price * 0.9);

document.getElementById("discountedPrices").innerText = discounted;
}