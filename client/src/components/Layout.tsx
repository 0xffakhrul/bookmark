import { FC } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <body className="max-w-7xl mx-auto">{children}</body>
    </div>
  );
};

export default Layout;
