import { TextInput } from "@ignite-ui/react";

interface InputProps {
  size?: "sm" | "md";
  prefix?: string;
  placeholder?: string;
  type?: string;
  name: string;
  register: any;
}

export function Input({
  size = "sm",
  prefix = "",
  placeholder = "",
  type = "text",
  name,
  register,
  ...res
}: InputProps) {
  return (
    <TextInput
      size={size}
      prefix={prefix}
      placeholder={placeholder}
      {...(register && register(name))}
      type={type}
    />
  );
}
