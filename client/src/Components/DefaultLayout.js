import { Button, Dropdown, Menu } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Stylesheets/defaultlayout.css";
import PersonIcon from '@mui/icons-material/Person';
import { HomeOutlined, UserOutlined,IdcardOutlined , LogoutOutlined } from '@ant-design/icons'; // Import Ant Design icons
import img1 from '../Styles/Images/approved.png';

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("ResumeUser"));
  const navigate = useNavigate();

  const menu = (
    <Menu >
      <Menu.Item icon={<HomeOutlined style={{ color: '#1890ff' }} />}>
        <Link to="/home">Home</Link>
      </Menu.Item>
      <Menu.Item icon={<UserOutlined style={{ color: '#1890ff' }} />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item icon={<IdcardOutlined  style={{ color: '#1890ff' }} />}>
        <Link to="/review">Review</Link>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          localStorage.removeItem("ResumeUser");
          navigate("/login");
        }}
        icon={<LogoutOutlined style={{ color: '#1890ff' }} />}
      >
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="layout">
      <div className="header">
        <h1 onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
          <img src={img1} alt="logo" height={80} width={100}/>ResumeMaker
        </h1>
        <Dropdown overlay={menu} placement="bottomLeft">
          <Button className="iconButton" icon={<PersonIcon/>} style={{width:'140px'}}>
             {user.username}
          </Button>
        </Dropdown>
      </div>
      <div className="content">
        {props.children}
      </div>
    </div>
  );
}

export default DefaultLayout;
