import { Modal, ModalContent, ModalOverlay, Spinner } from "@chakra-ui/react";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

interface IContextProps {
  setIsLoading: (visible: boolean) => void;
}

const LoaderModalContext = createContext({} as IContextProps);

interface IProps {
  children: ReactNode;
}

export function LoaderProvider({ children }: IProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderModalContext.Provider value={{ setIsLoading }}>
      {children}
      <Modal
        motionPreset="slideInBottom"
        size="lg"
        isOpen={isLoading}
        onClose={() => {}}
      >
        <ModalOverlay />
        <ModalContent
          alignSelf="center"
          width={200}
          height={200}
          justifyContent="center"
          alignItems="center"
        >

          <Spinner
            thickness="4px"
            color="orange"
            size="xl"
          />
        </ModalContent>
      </Modal>
    </LoaderModalContext.Provider>
  );
}

export const useLoader = () => useContext(LoaderModalContext);
