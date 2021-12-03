import { TextInput } from "@components";
import { useState } from "react";
import { IconButton, Icon } from "@chakra-ui/react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

interface IShowButton {
  show: boolean;
  handleClick(): void;
}

function ShowButton({ show, handleClick }: IShowButton) {
  const Icon = show ? FiEye: FiEyeOff;
  const text = show ? "Ver senha" : "Esconder senha";

  return (
    <IconButton
      aria-label={text}
      fontSize="22"
      icon={<Icon />}
      mt="2"
      h="1.75rem"
      onClick={handleClick}
    />
  );
}

interface IProps {
  label: string;
  name: string;
  placeholder: string;
}

export function PasswordInput({ label, name, placeholder}: IProps) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const type = show ? "text" : "password";
  
  return (
    <TextInput
      RightElement={() => <ShowButton show={show} handleClick={handleClick}  />}
      iconInput={<Icon as={FiLock} fontSize="20" mt="2" />}
      label={label}
      placeholder={placeholder}
      type={type}
      name={name}
    />
  );
}