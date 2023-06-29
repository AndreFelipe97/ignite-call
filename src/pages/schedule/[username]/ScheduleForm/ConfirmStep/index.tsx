import { Button, Text, TextArea } from "@ignite-ui/react";
import { ConfirmForm, FormActions, FormHeader } from "./styles";
import { CalendarBlank, Clock } from "phosphor-react";
import { Input } from "@/components/DataEntries/Input";
import { SubmitButton } from "@/components/Buttons/SubmitButton";

export function ConfirmStep() {
  function handleConfirmScheduling() {}

  return (
    <ConfirmForm as="form" onSubmit={handleConfirmScheduling}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          22 de Setembro de 2022
        </Text>
        <Text>
          <Clock />
          18:00h
        </Text>
      </FormHeader>
      <label>
        <Text size="sm">Nome Completo</Text>
        <Input placeholder="seu nome" />
      </label>
      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <Input type="email" placeholder="seu nome" />
      </label>
      <label>
        <Text size="sm">Observações</Text>
        <TextArea />
      </label>

      <FormActions>
        <Button variant="tertiary">Cancelar</Button>
        <SubmitButton isDisabled={false} label="Confirmar" />
      </FormActions>
    </ConfirmForm>
  );
}
