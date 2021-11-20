import { Box, Image } from '@chakra-ui/react';

const property = {
  imageUrl:
    'https://blog.cobasi.com.br/wp-content/uploads/2021/03/por-que-o-pinscher-e-tao-bravo-capa.png',
  name: 'O cão',
  location: 'Bairro Centro',
};

export function Announcement({ data }) {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={property.imageUrl} alt={property.name} />

      <Box p="6">
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {property.name}
        </Box>

        <Box>{property.location}</Box>
      </Box>
    </Box>
  );
}
