import { useAuth } from '@/store/auth-context';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useEffect } from 'react';
import { Button, Layout, theme } from 'antd';

interface HeaderProps {
  pageTitle: string;
  setPageTitle: (title: string) => void;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}


const HeaderGeral: React.FC<HeaderProps> = ({ pageTitle, setPageTitle, collapsed, setCollapsed  }) => {

	const { user } = useAuth();
	const { Header } = Layout;
	const {
    token: { colorBgContainer },
  } = theme.useToken();

	useEffect(() => {
    if (user) {
      const username = user.user_metadata?.['username'] || user.email;
      setPageTitle(`Perfil: ${username}`);
    }
  }, [user]);

	return(
		<>
			<Header style={{ padding: 0, background: colorBgContainer, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '19px',
            }}
          />
          <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{pageTitle}</span>
        </Header>
		</>
	);
}

export default HeaderGeral;