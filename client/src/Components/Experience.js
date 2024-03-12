import React from 'react';
import { Form, Input, Button, Card, Row, Col } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

const Experience = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Form.List name="experience">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Card
                key={key}
                title="Experience"
                style={{ marginBottom: '16px' }}
                bodyStyle={{ padding: '12px' }}
                headStyle={{ backgroundColor: '#f0f2f5', borderBottom: '1px solid #d9d9d9' }}
                extra={
                  <CloseOutlined
                    style={{ fontSize: 25, color: 'tomato' }}
                    onClick={() => remove(name)}
                  />
                }
              >
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'company']}
                      label="Company"
                      rules={[
                        { required: true, message: 'Please input company name' },
                      ]}
                    >
                      <Input placeholder="Company" />
                    </Form.Item>
                    
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'place']}
                      label="Place"
                      rules={[
                        { required: true, message: 'Please input place name' },
                      ]}
                    >
                      <Input placeholder="Place" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                  <Form.Item
                  {...restField}
                  name={[name, 'yearRange']}
                  label="Year Range"
                  rules={[
                    { required: true, message: 'Please input year range' },
                  ]}
                >
                  <Input placeholder="Year Range" />
                </Form.Item>
                </Col>
                </Row>

                <Form.Item
                  {...restField}
                  name={[name, 'position']}
                  label="Position"
                  rules={[
                    { required: true, message: 'Please input position' },
                  ]}
                >
                  <Input placeholder="Position" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'description']}
                  label="Description"
                  rules={[
                    { required: true, message: 'Please input description' },
                  ]}
                >
                  <Input.TextArea placeholder="Description" />
                </Form.Item>

              </Card>
            ))}

            <Form.Item>
              <Button
                type="primary"
                onClick={() => add()}
                block
                style={{ width: '200px', marginTop: '20px' }}
                icon={<PlusOutlined />}
              >
                Add Experience
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default Experience;
