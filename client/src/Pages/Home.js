import React from "react";
import DefaultLayout from "../Components/DefaultLayout";
import template1Img from "../Styles/Images/template1.png";
import template2Img from "../Styles/Images/template2.png";
import { Button, Col, Row, Card } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../Styles/Stylesheets/templates.css";

function Home() {
  const navigate = useNavigate();
  const templates = [
    {
      image: template1Img,
    },
    {
      image: template2Img,
    },
  ];

  return (
    <DefaultLayout>
      <Row gutter={[16, 16]} justify="space-around">
        {templates.map((template, index) => (
          <Col key={index} span={8}>
            <Card
              className="custom-card"
            >
              <div className="card-content">
              <img alt="resumeTemplate" src={template.image} style={{ height: "400px", border: "2px solid black" }} />
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  onClick={() => navigate(`/templates/${index + 1}`)}
                >
                  TRY
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </DefaultLayout>
  );
}

export default Home;
