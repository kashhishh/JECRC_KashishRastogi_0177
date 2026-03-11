const marks = [35, 67, 48, 90, 55, 30];

document.getElementById("allMarks").innerText = marks;

function showPassStudents()
{
const passed = marks.filter(mark => mark > 50);

document.getElementById("passMarks").innerText = passed;
}