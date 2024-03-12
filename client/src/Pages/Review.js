import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Popover, Button } from 'antd';
import { LinkedinFilled, GithubFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../Styles/Stylesheets/review.css'; 
import DefaultLayout from '../Components/DefaultLayout';

const Review = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/users');
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const renderSkills = (skills) => (
    <div className='skills-container'>
      <ul className='skills'>
        {skills.map((skill, i) => (
          <li key={i}>{skill}</li>
        ))}
      </ul>
    </div>
  );

  const renderSocialMedia = (record) => (
    <span style={{ display: 'flex', alignItems: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
      <a href={record.linkedIn} target="_blank" rel="noopener noreferrer">
        <LinkedinFilled style={{ color: '#4169E1', marginRight: '8px' }} />
      </a>
      <a href={record.github} target="_blank" rel="noopener noreferrer">
        <GithubFilled style={{ color: '#583759' }} />
      </a>
    </span>
  );

  const handleEmailClick = (email) => {
    const mailtoLink = `mailto:${email}`;
    window.open(mailtoLink, '_blank');
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => (
        <Link to={`/comments/${record._id}`} style={{ color: 'black', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {text}
        </Link>
      ),
      width: '20%',
    },
    {
      title: 'Social Media',
      dataIndex: 'socialMedia',
      key: 'socialMedia',
      render: (text, record) => (
        <Popover content={renderSocialMedia(record)} title="Social Media" trigger="click">
          <Button type="link" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>View Social Media</Button>
        </Popover>
      ),
      width: '20%',
    },
    {
      title: 'Skills',
      dataIndex: 'skills',
      key: 'skills',
      render: (skills) => (
        <Popover content={renderSkills(skills)} title="User Skills" trigger="click">
          <Button type="link" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>View Skills</Button>
        </Popover>
      ),
      width: '15%',
    },
    {
      title: 'Send Email',
      dataIndex: 'email',
      key: 'sendEmail',
      render: (text, record) => (
        <Button type="primary" onClick={() => handleEmailClick(record.email)}>
          Send Email
        </Button>
      ),
      width: '15%',
    },
  ];

  return (
    <DefaultLayout>
      <div className="reviews">
        <Table
          dataSource={users}
          columns={columns}
          rowKey="_id"
          style={{ width: '100%' }}
          rowHeight={30}
          pagination={{ pageSize: 50 }}
        />
      </div>
    </DefaultLayout>
  );
};

export default Review;
