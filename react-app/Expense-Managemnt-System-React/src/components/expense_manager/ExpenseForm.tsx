import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { categories, expense } from "./ExpenseTypes";

const schema = z.object({
  desc: z.string().min(3).max(100),
  category: z.enum(categories, {
    errorMap: (issue, ctx) => ({ message: "Enter a valid Category" }),
  }),
  amount: z
    .number({ invalid_type_error: "Amount is required" })
    .gte(1)
    .lte(10_000),
});

interface Props {
  onExpenseAdd: (obj: expense) => void;
}

const ExpenseForm = ({ onExpenseAdd }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<expense>({ resolver: zodResolver(schema) });

  const submitHandler = (obj: expense) => {
    onExpenseAdd(obj);
  };

  return (
    <form className="mb-3" onSubmit={handleSubmit(submitHandler)}>
      <div className="mb-3">
        <label htmlFor="desc" className="label-control">
          Description:{" "}
        </label>
        <input
          {...register("desc")}
          id="desc"
          type="text"
          className="form-control"
        />
        {errors.desc && <p className="text-danger">{errors.desc.message}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="label-control">
          Description:{" "}
        </label>
        <select
          {...register("category")}
          id="category"
          className="form-control"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="amount" className="label-control">
          Amount:{" "}
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>

      <button className="btn btn-primary">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
