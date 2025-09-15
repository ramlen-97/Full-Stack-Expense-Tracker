let isEdit = false;
let editId = null;

document.addEventListener('DOMContentLoaded', initialize);

async function initialize() {
    try {
        const token = getToken();
        const response = await axios.get('expense/all', { headers: { "Authorization": token } });
        // console.log(response);
        for (let item of response.data) {
            displayExpense(item);
        }
    } catch (error) {
        console.log(error);
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    try {
        const token = getToken();
        const expenseObj = {
            amount: e.target.amount.value,
            description: e.target.description.value,
            category: e.target.category.value
        }

        let response;

        if (isEdit) {
            response = await axios.put(`expense/${editId}`, expenseObj, { headers: { "Authorization": token } });
            document.querySelector('button[type=submit]').textContent = 'Add Expense';
        } else {
            response = await axios.post('expense', expenseObj, { headers: { "Authorization": token } });
        }
        displayExpense(response.data);
        e.target.reset();

    } catch (error) {
        console.log(error);
    }
}

async function displayExpense(expense) {
    try {
        const expenseList = document.getElementById('expense-list');
        const listItem = document.getElementById(expense.id) || document.createElement('li');
        if (isEdit) {
            isEdit = false;
            editId = null;
        } else {
            listItem.id = expense.id;
            expenseList.append(listItem);
        }

        listItem.textContent = ` ${expense.amount} - ${expense.description} - ${expense.category} `;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', (event) => deleteExpense(event));
        listItem.append(deleteBtn);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => {
            document.getElementById("amount").value = expense.amount;
            document.getElementById("description").value = expense.description;
            document.getElementById("category").value = expense.category;
            document.querySelector('button[type=submit]').textContent = 'Update';
            isEdit = true;
            editId = expense.id;
        });
        listItem.append(editBtn);
    } catch (error) {
        console.log(error);
    }

}

async function deleteExpense(e) {
    try {
        const token = getToken();
        const id = e.target.parentElement.id;
        const response = await axios.delete(`expense/${id}`, { headers: { "Authorization": token } });
        if (id == editId) {
            editId = null;
            isEdit = false;
            document.querySelector('button[type=submit]').textContent = 'Add Expense';
            document.querySelector('form').reset();
        }
    } catch (error) {
        console.log(error);
    }
}

function getToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = "../views/login.html";
    }
    return token;
}