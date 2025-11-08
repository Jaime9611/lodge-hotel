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

const Form: FC<FormProps> = ({ onSubmit, children, type }) => {
  return (
    <form
      className={` ${
        type === "regular" ? "w-auto px-8 py-6" : "w-2xl px-8 py-14"
      } ${
        type === "regular" ? "bg-white" : "bg-gray-50"
      }  bg-gray-50 border-2 border-solid border-gray-100 rounded-md`}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default Form;
