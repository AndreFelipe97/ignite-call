import { Heading, MultiStep, Text } from "@ignite-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "phosphor-react";
import { Container, Form, FormError, Header } from "./styles";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";
import { SubmitButton } from "@/components/Buttons/SubmitButton";
import { Input } from "@/components/DataEntries/Input";

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "O usuário precisar ter três letras." })
    .regex(/^([a-z\\-]+)$/i, {
      message: "O usuário pode conter apenas letras e hifens.",
    })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: "O nome precisar ter três letras." })
    .regex(/^([a-z]+)$/i, {
      message: "O nome pode conter apenas letras.",
    }),
});

type registerFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<registerFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const router = useRouter();

  useEffect(() => {
    if (router.query.username) {
      setValue("username", String(router.query.username));
    }
  }, [router.query?.username, setValue]);

  async function handleRegister(data: registerFormData) {
    try {
      await api.post("/users", {
        name: data.name,
        username: data.username,
      });

      await router.push("/register/connect-calendar");
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message);
        return;
      }
      console.error(err);
    }
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao ignite call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois
        </Text>
        <MultiStep size={4} currentStep={1} />
      </Header>
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Nome de usuário</Text>
          <Input
            size="sm"
            prefix="ignite.com/"
            placeholder="seu-usário"
            name="username"
            register={register}
          />
          {errors.username && (
            <FormError size="sm">{errors.username.message}</FormError>
          )}
        </label>
        <label>
          <Text size="sm">Nome completo</Text>
          <Input
            size="sm"
            placeholder="Seu nome"
            name="name"
            register={register}
          />
          {errors.name && (
            <FormError size="sm">{errors.name.message}</FormError>
          )}
        </label>
        <SubmitButton
          label="Próximo passo"
          isDisabled={isSubmitting}
          icon={<ArrowRight />}
        />
      </Form>
    </Container>
  );
}
