import { Button, Flex, Heading, Link, Text, useBreakpointValue, Icon } from "@chakra-ui/react";
import { BaseFormScreen, TextInput } from "@components";
import { useRef } from "react";
import { Form } from "@unform/web";
import { FiLock, FiMail } from "react-icons/fi";
import * as Yup from "yup";
import { useRouter } from "next/router";


export default function Login() {
  const route = useRouter();
  const formRef = useRef(null);
  const isSmallerDevices = useBreakpointValue({
    base: true,
    lg: false,
  });

  const buttonSize = isSmallerDevices ? "lg" : "lg";

  function handleChangeForm() {
    route.push("/register");
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
    <BaseFormScreen image="register.jfif">
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
          <Heading mb="12" fontSize="48" align="center" color="orange.500" >
            PeTinder
          </Heading>
          <Form
            onSubmit={handleSubmit}
            ref={formRef}
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

            <Button width="100%" type="submit" size={buttonSize} colorScheme="orange" mt="6">
            Entrar
            </Button>
            <Text fontSize={["12", "14",]} pt="2">
            Ainda não tem uma conta?
              <Link ml="4px" fontWeight="bold" onClick={handleChangeForm}>
              Cadastre-se!
              </Link>
            </Text>
          </Form>
        </Flex>
      </Flex>
    </BaseFormScreen>
  );
}
