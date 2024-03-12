import React, { useState } from "react";
import { Form, Select } from "antd";
import skillsList from "./skillsList";

const { Option } = Select;

const SkillsSection = () => {
  const [form] = Form.useForm();
  const [selectedSkills, setSelectedSkills] = useState([]);

  return (
    <>
      <Form.Item
        label="Skills"
        name="skills"
        rules={[
          {
            required: true,
            message: "Please select at least one skill",
          },
        ]}
      >
        <Select
          mode="multiple"
          placeholder="Select skills"
          allowClear
          onChange={(selectedOptions) => {
            form.setFieldsValue({ skills: selectedOptions });
            setSelectedSkills(selectedOptions);
          }}
        >
          {skillsList.map((skill) => (
            <Option key={skill} value={skill}>
              {skill}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default SkillsSection;
