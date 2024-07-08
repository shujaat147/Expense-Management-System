import { useState } from "react";
import { expense } from "./components/Data";
import List from "./components/List";
import Filter from "./components/Filter";
import Form from "./components/Form";
import "./App.css";

const default_expenses: expense[] = [
  {
    desc: "Mobile",
    category: "Utilities",
    quantity: 10,
    price: 700,
    subTotal: 700 * 10,
  },
  {
    desc: "Bread",
    category: "Groceries",
    quantity: 5,
    price: 100,
    subTotal: 100 * 5,
  },
  {
    desc: "Television",
    category: "Entertainment",
    quantity: 2,
    price: 20000,
    subTotal: 20000 * 2,
  },
];

const App = () => {
  const [expensesState, setExpenses] = useState(default_expenses);
  const [filterState, setFilter] = useState("all");

  const visibleExpense =
    filterState == "all"
      ? expensesState
      : expensesState.filter((e) => e.category == filterState);

  const handleRemove = (selectedExpense: expense) =>
    setExpenses(
      expensesState.filter(
        (e) =>
          !(
            e.quantity == selectedExpense.quantity &&
            e.desc == selectedExpense.desc
          )
      )
    );

  const formatAmount = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className="container text-white">
      <h1 className="text-center mb-5 mt-3 line"> Expense Management System </h1>
      <div className="print-hide">
        <h4 className="text-center line"> Form Component </h4>
        <Form onExpenseAdd={(obj)=>{setExpenses([...expensesState, obj])}}/>
  

        <h4 className="text-center line mb-3"> Filter Component </h4>
        <Filter
          handleFilters={(SelectedOption) => {
            setFilter(SelectedOption);
          }}
        />
  
      </div>

      <h4 className="text-center line mt-5 mb-3"> List Component </h4>

      <List expenses={visibleExpense} removeExpense={handleRemove} />

    </div>
  );
};

export default App;
