import React, { useContext, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useMutation } from 'react-query';
import { useLogin } from '../hooks/useLogin';
import { toast } from 'react-toastify';
import { userCredentials } from '../types/userCredentials';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/images/undraw_Hello_re_3evm.png';
import { UserContext } from '../context/userContext';
import useGetUser from '../hooks/useGetUser';
import queryClient from '../util/queryClients';

const LoginForm = () => {
  const [form] = Form.useForm();
  const { user, setUser } = useContext(UserContext)!;

  const loginMutation = useLogin();
  const navigate = useNavigate();

  const onFinish = async (values: userCredentials) => {
    try {
      await loginMutation.mutateAsync(values, {
        onSuccess: async (data) => {
          const name = '';
          const { token, refreshToken } = data.data;
          setUser({ token, refreshToken, name });
          await queryClient.invalidateQueries('userData');
          toast.success('Login successful!');
          navigate('/');
          form.resetFields();
        },
        onError: (error) => {
          toast.error('Login failed!');
          console.error(error);
        },
      });
    } catch (error) {
      toast.error('Login failed!');
      console.error(error);
    }
  };
  

  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className='login-box'>
        <Form form={form} onFinish={onFinish} className='login-form'>
          <div className='login-text'>Welcome back!</div>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loginMutation.isLoading} style={{ backgroundColor: '#1F51FF', marginRight: 'auto' }}>
              Log In
            </Button>
          </Form.Item>
        </Form>
        <img src={loginImage} alt="Login" className='login-image' />
      </div>
    </div>
  );
};

export default LoginForm;
