import { Layout, Typography } from 'antd';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <div style={{ width: 360 }}>
        <Typography.Title level={3} style={{ textAlign: 'center' }}>
          DELIVERY-APP
        </Typography.Title>
        {children}
      </div>
    </Layout>
  );
}