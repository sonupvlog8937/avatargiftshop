import { Outlet } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-cream text-ink">
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
