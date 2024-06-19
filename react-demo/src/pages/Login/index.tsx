import React, { useState,  } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import cover from './cover.svg'
import './index.scss';
import axios from 'axios';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onFinish = async (e:any) => {
    try {
        const response = await axios.post('http://localhost:4000/login', { username, password });
        alert(response.data);
        navigate('/home');
    } catch (error:any) {
        alert(error.response.data);
    }
  };


  return(
  <div style={{display:'flex',width:'100%',height:'100%'}}>
    <img src={cover} alt='logo' style={{width:'50%',height:'100%'}} />
    <Form
      name="login-form"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      className='formContainer'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <h2 className='title'>登 录</h2>
      <Form.Item<FieldType>
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入用户名!' }]}
      >
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Item>

      <Form.Item<FieldType>
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Item>

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 4, span: 16 }}
      >
        <Checkbox>记住密码</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  </div>
  )
};

export default Login;