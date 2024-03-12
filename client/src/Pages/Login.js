import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Stylesheets/authentication.css";
import CachedIcon from '@mui/icons-material/Cached';
import axios from "axios";

function Login() {
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      console.log(values);
      const user = await axios.post("/api/user/login", { ...values, captchaInput });
      message.success("Login successful");
      localStorage.setItem("ResumeUser", JSON.stringify(user.data));
      navigate("/home");
    } catch (error) {
      console.log(error);
      message.error("Login failed");
    }
  };

  const fetchCaptcha = async () => {
    try {
      const response = await axios.get("/api/user/captcha");
      setCaptchaValue(response.data);
    } catch (error) {
      console.error("Failed to fetch CAPTCHA", error);
    }
  };

  const captchahandler = async () => {
    await fetchCaptcha();
    setCaptchaInput("");
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("ResumeUser")) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="AuthBackground">
      <div className="authenticationParent">
        <Form layout="vertical" onFinish={onFinish}>
          <h1 style={{ position: 'relative', left: '35%' }}>Login</h1>
          <hr />
          <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please enter your username' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter your password' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label="Enter CAPTCHA">
            <div className="captcha-container">
              <Input
                className="captcha-input"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
              />
              <span className="captcha-value">{captchaValue}</span>
              <Button type="link" onClick={captchahandler} style={{ marginLeft: "-70px" }}>
                <CachedIcon />
              </Button>
            </div>
          </Form.Item>
          <div className="ButtonContainer">
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <p>
              Not a Member? <Link to="/register">Register Now</Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
