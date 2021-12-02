import { Icon, Button, Text, Link } from "@chakra-ui/react"; 
import { Form } from "@unform/web";
import { TextInput } from "@components";
import { useRef } from "react";
import { FiCalendar, FiPhone, FiUser } from "react-icons/fi";
import * as Yup from "yup";
import { useRouter } from "next/router";

export default function StepOne({ onChangeForm, onChangeFormProperties, }) {
  const route = useRouter();
  const formRef = useRef(null);
  
  function handleChangeForm() {
    route.push("/login");
  }

  async function handleSubmit(data) {
    try {
      if (formRef?.current) {
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required("Nome é obrigatório"),
          cpf: Yup.string().required("CPF é obrigatório"),
          phone: Yup.string().required("Celular é obrigatório"),
          birthDay: Yup.string().required("Data de nascimento é obrigatória"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        onChangeForm();
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

  return (
    <Form
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <TextInput
        label="Nome"
        iconInput={<Icon as={FiUser} fontSize="20" mt="2" />}
        placeholder="Seu nome"
        name="name"
      />

      <TextInput
        label="CPF"
        iconInput={<Icon as={FiUser} fontSize="20" mt="2" />}
        placeholder="000.000.000-00"
        name="cpf"
      />

      <TextInput
        label="Celular"
        iconInput={<Icon as={FiPhone} fontSize="20" mt="2" />}
        placeholder="(99) 9 9999-9999"
        name="phone"
      />

      <TextInput
        label="Data de nascimento"
        iconInput={<Icon as={FiCalendar} fontSize="20" mt="2" />}
        placeholder="dd/mm/aaaa"
        name="birthDay"
      />

      <Button width="100%" type="submit" size="lg" colorScheme="orange" mt="6">
          Avançar
      </Button>
      <Text fontSize={["12", "14",]} pt="2">
          Já tem uma conta?
        <Link ml="4px" fontWeight="bold" onClick={handleChangeForm}>
            Logue-se!
        </Link>
      </Text>
    </Form>
  );
}