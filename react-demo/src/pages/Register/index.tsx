import type { FormProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import cover from './cover.svg'
import './index.scss';
import { useState } from 'react';
import axios from 'axios';

type FieldType = {
  username?: string;
  password?: string;
  confirmPassword?: string;
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const onFinish = async () => {
    try {
        const response = await axios.post('http://localhost:4000/register', { username, password });
        alert(response.data);
        navigate('/login');
    } catch (error:any) {
        alert(error.response.data);
    }
  };
  
  return(
  <div style={{display:'flex',width:'100%',height:'100%'}}>
    <img src={cover} alt='logo' style={{width:'50%',height:'100%'}} />
    <Form 
    name="register-form"
    labelCol={{ span: 4 }}
    wrapperCol={{ span: 16 }}
    className='formContainer'
    initialValues={{ remember: true }}
    onFinish={onFinish}
    autoComplete="off"
    >
      <h2 className='title'>注 册</h2>
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
        label="确认密码"
        name="confirmPassword"
        dependencies={['password']}
        rules={[
          { required: true, message: '请输入确认密码!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次密码不一致!'));
            },
          }),
        ]}
      >
        <Input.Password value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  </div>
  )
};
export default Register;
