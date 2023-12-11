import { useLocation } from 'react-router-dom';
import Navigation from '../Layout/Navigation';

function Layout({ children }) {
  const location = useLocation();
  const padding = location.pathname === '/home' ? '0' : '2rem';

  return (
    <>
      <Navigation />
      <main style={{ width: '100%', margin: '0 auto', padding: padding }}>
        {children}
      </main>
    </>
  );
}
export default Layout;
