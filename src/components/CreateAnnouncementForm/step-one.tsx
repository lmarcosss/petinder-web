import { Button, Icon } from "@chakra-ui/react";
import { TextAreaInput, TextInput } from "@components";
import { Form } from "@unform/web";
import { useRef } from "react";
import { FiType } from "react-icons/fi";
import * as Yup from "yup";

interface IProps {
    goToStepTwo(): void;
    onChangeFormProperties(data: unknown): void;
    formProperties: unknown;
  }

export function StepOneCreateAnnouncement({
  goToStepTwo,
  onChangeFormProperties,
  formProperties
}: IProps) {
  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      if (formRef?.current) {
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          title: Yup.string().required("Título é obrigatório"),
          description: Yup.string().required("Descrição é obrigatória")
        });

        await schema.validate(data, {
          abortEarly: false
        });

        goToStepTwo();
        onChangeFormProperties(data);
      }
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  const initialData = formProperties ? {
    title: formProperties?.title,
    description: formProperties?.description
  } : null;

  return (
    <Form
      ref={formRef}
      onSubmit={handleSubmit}
      initialData={initialData}
    >
      <TextInput
        label="Título"
        iconInput={<Icon as={FiType} fontSize="20" mt="2" />}
        placeholder="Seu título"
        name="title"
      />

      <TextAreaInput
        label="Descrição"
        placeholder="Sua descrição"
        name="description"
      />
      <Button width="100%" type="submit" size="lg" colorScheme="orange" mt="6">
          Avançar
      </Button>
    </Form>
  );
}