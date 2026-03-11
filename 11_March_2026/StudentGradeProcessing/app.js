const marks = [65, 70, 80, 55, 90];

document.getElementById("original").innerText = marks;

function processMarks()
{
    const updatedMarks = marks.map(mark => mark + 5);

    document.getElementById("updated").innerText = updatedMarks;
}