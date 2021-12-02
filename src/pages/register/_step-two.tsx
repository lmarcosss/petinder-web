import { Icon, Button } from "@chakra-ui/react"; 
import { Form } from "@unform/web";
import { TextAreaInput, TextInput } from "@components";
import { FiLock, FiMail, FiArrowLeft } from "react-icons/fi";
import { useRef } from "react";
import * as Yup from "yup";

export default function StepTwo({ onChangeForm, }) {
  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      if (formRef?.current) {
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required("Nome é obrigatório"),
          description: Yup.string().required("Descrição é obrigatória"),
          phone: Yup.string().required("Celular é obrigatório"),
          birthDay: Yup.string().required("Data de nascimento é obrigatória"),
        });
    
        await schema.validate(data, {
          abortEarly: false,
        });
    
        console.log(data);
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
    <>
      <Icon
        position="absolute"
        fontSize="25"
        top="150"
        aria-label="Voltar"
        as={FiArrowLeft}
        cursor="pointer"
        onClick={onChangeForm}
      />
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

        <TextInput
          iconInput={<Icon as={FiLock} fontSize="20" mt="2" />}
          label="Senha"
          placeholder="sua senha"
          type="password"
          name="password"
        />

        <TextInput
          iconInput={<Icon as={FiLock} fontSize="20" mt="2" />}
          label="Confirmação de senha"
          placeholder="confirmação de sua senha"
          type="password"
          name="password"
        />

        <TextAreaInput label="Descrição" placeholder="Sua descrição" name="description" />


        <Button width="100%" type="submit" size="lg" colorScheme="orange" mt="6">
          Salvar
        </Button>
      </Form>
    </>
  );
}