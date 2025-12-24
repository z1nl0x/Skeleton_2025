import React, { useEffect, useState } from 'react';
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

const { Header, Sider, Content } = Layout;

import { useAuth } from '../store/auth-context';

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { signOut, user } = useAuth();

  const handleMenuClick = (e: { key: string }) => {
    switch (e.key) {
      case '1':
        setPageTitle(`Perfil: ${user?.user_metadata?.['username'] || user?.email}`);
        break;
      case '2':
        setPageTitle('Nav 2');
        break;
      case '3':
        setPageTitle('Nav 3');
        break;
      case '4':
        setPageTitle('Saindo...');
        break;
      default:
        setPageTitle('Titulo da Pagina');
    }
  };

  useEffect(() => {
    if (user) {
      const username = user.user_metadata?.['username'] || user.email;
      setPageTitle(`Perfil: ${username}`);
    }
  }, [user]);


  return (
    <Layout>
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
              label: `Usuário: ${user?.user_metadata?.['username'] || user?.email}`,
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
            {
              key: '4',
              icon: <LogoutOutlined />,
              label: 'Sair',
              onClick: () => signOut()
            },
          ]}
        />
      </Sider>
      <Layout style={{ minHeight: '100vh' }}>
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
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;