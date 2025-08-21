import {
  cloneElement,
  createContext,
  type FC,
  type ReactElement,
  type ReactNode,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { HiXMark } from "react-icons/hi2";

import ModalOverlay from "./modal-overlay.component";
import ModalButton from "./modal-button.component";
import { useOutsideClick } from "@hooks";

// ---------- CONTEXT -----
interface ModalState {
  open: React.Dispatch<React.SetStateAction<string>>;
  close: () => void;
  openName: string;
}

const ModalContext = createContext({} as ModalState);

// ---------- CHILDREN COMPONENTS -----
interface WindowProps {
  children: ReactElement;
  name: string;
}

const Window: FC<WindowProps> = ({ children, name }) => {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick<HTMLDivElement>(close);

  // This if needs to be after the useEffect hook
  if (name !== openName) return null;

  // Creating this portal ensures that the modal
  //  will not be affected to specific CSS properties defined in the Parent
  return createPortal(
    <ModalOverlay>
      <div
        className="fixed top-1/2 left-1/2 -translate-1/2 bg-white rounded-lg shadow-lg py-12 px-16 transition-all"
        ref={ref}
      >
        <ModalButton onClick={close}>
          <HiXMark />
        </ModalButton>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </ModalOverlay>,
    document.body
  );
};

interface OpenProps {
  children: ReactElement;
  opens: string;
}

const Open: FC<OpenProps> = ({ children, opens: opensWindowName }) => {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  });
};

// ---------- PARENT COMPONENT -----
interface ModalProps {
  children: ReactNode;
}

// This is the TS way of declaring children FC
interface ModalComponent extends FC<ModalProps> {
  Open: FC<OpenProps>;
  Window: FC<WindowProps>;
}

const Modal: ModalComponent = ({ children }) => {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
