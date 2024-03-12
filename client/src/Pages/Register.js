import React, { useEffect, useState } from "react";
import { Form, Input, Button, message} from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CachedIcon from '@mui/icons-material/Cached';
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import "../Styles/Stylesheets/authentication.css";

function Register() {
  const [form] = Form.useForm();
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const onFinish = async (values) => {

    try {
      await axios.post("api/user/register", { ...values, captchaInput });
      message.success("Registration successfull");
    } catch (error) {
      message.error("Registration failed");
    } finally {
      form.resetFields();
    }
  };
  const captchahandler = async () => {
    const response = await axios.get("/api/user/captcha");
    setCaptchaValue(response.data);
    setCaptchaInput("");
  };
  useEffect(() => {
    const fetchCaptcha = async () => {
      try {
        console.log("Fetching CAPTCHA...");
        const response = await axios.get("/api/user/captcha");
        console.log("CAPTCHA response:", response.data);
        setCaptchaValue(response.data);
      } catch (error) {
        console.error("Failed to fetch CAPTCHA", error);
      }
    };

    fetchCaptcha();
  }, []);
  useEffect(() => {
    if (localStorage.getItem("ResumeUser")) {
      navigate("/home");
    }
  });

  return (
    <div className="AuthBackground">
    <div className="authenticationParent">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <h1 style={{position:'relative',left:'30%'}}>Register</h1>
        <hr />
        <Form.Item
          name="username"
          label="Username"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
        >
          {!showPassword?<Input type="password" />:<Input type="text" />}
          {!showPassword?<EyeOutlined className="passwordToggle" onClick={()=>setShowPassword(!showPassword)} size={18}/>:
          <EyeInvisibleOutlined className="passwordToggle"  onClick={()=>setShowPassword(!showPassword)}  size={18}/>}
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
        >
          {!showConfirmPassword?<Input type="password" />:<Input type="text" />}
          {!showConfirmPassword?<EyeOutlined className="passwordToggle" onClick={()=>setShowConfirmPassword(!showConfirmPassword)} size={18}/>:
          <EyeInvisibleOutlined className="passwordToggle"  onClick={()=>setShowConfirmPassword(!showConfirmPassword)}  size={18}/>}
        </Form.Item>

        <Form.Item label="Enter CAPTCHA">
          <div className="captcha-container">
            <Input
              className="captcha-input"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
            />
            <span
              className="captcha-value"
            >
              {captchaValue}
            </span>
            <Button
              type="link"
              onClick={captchahandler}
              style={{ marginLeft: "-70px" }}
            >
              <CachedIcon/>
            </Button>
          </div>
        </Form.Item>

        <div className="ButtonContainer">
          <Button
            htmlType="submit"
          >
            Register
          </Button>
          <p>
            Already Registered ? 
          <Link to="/login"> Login</Link>
          </p>
        </div>
      </Form>
    </div>
  </div>
  );
}

export default Register;
