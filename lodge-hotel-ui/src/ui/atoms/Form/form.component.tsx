import {
  type BaseSyntheticEvent,
  type FC,
  type FormEvent,
  type ReactNode,
} from "react";

type FormProps = {
  children: ReactNode;
  type?: "modal" | "regular";
  onSubmit:
    | ((e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>)
    | ((e: FormEvent<HTMLFormElement>) => void);
};

const Form: FC<FormProps> = ({ onSubmit, children }) => {
  return (
    <form
      className="px-8 py-14 w-2xl bg-gray-50 border-2 border-solid border-gray-100 rounded-md"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default Form;
