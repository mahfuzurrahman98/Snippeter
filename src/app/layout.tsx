import './globals.css';

export const metadata = {
  title: 'Snippeter',
  description: 'view all snippets',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
