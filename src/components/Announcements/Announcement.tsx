import { Box, Image } from "@chakra-ui/react";
import { IAnnouncement } from "@types";
import { AnnouncementStatusEnum } from "@enums";

const cursor = {
  [AnnouncementStatusEnum.ABERTO]: "pointer",
};

interface IProps {
  data: IAnnouncement;
}

export function Announcement({ data }: IProps) {
  return (
    <Box
      cursor={cursor[data.status]}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image src={data.pictures[0].url} alt={String(data.id)} />

      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {data.description}
        </Box>

        <Box>{data.city}</Box>
      </Box>
    </Box>
  );
}
