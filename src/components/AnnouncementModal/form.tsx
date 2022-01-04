import { useRef, useState } from "react";
import { Button, Icon } from "@chakra-ui/react";
import { TextAreaInput, TextInput } from "@components";
import { useAnnouncement } from "@contexts";
import {
  createAnnouncement,
  editAnnouncement,
} from "@services/petinder/announcement";
import { useGeolocation } from "@hooks/useGeolocation";
import { IAnnouncementForm } from "@types";
import { Form } from "@unform/web";
import { FiImage, FiType } from "react-icons/fi";
import * as Yup from "yup";
import { useRouter } from "next/router";

export function CreateAnnouncement() {
  const formRef = useRef(null);
  const { position } = useGeolocation();
  const [loading, setLoading] = useState(false);
  const {
    onClose,
    initialData,
    setAnnouncements,
    announcements,
    myAnnouncements,
    isMyAnnouncement,
    setMyAnnouncements,
  } = useAnnouncement();

  const router = useRouter();

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
            longitude: position.longitude,
            latitude: position.latitude,
          };

          await editAnnouncement(announcement);

          router.reload();
        } else {
          const announcement = {
            ...rest,
            pictures,
            longitude: position.longitude,
            latitude: position.latitude,
          };

          const { data: newAnnouncement } = await createAnnouncement(
            announcement
          );

          const otherAnnouncements = isMyAnnouncement
            ? myAnnouncements
            : announcements;

          const onChangeAnnouncement = isMyAnnouncement
            ? setMyAnnouncements
            : setAnnouncements;

          onChangeAnnouncement([{ ...newAnnouncement, isMyAnnouncement: true }, ...otherAnnouncements]);
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
        placeholder="Título do anúncio"
        name="title"
      />

      <TextAreaInput
        label="Descrição"
        placeholder="Descrição do anúncio"
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
