import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axios from 'axios';
import { Button, Input, Form } from 'antd';
import moment from 'moment';
import CommentTemplate from './templates/CommentTemplate';
import '../Styles/Stylesheets/comment.css';

const Comments = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [userResume, setUserResume] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    fetchComments();
    fetchUser();
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://resumesearchmain.onrender.com/api/comments/${id}`);
      const commentsWithTime = response.data.map(comment => ({
        ...comment,
        formattedTime: moment(comment.timestamp).format('MMM DD, YYYY h:mm A'),
      }));
      setComments(commentsWithTime);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmit = async (values) => {
    const storedUsername = localStorage.getItem('ResumeUser');
    const { username } = JSON.parse(storedUsername);
    const comment = values.comment.trim();

    if (!comment) {
      console.error('Empty comment, not submitting.');
      return;
    }

    try {
      await axios.post(`https://resumesearchmain.onrender.com/api/comments/${id}`, {
        username,
        comment,
      });
      fetchComments();
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://resumesearchmain.onrender.com/api/comments/user/${id}`);
      const userResumeData = response.data;
      setUserResume(userResumeData);
      console.log(userResumeData);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const scrollToBottom = () => {
    window.scrollTo(0, document.documentElement.scrollHeight);
  };

  return (
    <div className="comments-wrapper" ref={chatContainerRef}>
      <div className="comments-container">
        <Form
          className="comments-form"
          onFinish={handleSubmit}
          style={{ width: '400px', padding: '10px', height: '200px', paddingTop: '30px' }}
        >
          <Form.Item
            name="comment"
            rules={[{ required: true, message: 'Please enter a comment!' }]}
          >
            <Input.TextArea placeholder="Comment" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Comment
            </Button>
          </Form.Item>
        </Form>

        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={comment._id} className="comment-item">
              <div className="comment-header">
                <strong>{comment.username}</strong>
                <small className="comment-time">
                  <AccessTimeIcon fontSize="small" /> {comment.formattedTime}
                </small>
              </div>
              <div className="comment-body">
                <span>{comment.comment}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {userResume && (
        <div className="comment-template-container">
          <CommentTemplate user={userResume} />
        </div>
      )}
    </div>
  );
};

export default Comments;
