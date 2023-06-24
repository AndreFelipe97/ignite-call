import { MouseEventHandler, ReactNode } from "react";
import { Button } from "@ignite-ui/react";

interface SubmitButtonProps {
  isDisabled: boolean;
  label: string;
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function SubmitButton({
  isDisabled,
  label,
  icon,
  onClick,
}: SubmitButtonProps) {
  return (
    <Button onClick={onClick} type="submit" disabled={isDisabled}>
      {label} {icon}
    </Button>
  );
}
