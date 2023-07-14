import './globals.css';

export const metadata = {
  title: 'Snippeter',
  description: 'view all snippets',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://snippeter.vercel.app/',
    title: 'Snippeter',
    description: 'view snippets',
    image: '/og.png',
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
