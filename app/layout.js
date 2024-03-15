import Navigation from '@/navbar/Navigation';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        {children}
        <Navigation />
      </body>
    </html>
  );
}
