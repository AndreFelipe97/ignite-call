import { TextInput } from "@ignite-ui/react";

interface InputProps {
  name: string;
  isDisabled: boolean;
  register: any;
}

export function InputTime({ name, isDisabled, register }: InputProps) {
  return (
    <TextInput
      size="sm"
      type="time"
      step={60}
      disabled={isDisabled}
      data-testid={name}
      {...(register && register(name))}
    />
  );
}
