import { Button, Text, TextArea } from "@ignite-ui/react";
import { ConfirmForm, FormActions, FormError, FormHeader } from "./styles";
import { CalendarBlank, Clock } from "phosphor-react";
import { Input } from "@/components/DataEntries/Input";
import { SubmitButton } from "@/components/Buttons/SubmitButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { api } from "@/lib/axios";
import { useRouter } from "next/router";

const confirmFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome precisa no mínimo de 3 caracteres" }),
  email: z.string().email({ message: "Digite um e-mail valido" }),
  observations: z.string().nullable(),
});

type ConfirmFormData = z.infer<typeof confirmFormSchema>;

interface ConfirmStepProps {
  schedulingDate: Date;
  onCancelConfirmation: () => void;
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  });

  const router = useRouter();
  const username = String(router.query.username);

  async function handleConfirmScheduling(data: ConfirmFormData) {
    console.log("entrou aqui");

    const { name, email, observations } = data;

    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      observations,
      date: schedulingDate,
    });

    await router.push(`/schedule/${username}`);
  }

  const describeDate = dayjs(schedulingDate).format("DD[ de ]MMMM[ de ]YYYY");
  const describeTime = dayjs(schedulingDate).format("HH:mm[h]");

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describeDate}
        </Text>
        <Text>
          <Clock />
          {describeTime}
        </Text>
      </FormHeader>
      <label>
        <Text size="sm">Nome Completo</Text>
        <Input placeholder="seu nome" name="name" register={register} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>
      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <Input
          type="email"
          placeholder="seu nome"
          name="email"
          register={register}
        />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>
      <label>
        <Text size="sm" {...register("observations")}>
          Observações
        </Text>
        <TextArea />
      </label>

      <FormActions>
        <Button variant="tertiary" onClick={onCancelConfirmation}>
          Cancelar
        </Button>
        <SubmitButton isDisabled={isSubmitting} label="Confirmar" />
      </FormActions>
    </ConfirmForm>
  );
}
