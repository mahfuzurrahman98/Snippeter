export const metadata = {
  title: 'Snippet',
  description: 'view a snippet',
};

const SnippetLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default SnippetLayout;
