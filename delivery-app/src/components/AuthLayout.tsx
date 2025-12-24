import { Layout, Typography } from 'antd';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', backgroundColor: '#bac4bbff' }}>
      <div 
				style={{ 
					width: 360, 
					border: '1px solid #0000', 
					borderRadius: 8, 
					padding: 24, 
					backgroundColor: '#ffff', 
					boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
				>
        <Typography.Title level={3} style={{ textAlign: 'center' }}>
          APP
        </Typography.Title>
        {children}
      </div>
    </Layout>
  );
}