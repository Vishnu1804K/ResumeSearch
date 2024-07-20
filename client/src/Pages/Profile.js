// React Component
import React from "react";
import axios from "axios";
import { Button, Form, message, Tabs } from "antd";
import DefaultLayout from "../Components/DefaultLayout";
import PersonalInfo from "../Components/PersonalInfo";
import Education from "../Components/Education";
import ExperienceProjectsAchievements from "../Components/Achievements";
import SkillsSection from "../Components/Skills";
import Experience from "../Components/Experience";
import Projects from "../Components/Projects";

const { TabPane } = Tabs;
const { useForm } = Form;

function Profile() {
  const [form] = useForm();
  const user = JSON.parse(localStorage.getItem("ResumeUser"));

  const onFinish = async (values) => {
    try {
      const result = await axios.post("https://resumesearchmain.onrender.com/api/user/update", {
        ...values,
        _id: user._id,
      });
      localStorage.setItem("ResumeUser", JSON.stringify(result.data));
      message.success("Profile updated successfully");
    } catch (error) {
      message.error("Profile update failed");
    }
  };

  return (
    <DefaultLayout>
      <div className="updateProfile">
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={user}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Personal Info" key="1">
              <PersonalInfo />
            </TabPane>
            <TabPane tab="Skills" key="2">
              <SkillsSection />
            </TabPane>
            <TabPane tab="Education" key="3">
              <Education />
            </TabPane>
            <TabPane tab="Experience" key="4">
              <Experience />
            </TabPane>
            <TabPane tab="Projects" key="5">
              <Projects />
            </TabPane>
            <TabPane tab="Achievements" key="6">
              <ExperienceProjectsAchievements />
            </TabPane>
          </Tabs>

          <Button className="updateButton" htmlType="submit">
            UPDATE
          </Button>
        </Form>
      </div>
    </DefaultLayout>
  );
}

export default Profile;
