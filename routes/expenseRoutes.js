const express=require('express');
const expenseController=require('../controllers/expenseController');
const userAuthentication=require('../middleware/auth');

const router=express.Router();


// Fetch expense page
router.get('/',expenseController.getExpesnePage);

// Fetch all expenses
router.get('/all',userAuthentication,expenseController.getAllExpenses);

// Add new expense
router.post('/',userAuthentication,expenseController.addNewExpense);

// Delete a expense
router.delete('/:id',userAuthentication,expenseController.deleteExpense);

// Edit an Expense
router.put('/:id',userAuthentication,expenseController.updateExpense);

module.exports=router;

