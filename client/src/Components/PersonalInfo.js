import { Form, Input } from "antd";
import React from "react";

const { TextArea } = Input;

function PersonalInfo() {
  return (
    <div className="personal-info-container">
      <div className="row">
        <div>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: "Missing first name" }]}
          >
            <Input />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Missing last name" }]}
          >
            <Input />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Missing email" }]}
          >
            <Input />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            name="mobileNumber"
            label="Mobile Number"
            rules={[{ required: true, message: "Missing mobile number" }]}
          >
            <Input />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            name="linkedIn"
            label="LinkedIn"
            rules={[{ required: true, message: "Missing LinkedIn URL" }]}
          >
            <Input />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            name="github"
            label="GitHub"
            rules={[{ required: true, message: "Missing GitHub URL" }]}
          >
            <Input />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            name="portfolio"
            label="Portfolio"
            rules={[{ required: true, message: "Missing Portfolio URL" }]}
          >
            <Input />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Missing address" }]}
          >
            <TextArea />
          </Form.Item>
        </div>
        <div>
          <Form.Item name="leetCode" label="LeetCode">
            <Input />
          </Form.Item>
        </div>
        <div>
          <Form.Item name="Codechef" label="Codechef">
            <Input />
          </Form.Item>
        </div>
        <div>
          <Form.Item name="codeForces" label="CodeForces">
            <Input />
          </Form.Item>
        </div>
        <div>
          <Form.Item name="geeksforgeeks" label="GeeksForGeeks">
            <Input />
          </Form.Item>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
