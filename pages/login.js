import React, { useState } from "react";
import { server } from "../config";
import login from "../styles/Login.module.css";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" }),
    changeLoginInfo = (e) => {
      const { name, value } = e.target;
      setLoginInfo({ ...loginInfo, [name]: value });
    };
  const handleLogin = async (e) => {
    e.preventDefault();
    const req = await fetch(`${server}/api/auth`, {
      method: "POST",
      body: JSON.stringify(loginInfo),
    });
    const res = await req.json();
    console.log(res);
  };
  return (
    <form
      method="POST"
      action="/api/auth"
      onSubmit={handleLogin}
      className={login.loginForm + " rounded-lg p-8 mt-4"}
    >
      <h2 className="text-[crimson] font-bold text-[24px] text-center">
        Login
      </h2>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" onChange={changeLoginInfo} required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={changeLoginInfo}
          required
        />
      </div>
      <div className="text-center">
        <input
          type="submit"
          className="mt-8 py-2 px-11 hover:bg-[#ee3251] cursor-pointer rounded-md text-white bg-[crimson]"
          value="Login"
        />
      </div>
    </form>
  );
};

export default Login;
