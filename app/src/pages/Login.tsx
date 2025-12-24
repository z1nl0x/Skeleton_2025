import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router';
import AuthLayout from '../components/AuthLayout';
import { signIn } from '../services/auth';
import { useState } from 'react';

type LoginValues = {
  email: string;
  password: string;
};

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async ({ email, password }: LoginValues) => {
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      message.error(error.message);
      return;
    }

    navigate('/home', { replace: true });
  };

  return (
    <AuthLayout>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Senha" name="password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Entrar
        </Button>
        <Button type="link" onClick={() => navigate('/register')} block>
          Criar conta
        </Button>
      </Form>
    </AuthLayout>
  );
}