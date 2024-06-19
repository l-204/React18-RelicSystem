import React, { Component, ComponentProps } from 'react';
import { Form, Input, Select, Button, message } from 'antd';

const { Option } = Select;

const FeedbackForm = ({onSubmit}:any) => {
  const onFinish = (values:any) => {
    onSubmit()
  };

  return (
    <Form name="feedbackForm" onFinish={onFinish} style={{width:'600px',margin:'auto'}}
    labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>

      <Form.Item
        name="artifact"
        label="文物名称"
        rules={[
          {
            required: true,
            message: '请选择文物',
          },
        ]}
      >
        <Select>
          <Option value="artifact1">文物1</Option>
          <Option value="artifact2">文物2</Option>
          <Option value="artifact3">文物3</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="feedback"
        label="反馈内容"
        rules={[
          {
            required: true,
            message: '请输入反馈内容',
          },
        ]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FeedbackForm;
