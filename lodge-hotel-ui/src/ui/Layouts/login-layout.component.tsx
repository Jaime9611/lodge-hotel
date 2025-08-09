import type { FC, ReactNode } from "react";

type LoginLayoutProps = {
  children: ReactNode;
};

const LoginLayout: FC<LoginLayoutProps> = ({ children }) => {
  return (
    <main className="h-screen grid col-span-1 w-full content-center justify-center gap-12 bg-grey-50">
      {children}
    </main>
  );
};

export default LoginLayout;
