import React, { type FC, type ReactElement, type ReactNode } from "react";

type FormRowVerticalProps = {
  label?: string;
  error?: string;
  children: ReactElement<HTMLInputElement> | ReactNode;
};

const FormRowVertical: FC<FormRowVerticalProps> = ({
  label,
  error,
  children,
}) => {
  const formContainerStyles = "flex flex-col gap-0.5 px-1.5 py-3";

  if (label === undefined)
    return <div className={formContainerStyles}>{children}</div>;

  return (
    <div className={formContainerStyles}>
      {label && (
        <label
          className="pb-2"
          htmlFor={(children as ReactElement<HTMLInputElement>).props.id}
        >
          {label}
        </label>
      )}
      {children}
      {/* TODO: ADD COMPONENT FOR THIS */}
      {error && <p>{error}</p>}
    </div>
  );
};

export default FormRowVertical;
