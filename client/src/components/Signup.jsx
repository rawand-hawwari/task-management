import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    country: "",
    password: "",
  });
  const [confirm, setConfirm] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    if(e.target.name === "confirm_password"){
        setConfirm(e.target.value);
    }else{
        setFormData({
        ...formData,
        [name]: value,
        });
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    // validateForm();
    // if (!errors) {
      // console
      try {
        const response = await axios.post(
          "http://localhost:5000/Signup",
          formData
        );
        history("/");
      } catch (error) {
        console.error("Error:", error);
      }
    // }
  }

  return (
    <div className="py-10">
      <form action="" onSubmit={handleSubmit}>
        <div className="min-h-screen flex justify-center items-center">
          <div className="py-12 px-12 rounded-2xl shadow-xl z-20 bg-slate-100">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
                Create An Account
              </h1>
            </div>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  onChange={handleChange}
                  className="block text-sm py-3 px-4 rounded-lg w-full border border-[#bd9dce69] outline-none"
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  onChange={handleChange}
                  className="block text-sm py-3 px-4 rounded-lg w-full border border-[#bd9dce69] outline-none"
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
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
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                onChange={handleChange}
                className="block text-sm py-3 px-4 rounded-lg w-full border border-[#bd9dce69] outline-none"
              />
            </div>
            <div className="text-center mt-6">
              <button
                type="submit"
                className="py-3 w-64 text-xl hover:text-white bg-slate-400 border-2 hover:bg-slate-600 border-slate-400 rounded-2xl"
              >
                Sign Up
              </button>
              <p className="mt-4 text-sm">
                Already Have An Account?{" "}
                <Link to={"/login"}>
                  <span className="underline cursor-pointer"> Log In</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
