import React, { FormEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z
    .string()
    .min(3, "please enter string with more than 3 char")
    .startsWith("aa", "use aa in start"),
  age: z.number({ invalid_type_error: "Please Enter a number" }).min(18),
});

type formData = z.infer<typeof schema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<formData>({ resolver: zodResolver(schema) });

  const submitHandler = (values: FieldValues) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          id="name"
          type="text"
          className="form-control"
          {...register("name")}
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age:
        </label>
        <input
          id="age"
          type="number"
          className="form-control"
          {...register("age", { valueAsNumber: true })}
        />
        {errors.age && <p className="text-danger">{errors.age.message}</p>}
      </div>

      <button className="btn btn-primary" type="submit" /*disabled={!isValid}*/>
        Submit
      </button>
    </form>
  );
};

export default Form;
