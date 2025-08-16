import { Button, Heading } from "@ui/atoms";
import { type FC } from "react";

interface ConfirmDeleteProps {
  resourceName: string;
  onConfirm: () => void;
  disabled: boolean;
  onCloseModal?: () => void;
}

const ConfirmDelete: FC<ConfirmDeleteProps> = ({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}) => {
  return (
    <div className="w-xl flex flex-col gap-5">
      <Heading as="h3">Delete {resourceName}</Heading>
      <p className="text-gray-500 mb-5">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex justify-end gap-5">
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
