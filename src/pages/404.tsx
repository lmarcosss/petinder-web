import { Image, Flex, Heading, Box } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Flex direction="column" align="center" justify="center" h="100vh" p="4">
      <Box>
        <Image alt="imagem de gato triste" src="/images/notFound.jpg" />
        <Heading pt="2" fontSize="24">
          Desculpe, página não encontrada
        </Heading>
      </Box>
    </Flex>
  );
}
