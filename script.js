
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function addExpense() {
    var date = document.getElementById('date').value;
    var category = document.getElementById('category').value;
    var amount = document.getElementById('amount').value;
    var description = document.getElementById('description').value;
    var editIndex = document.getElementById('editIndex').value;

    if (editIndex === '') {
        expenses.push({ date: date, category: category, amount: amount, description: description });
        localStorage.setItem('expenses', JSON.stringify(expenses));
    } else {
        editExpense(editIndex, date, category, amount, description);
    }

    showExpenses();
    resetForm();
}

function editExpense(index, date, category, amount, description) {
    expenses[index] = { date: date, category: category, amount: amount, description: description };
    localStorage.setItem('expenses', JSON.stringify(expenses));
    var tableRow = document.getElementById('expenseTable').rows[index + 1];
    tableRow.cells[0].innerHTML = date;
    tableRow.cells[1].innerHTML = category;
    tableRow.cells[2].innerHTML = amount;
    tableRow.cells[3].innerHTML = description;
    resetForm();
}

function deleteExpense(row) {
    var index = row.rowIndex - 1;
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    row.parentNode.removeChild(row);
}

function showExpenses() {
    var tableBody = document.getElementById('expenseTableBody');
    tableBody.innerHTML = '';
    for (var i = 0; i < expenses.length; i++) {
        var expense = expenses[i];
        var row = '<tr><td>' + expense.date + '</td><td>' + expense.category + '</td><td>' + expense.amount + '</td><td>' + expense.description + '</td><td><button type="button" class="btn btn-sm btn-primary" onclick="editForm(this.parentNode.parentNode)">Edit</button> <button type="button" class="btn btn-sm btn-danger" onclick="deleteExpense(this.parentNode.parentNode)">Delete</button></td></tr>';
        tableBody.insertAdjacentHTML('beforeend', row);
    }
}

function editForm(row) {
    var index = row.rowIndex - 1;
    document.getElementById('date').value = expenses[index].date;
    document.getElementById('category').value = expenses[index].category;
    document.getElementById('amount').value = expenses[index].amount;
    document.getElementById('description').value = expenses[index].description;
    document.getElementById('editIndex').value = index;
}

function resetForm() {
    document.getElementById('date').value = '';
    document.getElementById('category').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('editIndex').value = '';
    document.getElementById('addButton').innerHTML = 'Add Expense';
}

document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addExpense();
});

showExpenses();