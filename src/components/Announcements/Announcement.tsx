import { Box, Image } from '@chakra-ui/react';
import { AnnouncementStatusEnum } from 'enums';

const cursor = {
  [AnnouncementStatusEnum.ABERTO]: 'pointer',
};

export function Announcement({ data }) {
  return (
    <Box
      cursor={cursor[data.status]}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image src={data.imageUrl} alt={data.name} />

      <Box p="6">
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {data.name}
        </Box>

        <Box>{data.location}</Box>
      </Box>
    </Box>
  );
}
