import React from "react";
import { Form, Input, Button, Card } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
const { TextArea } = Input;

function Achievements() {
  return (
    <div>
      <Form.List name="achievements">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <div key={key} style={{ position: 'relative' }}>
                <Form.Item
                  {...restField}
                  name={[name, "achievement"]}
                  rules={[
                    { required: true, message: "Missing Achievement" },
                  ]}
                >
                  <TextArea
                    placeholder={`Achievement ${index + 1}`}
                    style={{ height: '20px' }}
                  />
                </Form.Item>
                <CloseOutlined
                  style={{
                    fontSize: 15,
                    color: "tomato",
                    position: "absolute",
                    right: 10,
                    top: 10,
                  }}
                  onClick={() => remove(name)}
                />
              </div>
            ))}

            <Form.Item>
              <Button
                type="primary"
                onClick={() => add()}
                style={{ width: '200px' }}
                block
                icon={<PlusOutlined />}
              >
                Add Achievement
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
}

export default Achievements;
