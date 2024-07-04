import React, { useState } from "react";
import ExpenseFilter from "./components/expense_manager/ExpenseFilter";
import ExpenseForm from "./components/expense_manager/ExpenseForm";
import ExpenseList from "./components/expense_manager/ExpenseList";
import { expense } from "./components/expense_manager/ExpenseTypes";
import Form from "./components/Form";

const default_expenses: expense[] = [
  { desc: "Bread", category: "Grocery", amount: 50 },
  { desc: "Mobile", category: "Utilities", amount: 5000 },
  { desc: "Television", category: "Entertainment", amount: 50 },
];

const App2 = () => {
  const [expensesState, setExpenses] = useState(default_expenses);
  const [selectedCategory, setCategory] = useState("all");

  const visibleExpenses =
    selectedCategory == "all"
      ? expensesState
      : expensesState.filter((expense) => expense.category == selectedCategory);

  const handleRemove = (selectedExpense: expense) => {
    setExpenses(
      expensesState.filter(
        (expense) =>
          !(
            expense.amount == selectedExpense.amount &&
            expense.desc == selectedExpense.desc
          )
      )
    );
  };

  return (
    <>
      <div className="container mt-3">
        <h4>Form Component</h4>
        <hr />
        <ExpenseForm
          onExpenseAdd={(obj) => {
            setExpenses([...expensesState, obj]);
          }}
        />
        <h4>Filter Component</h4>
        <hr />
        <ExpenseFilter
          handleSelection={(selectedCategory) => {
            setCategory(selectedCategory);
          }}
        />
        <h4>List Component</h4>
        <hr />
        <ExpenseList expenses={visibleExpenses} removeExpense={handleRemove} />
      </div>
    </>
  );
};

export default App2;
