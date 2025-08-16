import { type FC, type ReactNode } from "react";

interface ModalOverlayProps {
  children: ReactNode;
}

const ModalOverlay: FC<ModalOverlayProps> = ({ children }) => (
  <div className="fixed top-0 left-0 w-full h-screen bg-black/30 backdrop-filter backdrop-blur-sm z-50 transition-all">
    {children}
  </div>
);

export default ModalOverlay;
