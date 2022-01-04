import { Box, Icon, IconButton, Image } from "@chakra-ui/react";
import { IAnnouncement } from "@types";
import { AnnouncementStatusEnum } from "@enums";
import { FiEdit } from "react-icons/fi";
import { useAnnouncement } from "@contexts";

const cursor = {
  [AnnouncementStatusEnum.ABERTO]: "pointer",
};

interface IProps {
  data: IAnnouncement;
  isMyAnnouncement?: boolean;
}

export function Announcement({ data, isMyAnnouncement }: IProps) {
  const { onOpen } = useAnnouncement();

  function onOpenModal() {
    onOpen({ initialData: data, title: "Editar anúncio" });
  }

  return (
    <Box
      cursor={cursor[data.status]}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image src={data.pictures[0].url} alt={String(data.id)} />

      <Box position="relative" p="6">
        <Box mt="1" fontWeight="bold" as="h4" lineHeight="tight" isTruncated>
          {data.title}
        </Box>
        <Box mt="1" as="h2" fontWeight="500" lineHeight="tight" isTruncated>
          {data.description}
        </Box>

        <Box>{data.city}</Box>
        {isMyAnnouncement && (
          <IconButton
            onClick={onOpenModal}
            icon={<Icon as={FiEdit} />}
            aria-label="Abrir modal de editar anúncio"
            position="absolute"
            right="5"
            bottom="6"
            colorScheme="orange"
          />
        )}
      </Box>
    </Box>
  );
}
