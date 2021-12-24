import { Icon, Button } from "@chakra-ui/react";
import { Form } from "@unform/web";
import { PasswordInput, TextAreaInput, TextInput } from "@components";
import { FiMail } from "react-icons/fi";
import { useRef } from "react";
import * as Yup from "yup";
import { IUserStepTwo } from "types/UserType";

interface IProps {
  onSubmit: (data: IUserStepTwo) => void;
}

export function StepTwoUser({ onSubmit }: IProps) {
  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      if (formRef?.current) {
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string().email("E-mail deve ser válido").required("E-mail é obrigatório"),
          password: Yup.string().min(6, "Mínimo de 6 caracteres").required("Senha é obrigatória"),
          confirmPassword: Yup.string().oneOf([
            Yup.ref("password"), null
          ], "Senhas devem ser iguais").required("Confirmação de senha é obrigatória"),
          description: Yup.string().required("Descrição é obrigatória")
        });

        await schema.validate(data, {
          abortEarly: false
        });

        await onSubmit(data);
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

  return (
    <Form
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <TextInput
        label="E-mail"
        iconInput={<Icon as={FiMail} fontSize="20" mt="2" />}
        placeholder="seu@email.com.br"
        name="email"
      />

      <PasswordInput
        label="Senha"
        name="password"
        placeholder="sua senha"
      />

      <PasswordInput
        label="Confirmação de senha"
        placeholder="confirmação de sua senha"
        name="confirmPassword"
      />

      <TextAreaInput
        label="Descrição"
        placeholder="Sua descrição"
        name="description"
      />

      <Button
        width="100%"
        type="submit"
        size="lg"
        colorScheme="orange"
        mt="6"
      >
        Salvar
      </Button>
    </Form>
  );
}