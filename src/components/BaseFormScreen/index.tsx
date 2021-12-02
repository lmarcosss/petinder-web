import { Flex, Image, Heading } from "@chakra-ui/react";
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
    <Flex position="relative" flexDirection="row" width="100%" h="100vh">
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
        <Flex
          width="100%"
          height="100vh"
          direction="column"
          align="center"
          padding="8"
        >
          <Flex
            direction="column"
            justify="center"
            width="100%"
            height="100%"
            maxWidth={448}
          >
            <Heading fontSize="48" align="center" color="orange.500" >
            PeTinder
            </Heading>
            {children}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}