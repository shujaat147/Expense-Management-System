import { expense } from "./Data";

interface Props {
  expenses: expense[];
  removeExpense: (exp: expense) => void;
}

const List = ({ expenses, removeExpense }: Props) => {

  const formatAmount = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <table className="table table-bordered text-center table-hover table-dark">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Description</th>
          <th scope="col">Categories</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Sub-Total</th>
          <th scope="col" className="print-hide">Action</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((exp, index) => {
          return (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{exp.desc}</td>
              <td>{exp.category}</td>
              <td>{formatAmount(exp.price)}</td>
              <td>{exp.quantity}</td>
              <td>{formatAmount(exp.subTotal)}</td>
              <td className="print-hide">
                <button className="btn btn-danger" onClick={() => { removeExpense(exp) }}>Remove</button>
              </td>
            </tr>
          );
        })}

        <tr className="colorWhite">
          <th colSpan={3} scope="row"><h5>Total</h5></th>
          <th>{formatAmount(expenses.reduce((acc, expense) => { return acc + expense.price }, 0))}</th>
          <th>{expenses.reduce((acc, expense) => { return acc + expense.quantity }, 0)}</th>
          <th>{formatAmount(expenses.reduce((acc, expense) => { return acc + expense.subTotal }, 0))}</th>
          <th className="print-hide"><button className="btn btn-success px-4" onClick={handlePrint}>Print</button></th>
        </tr>
      </tbody>
    </table>
  );
};

export default List;
