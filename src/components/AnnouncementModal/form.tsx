import { Button, Icon } from "@chakra-ui/react";
import { useAnnouncementModal } from "@contexts/AnnouncementContext";
import { TextAreaInput, TextInput } from "@components";
import { getUserInfo } from "@services/auth/user";
import { createAnnouncement } from "@services/petinder/announcement";
import { useGeolocation } from "@hooks/useGeolocation";
import { IAnnouncementEdit } from "@types";
import { Form } from "@unform/web";
import { useRef, useState } from "react";
import { FiImage, FiType } from "react-icons/fi";
import * as Yup from "yup";

interface IProps {
  initialData?: IAnnouncementEdit;
}

export function CreateAnnouncement({ initialData }: IProps) {
  const formRef = useRef(null);
  const { position } = useGeolocation();
  const [loading, setLoading] = useState(false);
  const { onClose } = useAnnouncementModal();

  async function handleSubmit(data) {
    setLoading(true);

    try {
      if (formRef?.current) {
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          title: Yup.string().required("Título é obrigatório"),
          description: Yup.string().required("Descrição é obrigatória"),
          picture: Yup.string().required("Foto é obrigatória"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { picture, ...rest } = data;

        const { data: userInfo } = await getUserInfo(null);

        await createAnnouncement({
          ...rest,
          pictures: [picture],
          longitude: position.longitude,
          latitude: position.latitude,
          userId: userInfo.id,
        });

        onClose();
      }
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
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

      <TextInput
        placeholder="Foto do anúncio"
        label="Foto"
        name="picture"
        iconInput={<Icon as={FiImage} fontSize="20" mt="2" />}
      />

      <Button
        width="100%"
        type="submit"
        size="lg"
        colorScheme="orange"
        mt="6"
        mb="4"
        isLoading={loading}
      >
        Salvar
      </Button>
    </Form>
  );
}
