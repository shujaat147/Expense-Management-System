import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import {z} from "zod";

const schema = z.object({
  name: z.string().min(3,"Please Enter string with more than 3 Charatcers!"),
  age: z.number({invalid_type_error:"Please Enter a number!"}).min(18)
})

type FormData =  z.infer<typeof schema>

const MyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({resolver: zodResolver(schema)});

  console.log(errors);
  const submitHandler = (values: FieldValues) => console.log(values);

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="container">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          type="text"
          id="name"
          className="form-control"
          {...register("name")}
        />
      </div>
      {errors.name && (
        <p className="text-danger">{errors.name.message}</p>
      )}


      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age:
        </label>
        <input
          type="text"
          id="age"
          className="form-control"
          {...register("age", {valueAsNumber: true})}
        />
      </div>
      {errors.age && (
        <p className="text-danger">{errors.age.message}</p>
      )}

      <button className="btn btn-primary" type="submit" value="Submit" disabled={!isValid}
      >Submit</button>
    </form>
  );
};

export default MyForm;
