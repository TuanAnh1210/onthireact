import React from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";

const Add = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (product) => {
      const response = await axios.post(
        "http://localhost:3000/products",
        product
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["PRODUCTS"],
      });
      alert("Them moi thanh cong");
      navigate("/products");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: null,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    mutate(data);
  };
  return (
    <div className="container mt-5">
      <h2>React Bootstrap Form Example</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            {...(register("name"), { required: true })}
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            price
          </label>
          <input
            {...register("price")}
            type="number"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Add;
