import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import AuthLayout from "../components/AuthLayout";
import { signUpWithKeyword } from "../services/auth";

type RegisterValues = {
  email: string;
  password: string;
  username: string;
  keyword: string;
};

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: RegisterValues) => {
    setLoading(true);
    const { email, password, username, keyword } = values;

    const { error } = await signUpWithKeyword(email, password, username, keyword);

    setLoading(false);

    if (error) {
      message.error(error.message);
      return;
    } else {
      message.success("Registro efetuado! Faça login para continuar.");
      navigate("/login");
    }
  };

  return (
    <AuthLayout>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Username" name="username" rules={[{ required: true, min: 3 }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Senha" name="password" rules={[{ required: true, min: 6 }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item label="Palavra-chave" name="keyword" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Registrar
        </Button>
        <Button type="link" onClick={() => navigate("/login")} block>
          Já tenho conta
        </Button>
      </Form>
    </AuthLayout>
  );
}
