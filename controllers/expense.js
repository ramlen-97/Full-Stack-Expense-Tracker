const Expense = require('../models/expense');
const path=require('path');

const getExpesnePage=(req,res)=>{
    try {
        res.sendFile(path.join(__dirname,"../public/views/expense.html"))
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": error.message });
    }
}

const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        res.status(200).json(expenses);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong.Try again!' })
    }
}
const addNewExpense = async (req, res) => {
    try {
        const { amount, description, category } = req.body;
        if (!amount || !description || !category) {
            return res.status(400).json({ message: 'Some fields are misisng!' });
        }
        const expense = await Expense.create(req.body);
        res.status(201).json(expense);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong.Try again!' })
    }
}

const deleteExpense = async (req, res) => {
    try {
        const id=req.params.id;
        const expense = await Expense.findByPk(id);
        await expense.destroy();
        res.status(200).json({message:'Expense deleted successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong.Try again!' })
    }
}

const updateExpense = async (req, res) => {
    try {
        const id=req.params.id;
        const expense = await Expense.findByPk(id);
        expense.set(req.body);
        await expense.save();
        res.status(200).json(expense);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong.Try again!' })
    }
}

module.exports = {
    getExpesnePage,
    getAllExpenses,
    addNewExpense,
    updateExpense,
    deleteExpense
}


