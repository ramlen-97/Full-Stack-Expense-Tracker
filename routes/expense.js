const express=require('express');
const expenseController=require('../controllers/expense');
const router=express.Router();


// Fetch expense page
router.get('/',expenseController.getExpesnePage);

// Fetch all expenses
router.get('/all',expenseController.getAllExpenses);

// Add new expense
router.post('/',expenseController.addNewExpense);

// Delete a expense
router.delete('/:id',expenseController.deleteExpense);

// Edit an Expense
router.put('/:id',expenseController.updateExpense);

module.exports=router;

