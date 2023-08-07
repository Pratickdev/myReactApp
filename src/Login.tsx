import Navbar from "./Navbar";
import "../src/assets/css/login.css";
import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "./redux/LoginSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Login() {
  const [error, setError] = useState<string>("");
  const nevigate = useNavigate();
  
  const dispath = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: FieldValues) => {
    //pass=> 83r5^_// 
    axios
      .post("https://fakestoreapi.com/auth/login", {
        username: "mor_2314",
        password: data.password,
      })
      .then((res) => {
        // console.log(res.data.token)
        dispath(login(res.data.token));
        localStorage.setItem('login', JSON.stringify(res.data.token));
        nevigate("/");
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data);
      });
  };
  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="loginWraper">
          <div className="mb-3">
            {error ? <p className="text-danger">{error}</p> : ""}
            <label htmlFor="exampleInputEmail1" className="htmlForm-label">
              Email address
            </label>
            <input
              type="email"
              {...register("email", {
                required: true,
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              })}
              className="htmlForm-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            {errors.email?.type === "required" && (
              <p className="text-danger">This field is requered</p>
            )}
            {errors.email?.type === "pattern" && (
              <p className="text-danger">Enter vaild email</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="htmlForm-label">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 4 })}
              className="htmlForm-control"
              id="exampleInputPassword1"
            />
            {errors.password?.type === "required" && (
              <p className="text-danger">This field is requered</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-danger">Enter min 4 degit</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
