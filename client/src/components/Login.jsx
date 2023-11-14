import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const history = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:5000/Login",
        formData
      );
      history("/");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="border-2">
      <form action="" onSubmit={handleSubmit}>
        <div className="min-h-screen flex justify-center items-center">
          <div className="py-8 px-12 bg-slate-100 rounded-2xl shadow-xl z-20">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
                Log In
              </h1>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                name="email"
                placeholder="Email Addres"
                onChange={handleChange}
                className="block text-sm py-3 px-4 rounded-lg w-full border border-[#bd9dce69] outline-none"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="block text-sm py-3 px-4 rounded-lg w-full border border-[#bd9dce69] outline-none"
              />
              <Link to={"/"}>
                <p className="mt-4 text-sm cursor-pointer text-start"> Forgot yo password?</p>
              </Link>
            </div>
            <div className="text-center mt-6">
              <button
                type="submit"
                className="py-3 w-64 text-xl hover:text-white bg-slate-400 border-2 hover:bg-slate-600 border-slate-400 rounded-2xl"
              >
                Log In
              </button>
              <p className="mt-4 text-sm text-sky-900">
                Don't Have An Account?{" "}
                <Link to={"/signup"}>
                  <span className="underline cursor-pointer"> Sign Up</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
