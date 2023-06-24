import { Button, Text, TextInput } from "@ignite-ui/react";
import { Form, FormAnnotation } from "./styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";
import { SubmitButton } from "@/components/Buttons/SubmitButton";
import { Input } from "@/components/DataEntries/Input";

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "O usuário precisar ter três letras." })
    .regex(/^([a-z\\-]+)$/i, {
      message: "O usuário pode conter apenas letras e hifens.",
    })
    .transform((username) => username.toLowerCase()),
});

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  });

  const router = useRouter();

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    console.log(data);
    const { username } = data;

    await router.push(`/register?username=${username}`);
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <Input
          size="sm"
          prefix="ignite.com/"
          placeholder="seu-usário"
          name="username"
          register={register}
        />
        <FormAnnotation>
          <Text size="sm">
            {errors.username
              ? errors.username.message
              : "Digite o nome do usuário desejado"}
          </Text>
        </FormAnnotation>
        <SubmitButton
          label="Reservar usuário"
          isDisabled={isSubmitting}
          icon={<ArrowRight />}
        />
      </Form>
    </>
  );
}
