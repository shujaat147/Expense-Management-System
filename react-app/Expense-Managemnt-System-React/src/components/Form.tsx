import { useForm } from "react-hook-form";
import { Categories, expense } from "./Data";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    desc: z.string().min(3).max(100),
    category: z.enum(Categories, {errorMap: (issue,ctx)=> ({message: "Enter a valid Category!"})}),
    price: z.number({invalid_type_error: "Price is required!"}).gt(1).lt(100000),
    quantity: z.number({invalid_type_error: "Quantity is required!"}).gt(1).lt(10000).int("Quantity should be a complete number!"),
})

interface Props{
    onExpenseAdd: (obj : expense) => void;
}

const Form = ({onExpenseAdd}: Props) => {

    const {register, handleSubmit, formState:{errors}} = useForm<expense>({resolver: zodResolver(schema)})
    const submitHandler = (obj: expense) => {
        const expenseWithSubTotal = {
          ...obj,
          subTotal: obj.price * obj.quantity,
        };
        onExpenseAdd(expenseWithSubTotal);
      };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="form-group mb-3">
        <label htmlFor="desc">Description: </label>
        <input type="text" {...register("desc")} className="form-control" id="desc" placeholder="Enter Description... (Mobile, Bread, Movie)"/>
        {errors.desc && <p className="text-warning">{errors.desc.message}</p>}
      </div>

      <div className="form-group mb-3">
        <label htmlFor="category" className="label-control mb-3">Select Category:</label>
      <select {...register("category")} className="form-select bg-dark text-white" id="category">
        <option value="">Select Category:</option>
        {Categories.map(cat=>(<option key={cat} value={cat}>{cat}</option>))}
      </select>
      {errors.category && <p className="text-warning">{errors.category.message}</p>}
      </div>

      <div className="form-group mb-3">
        <label htmlFor="price">Price: </label>
        <input type="number" {...register("price", {valueAsNumber: true})} className="form-control" id="price" placeholder="Enter Price..."/>
        {errors.price && <p className="text-warning">{errors.price.message}</p>}
      </div>

      <div className="form-group mb-3">
        <label htmlFor="quantity">Quantity: </label>
        <input type="number" {...register("quantity", {valueAsNumber: true})} className="form-control" id="quantity" placeholder="Enter Quantity..."/>
        {errors.quantity && <p className="text-warning">{errors.quantity.message}</p>}
      </div>

      <button type="submit" className="btn btn-primary px-4 mb-4">Submit</button>
    </form>
  );
};

export default Form;
