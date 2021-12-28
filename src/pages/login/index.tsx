import { Button, Link, Text, Icon, useToast } from "@chakra-ui/react";
import { BaseFormScreen, PasswordInput, TextInput } from "@components";
import { useRef } from "react";
import { Form } from "@unform/web";
import { FiMail } from "react-icons/fi";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { doLogin } from "@services/auth/login";
import { useToken } from "@hooks/useToken";
import { ToastrEnum } from "@enums";

export default function Login() {
  const route = useRouter();
  const toastr = useToast();
  const { setToken } = useToken();
  const formRef = useRef(null);

  function handleChangeForm() {
    route.push("/register");
  }

  async function handleSubmit(data) {
    try {
      // Remove all previous errors
      if (formRef?.current) {
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .email("E-mail deve ser válido")
            .required("E-mail é obrigatório"),
          password: Yup.string()
            .min(6, "Mínimo de 6 caracteres")
            .required("Senha é obrigatória"),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        // Validation passed

        const {
          data: { token, tokenType },
        } = await doLogin(data.email, data.password);

        setToken(tokenType, token);

        route.replace("/");
      }
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);

        return;
      }

      toastr({
        description: err.response.data.message || ToastrEnum.UNEXPECTED_ERROR,
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    }
  }

  function goBack() {
    route.replace("/");
  }

  return (
    <BaseFormScreen goBack={goBack} image="register.jfif">
      <Form onSubmit={handleSubmit} ref={formRef}>
        <TextInput
          label="E-mail"
          iconInput={<Icon as={FiMail} fontSize="20" mt="2" />}
          placeholder="seu@email.com.br"
          name="email"
        />

        <PasswordInput label="Senha" name="password" placeholder="sua senha" />

        <Button
          width="100%"
          type="submit"
          size="lg"
          colorScheme="orange"
          mt="6"
        >
          Entrar
        </Button>
        <Text fontSize={["12", "14"]} pt="2">
          Ainda não tem uma conta?
          <Link ml="4px" fontWeight="bold" onClick={handleChangeForm}>
            Cadastre-se!
          </Link>
        </Text>
      </Form>
    </BaseFormScreen>
  );
}
