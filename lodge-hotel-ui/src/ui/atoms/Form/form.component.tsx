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
      className={`px-8 py-14 ${type === "regular" ? "w-auto" : "w-2xl"} ${
        type === "regular" ? "bg-white" : "bg-gray-50"
      }  bg-gray-50 border-2 border-solid border-gray-100 rounded-md`}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default Form;
