import { useRef, useState } from "react";
import { Button, Icon } from "@chakra-ui/react";
import { TextAreaInput, TextInput } from "@components";
import { useAnnouncementModal } from "@contexts";
import {
  createAnnouncement,
  editAnnouncement,
} from "@services/petinder/announcement";
import { useGeolocation } from "@hooks/useGeolocation";
import { IAnnouncement, IAnnouncementForm } from "@types";
import { Form } from "@unform/web";
import { FiImage, FiType } from "react-icons/fi";
import * as Yup from "yup";
import { decodedToken } from "@core";

interface IProps {
  initialData?: IAnnouncement;
}

export function CreateAnnouncement({ initialData }: IProps) {
  const formRef = useRef(null);
  const { position } = useGeolocation();
  const [loading, setLoading] = useState(false);
  const { onClose } = useAnnouncementModal();

  async function handleSubmit(data: IAnnouncementForm) {
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
        const pictures = [picture];

        if (initialData) {
          const announcement = {
            ...initialData,
            ...rest,
            pictures,
          };

          await editAnnouncement(announcement);
        } else {
          const { userId } = decodedToken();

          const announcement = {
            ...rest,
            pictures,
            userId,
            longitude: position.longitude,
            latitude: position.latitude,
          };

          await createAnnouncement(announcement);
        }

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

  const formattedInitialData = initialData
    ? {
        ...initialData,
        picture: initialData.pictures[0].url,
      }
    : null;

  return (
    <Form
      ref={formRef}
      onSubmit={handleSubmit}
      initialData={formattedInitialData}
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
