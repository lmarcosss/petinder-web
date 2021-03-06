import { Flex, Image, Heading, Icon } from "@chakra-ui/react";
import { useWindowSize } from "@hooks/useWindowsSize";
import { ReactNode } from "react";
import { FiArrowLeft } from "react-icons/fi";

interface IBackgroundProps {
  isSmallerDevices: boolean;
  image: string;
  alt: string;
}

function ImageBackground({ isSmallerDevices, image, alt }: IBackgroundProps) {
  if (isSmallerDevices) return null;

  return (
    <Image
      alt={alt}
      width="70%"
      height="100%" 
      minHeight="100vh"
      src={image}
    />
  );
}

interface IProps {
  children: ReactNode;
  image?: string;
  alt?: string;
  goBack?: () => void;
}

export function BaseFormScreen({ children, image = "login.jpeg", alt = "imagem de pets", goBack }: IProps) {
  const windowSize = useWindowSize();
  const isBigDevice = windowSize.width > 1669;


  return (
    <Flex position="relative" flexDirection="row" width="100%" overflowY="scroll">
      <ImageBackground
        image={`/images/${image}`}
        alt={alt}
        isSmallerDevices={!isBigDevice}
      />
      <Flex
        direction="column"
        align="center"
        width={isBigDevice ? "30%" : "100%"}
        minHeight="100vh"
        shadow="md"
        backgroundColor="white"
      >
        <Flex
          width="100%"
          height="100%"
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
            <Flex align="center" justify={goBack ? "space-between" : "center"}>
              {goBack && (
                <Icon
                  fontSize="27"
                  aria-label="Voltar"
                  as={FiArrowLeft}
                  cursor="pointer"
                  onClick={goBack}
                />
              )}
              <Heading fontSize={["30","48"]} align="center" color="orange.500" >
                 PeTinder
              </Heading>
              {goBack && (
                <Icon
                  fontSize="27"
                  aria-label="Voltar"
                  as={FiArrowLeft}
                  color="white"
                />
              )}
            </Flex>
            {children}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}