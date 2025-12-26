import React, { useState, type JSX } from 'react';
import { Layout } from 'antd';
import HeaderGeral from '@/components/Header';
import MenuGeral from '@/components/Menu';
import ContentGeral from '@/components/Content';
import Perfil from './Perfil';

const SharedPage: React.FC = () => {
  const [pageTitle, setPageTitle] = useState('');
  const [collapsed, setCollapsed] = useState(false);
	const [activeKey, setActiveKey] = useState('1');

	const renderContent = () => {
    switch (activeKey) {
      case '1':
        return <Perfil />;
      default:
        return <span>Selecione uma opção no menu</span>;
    }
  };


  return (
    <Layout>
      <MenuGeral collapsed={collapsed} setPageTitle={setPageTitle} setActiveKey={setActiveKey} />
      <Layout style={{ minHeight: '100vh' }}>,
        <HeaderGeral pageTitle={pageTitle} setPageTitle={setPageTitle} collapsed={collapsed} setCollapsed={setCollapsed} />
        <ContentGeral>{renderContent()}</ContentGeral>
      </Layout>
    </Layout>
  );
};

export default SharedPage;