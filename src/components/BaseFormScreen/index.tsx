import { Flex, Image } from "@chakra-ui/react";
import { useWindowSize } from "@hooks/useWindowsSize";

function ImageBackground({ isSmallerDevices, image, alt, }) {
  if (isSmallerDevices) return null;

  return (
    <Image
      alt={alt}
      width="70%"
      height="100%" 
      src={image}
    />
  );
}

export function BaseFormScreen({ children, image = "login.jpeg", alt = "imagem de pets", }) {
  const windowSize = useWindowSize();
  const isSmallerDevices = windowSize.width > 1669;


  return (
    <Flex flexDirection="row" width="100%" h="100vh">
      <ImageBackground
        image={`/images/${image}`}
        alt={alt}
        isSmallerDevices={!isSmallerDevices}
      />
      <Flex
        direction="column"
        align="center"
        width={isSmallerDevices ? "30%" : "100%"}
        height={"100%"}
        shadow="md"
        backgroundColor="white"
      >
        {children}
      </Flex>
    </Flex>
  );
}