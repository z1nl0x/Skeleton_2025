import { useAuth } from "@/store/auth-context";
import { Card } from "antd";

const Perfil: React.FC = () => {

  const { user } = useAuth();

  return (
    <>
      <Card title='Informações do Perfil' style={{ width: 300 }} headStyle={{ backgroundColor: '#f0f0f0' }}>
        <p>Email: {user?.user_metadata?.['email']}</p>
      </Card>
    </>
  );
};

export default Perfil;