const cart = [500, 1200, 800, 1500];

document.getElementById("cartItems").innerText = cart;

function calculateTotal()
{
const total = cart.reduce((sum, price) => sum + price, 0);

document.getElementById("totalPrice").innerText = "₹ " + total;
}