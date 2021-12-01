import { Flex, Image, } from "@chakra-ui/react";
import { useWindowSize } from "@hooks/useWindowsSize";
import { FormLoginEnum } from "enums";
import { useState } from "react";
import Login from "./_login";
import Register from "./_register";

export default function Auth() {
  const [form, setForm] = useState(FormLoginEnum.LOGIN);
  const windowSize = useWindowSize();

  const Form = form === FormLoginEnum.LOGIN ? Login : Register;

  return (
    <>
      <Flex alignItems="flex-end" flexDirection="row" width="100%" h="100vh">
        {windowSize.width > 1530 && <Image alt="imagem de pets" width="70%" height="100%" src="/images/auth.jpeg" />}
        <Flex
          direction="column"
          width={windowSize.width > 1530 ? "30%" : "100%"}
          height={"100%"}
          shadow="md"
          backgroundColor="white"
        >
          <Form onChangeForm={setForm} />
        </Flex>
      </Flex>
    </>
  );
}
