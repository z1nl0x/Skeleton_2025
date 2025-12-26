import { useAuth } from '@/store/auth-context';
import {
	LogoutOutlined,
	ShoppingOutlined,
	UserOutlined,
  LoadingOutlined,
  DeploymentUnitOutlined,
  ExceptionOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMotorcycle } from '@fortawesome/free-solid-svg-icons';


interface MenuProps {
  setPageTitle: (title: string) => void;
  collapsed: boolean;
	setActiveKey: (title: string) => void;
}

const MenuGeral: React.FC<MenuProps> = ({ setPageTitle, collapsed, setActiveKey  }) => {

	const { Sider } = Layout;
	const { signOut } = useAuth();

	const handleMenuClick = (e: { key: string }) => {
		setActiveKey(e.key);
		switch (e.key) {
			case '1':
				setPageTitle('Perfil');
				break;
			case '2':
				setPageTitle('Seus Pedidos');
				break;
			case '3':
				setPageTitle('Loja');
				break;
      case '4':
				setPageTitle('Informações');
				break;
			case '5':
				<div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
      >
        <LoadingOutlined style={{ fontSize: 48 }} />
      </div>;
				break;
			default:
				setPageTitle('');
		}
	};

	return(
		<>
			<Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={handleMenuClick}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Perfil',
            },
            {
              key: '2',
              icon: <ShoppingCartOutlined />,
              label: 'Carrinho',
            },
            {
              key: '3',
              icon: <ShoppingOutlined />,
              label: 'Loja',
            },
            {
              key: '4',
              icon: <ExceptionOutlined />,
              label: 'Informações',
            },
            {
              key: '5',
              icon: <LogoutOutlined />,
              label: 'Sair',
              onClick: () => signOut()
            },
          ]}
        />
      </Sider>
		</>
	);
}

export default MenuGeral