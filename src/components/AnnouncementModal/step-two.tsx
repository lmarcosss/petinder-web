import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import { TextInput } from "@components";
import { IAnnouncementForm } from "@types";
import { Form } from "@unform/web";
import { useRef } from "react";
import { FiImage } from "react-icons/fi";
import * as Yup from "yup";

interface IProps {
  formProperties: IAnnouncementForm;
  goToStepOne(): void;
}

export function StepTwoCreateAnnouncement({ formProperties, goToStepOne }: IProps) {
  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      if (formRef?.current) {
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          picture: Yup.string().email("E-mail deve ser válido").required("E-mail é obrigatório")
        });
    
        await schema.validate(data, {
          abortEarly: false
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
    <Form
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <TextInput
        placeholder="Foto do anúncio"
        label="Foto"
        name="picture"
        iconInput={<Icon as={FiImage} fontSize="20" mt="2" />}
      />
      <Flex justify="space-between">
        <Button
          width="50% - 20px"
          onClick={goToStepOne}
          size="lg"
          colorScheme="orange" 
          mt="6"
        >
        Voltar
        </Button>
        <Button
          width="50% - 20px"
          type="submit" 
          size="lg"
          colorScheme="orange" 
          mt="6"
        >
        Salvar
        </Button>
      </Flex>
    </Form>
  );
}