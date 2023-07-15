import './globals.css';

export const metadata = {
  title: 'Snippeter',
  description: 'view snippets',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://snippeter.vercel.app/',
    title: 'Snippeter',
    description: 'view snippets',
    images: [
      {
        url: '/og.png',
        width: 200,
        height: 200,
      },
    ],
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
