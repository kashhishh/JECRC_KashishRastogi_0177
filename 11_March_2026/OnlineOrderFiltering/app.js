const orders = [450, 1200, 700, 3000, 1500];

document.getElementById("allOrders").innerText = orders;

function filterOrders()
{
const filtered = orders.filter(order => order > 1000);

document.getElementById("filteredOrders").innerText = filtered;
}