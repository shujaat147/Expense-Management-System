import React from "react";
import { expense } from "./ExpenseTypes";

interface Props {
  expenses: expense[];
  removeExpense: (exp: expense) => void;
}

const ExpenseList = ({ expenses, removeExpense }: Props) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Description</th>
          <th scope="col">Category</th>
          <th scope="col">Amount</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((exp, index) => {
          return (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{exp.desc}</td>
              <td>{exp.category}</td>
              <td>{exp.amount}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    removeExpense(exp);
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          );
        })}
        <tr>
          <td colSpan={4}>Total Amount:</td>
          <td>
            {expenses.reduce((acc, expense) => {
              return acc + expense.amount;
            }, 0)}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ExpenseList;
