import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import Discover from "./discover";
const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };
  const LOGO_PATH =
    "https://res.cloudinary.com/pengushe-home/image/upload/w_50,h_50,f_auto/v1664551849/profile_img/111664402955_.pic_eze9wu.jpg";

  return (
    
    <div className="auth_page">
    {/* <Discover /> */}
      <form onSubmit={handleSubmit}>
        <div className="container ">
          <h3 className="text-uppercase text-center">转手</h3>
          <div className="text-center mb-4">
            <img src={LOGO_PATH} alt="logo"></img>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">邮箱(Email)</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
            onChange={handleChangeInput}
            value={email}
          />

          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">密码(Password)</label>

          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={password}
              name="password"
            />

            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? "隐藏(hide)" : "显示(show)"}
            </small>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-dark w-100"
          disabled={email && password ? false : true}
        >
          登入 Login
        </button>

        <p className="my-2">
          还没有注册?{" "}
          <Link to="/register" style={{ color: "crimson" }}>
            马上注册
          </Link>
        </p>
        <p className="my-2">
          Don't have a account?{" "}
          <Link to="/register" style={{ color: "crimson" }}>
            Register Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
