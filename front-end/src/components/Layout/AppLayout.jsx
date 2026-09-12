import { AppShell } from '@mantine/core';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const AppLayout = ({ children }) => {
  return (
    <AppShell header={{ height: 64 }} padding="md">
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main display="flex" style={{ flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</div>
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
