import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const Projects = () => {
  return (
    <div>
      <Form.List name="projects">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Card
                key={key}
                title="Project"
                style={{ marginBottom: '16px' }}
                  bodyStyle={{ padding: '12px' }}
                  headStyle={{ backgroundColor: '#f0f2f5', borderBottom: '1px solid #d9d9d9' }}
                extra={
                  <CloseOutlined
                    style={{ fontSize: 25, color: "tomato" }}
                    onClick={() => remove(name)}
                  />
                }
              >
                <Form.Item
                  {...restField}
                  name={[name, "title"]}
                  label="Title"
                  rules={[
                    { required: true, message: "Missing title" },
                  ]}
                >
                  <Input placeholder="Title" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, "link"]}
                  label="Link"
                  rules={[
                    { required: true, message: "Missing project link" },
                  ]}
                >
                  <Input placeholder="Project Link" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, "description"]}
                  label="Description"
                  rules={[
                    { required: true, message: "Missing description" },
                  ]}
                >
                  <TextArea placeholder="Description" />
                </Form.Item>

              </Card>
            ))}

            <Form.Item>
              <Button
                type="primary"
                onClick={() => add()}
                style={{width:'200px'}}
                block
                icon={<PlusOutlined />}
              >
                Add Project
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default Projects;
