import { Flex, Heading, Icon, useBreakpointValue, Button, Text, Link } from "@chakra-ui/react";
import { BaseFormScreen, TextInput } from "@components";
import { Form } from "@unform/web";
import { TextAreaInput } from "components/TextAreaInput";
import { useRouter } from "next/router";
import { useRef } from "react";
import { FiLock, FiMail, FiUser, FiCalendar, FiPhone, FiFileText } from "react-icons/fi";

import * as Yup from "yup";

export default function Register() {
  const route = useRouter();
  const formRef = useRef(null);
  const isSmallerDevices = useBreakpointValue({
    base: true,
    lg: false,
  });
  
  const buttonSize = isSmallerDevices ? "lg" : "lg";
  
  function handleChangeForm() {
    route.push("/login");
  }
  
  async function handleSubmit(data) {
    try {
      // Remove all previous errors
      if (formRef?.current) {
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string().email("E-mail deve ser válido").required("E-mail é obrigatório"),
          password: Yup.string().min(6, "Mínimo de 6 caracteres").required("Senha é obrigatória"),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        // Validation passed
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
    <BaseFormScreen>
      <Flex
        width="100%"
        height="100vh"
        direction="column"
        align="center"
        padding="8"
      >
        <Flex
          direction="column"
          justify="center"
          width="100%"
          height="100%"
          maxWidth={448}
        >
          <Heading mb="12" fontSize="48" align="center" color="orange.500">
          PeTinder
          </Heading>

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

            <TextAreaInput label="Descrição" name="description" />

            {/* <TextInput
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

        <TextInput
          iconInput={<Icon as={FiLock} fontSize="20" mt="2" />}
          label="Confirmação de senha"
          placeholder="confirmação de sua senha"
          type="password"
          name="password"
        /> */}

            <Button width="100%" type="submit" size={buttonSize} colorScheme="orange" mt="6">
          Avançar
            </Button>
            <Text fontSize={["12", "14",]} pt="2">
          Já tem uma conta?
              <Link ml="4px" fontWeight="bold" onClick={handleChangeForm}>
            Logue-se!
              </Link>
            </Text>
          </Form>
        </Flex>
      </Flex>
    </BaseFormScreen>
  );
}