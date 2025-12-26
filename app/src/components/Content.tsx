import { Layout, theme } from 'antd';

interface ContentGeralProps {
  children?: React.ReactNode;
}


const ContentGeral: React.FC<ContentGeralProps> = ({ children }) => {
	const { Content } = Layout;
	  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

	return(
		<>
			<Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
		</>
	)
}

export default ContentGeral