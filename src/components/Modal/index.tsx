import {
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Modal as ChakraModal,
} from "@chakra-ui/react";
import { ReactChild, ReactNode } from "react";

interface IProps {
  children: ReactChild;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  footer?: ReactNode;
}
export function Modal({ children, isOpen, onClose, title, footer }: IProps) {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody minHeight={150}>{children}</ModalBody>

        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </ChakraModal>
  );
}
