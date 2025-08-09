import React, { type FC, type FormEvent, type ReactNode } from "react";

type FormProps = {
  children: ReactNode;
  onSubmit: (e: FormEvent) => void | (() => void);
};

const Form: FC<FormProps> = ({ onSubmit, children }) => {
  return (
    <form
      className="px-8 py-14 w-3xl bg-gray-50 border-2 border-solid border-gray-100 rounded-md"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default Form;
