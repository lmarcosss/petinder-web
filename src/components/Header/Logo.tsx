import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export function Logo() {
  const router = useRouter();

  function onClick() {
    router.replace("/");
  }

  return (
    <Flex onClick={onClick} cursor="pointer" w="100%" pb="2">
      <Text fontSize="30" fontWeight="bold" color="white">
        PeTinder
      </Text>
    </Flex>
  );
}
