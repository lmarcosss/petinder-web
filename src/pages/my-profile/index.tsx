import { useRef } from "react";
import * as Yup from "yup";
import { getUserInfo, saveUser } from "@services/auth/user";
import { IUser } from "@types";
import { useRouter } from "next/router";
import { Button, Icon, useToast } from "@chakra-ui/react";
import { Form } from "@unform/web";
import { BaseFormScreen, TextAreaInput, TextInput } from "@components";
import {
  FiCalendar,
  FiPhone,
  FiUser,
  FiMail
} from "react-icons/fi";
import { ToastrEnum } from "@enums";

interface IProps {
  userInfo: IUser[];
}

function MyProfilePage({ userInfo }: IProps) {
  const formRef = useRef(null);

  const router = useRouter();
  const toastr = useToast();

  function goBack() {
    router.back();
  }
  
  function resetToHome() {
    router.replace("/");
  }

  async function handleSubmit(data) {
    try {
      if (formRef?.current) {
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          cpf: Yup.string().required("CPF é obrigatório"),
          name: Yup.string().required("Nome é obrigatório"),
          phone: Yup.string().required("Celular é obrigatório"),
          birthDay: Yup.date().required("Data de nascimento é obrigatória"),
          email: Yup.string().email("E-mail deve ser válido").required("E-mail é obrigatório"),
          description: Yup.string().required("Descrição é obrigatória")
        });

        await schema.validate(data, {
          abortEarly: false
        });

        await saveUser(data);

        toastr({
          description: ToastrEnum.USER_UPDATE_SUCCESS,
          status: "success",
          position: "top-right",
          isClosable: true
        });

        resetToHome();
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
        isClosable: true
      });
    }
  }

  return (
    <BaseFormScreen goBack={goBack}>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={userInfo}
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
          placeholder="999.999.999-99"
          mask="999.999.999-99"
          name="cpf"
        />

        <TextInput
          label="Celular"
          iconInput={<Icon as={FiPhone} fontSize="20" mt="2" />}
          placeholder="(99) 9 9999-9999"
          mask="(99) 9 9999-9999"
          name="phone"
          type="tel"
        />

        <TextInput
          label="Data de nascimento"
          iconInput={<Icon as={FiCalendar} fontSize="20" mt="2" />}
          placeholder="dd/mm/aaaa"
          mask="99/99/9999"
          name="birthDay"
        />
        <TextInput
          label="E-mail"
          iconInput={<Icon as={FiMail} fontSize="20" mt="2" />}
          placeholder="seu@email.com.br"
          name="email"
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
    </BaseFormScreen>
  );
}

MyProfilePage.getInitialProps = async function (ctx) {
  const { data: userInfo } = await getUserInfo(ctx.req);

  return { userInfo };
};

export default MyProfilePage;
