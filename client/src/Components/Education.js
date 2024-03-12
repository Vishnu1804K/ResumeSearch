import React from "react";
import { Form, Input, Button, Row, Col, Card } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";

function Education() {
  return (
    <div>
      <Form.List name="education">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Col span={24} key={key}>
                <Card
                  title="Education"
                  style={{ marginBottom: '16px' }}
                  bodyStyle={{ padding: '12px' }}
                  headStyle={{ backgroundColor: '#f0f2f5', borderBottom: '1px solid #d9d9d9' }}
                >
                  <Row gutter={[16, 16]}>
                    <Col span={6}>
                      <Form.Item
                        {...restField}
                        name={[name, "qualification"]}
                        label="Qualification"
                        rules={[
                          { required: true, message: "Missing qualification" },
                        ]}
                      >
                        <Input placeholder="Qualifications" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        {...restField}
                        name={[name, "yearRange"]}
                        label="Year Range"
                        rules={[
                          { required: true, message: "Missing year range" },
                        ]}
                      >
                        <Input placeholder="Year Range" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        {...restField}
                        name={[name, "percentage"]}
                        label="Percentage"
                        rules={[
                          { required: true, message: "Missing percentage" },
                        ]}
                      >
                        <Input placeholder="Percentage" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        {...restField}
                        name={[name, "institution"]}
                        label="Institution"
                        rules={[
                          { required: true, message: "Missing institution name" },
                        ]}
                      >
                        <Input placeholder="Institution" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <CloseOutlined
                    style={{
                      fontSize: 20,
                      color: "tomato",
                      position: "absolute",
                      top: 18,
                      right: 20,
                      cursor: "pointer",
                    }}
                    onClick={() => remove(name)}
                  />
                </Card>
              </Col>
            ))}

            <Form.Item>
              <Button
                type="primary"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
                style={{ width: '200px' }}
              >
                Add Education
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
}

export default Education;
