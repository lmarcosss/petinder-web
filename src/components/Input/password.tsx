import { TextInput } from "@components";
import { useState } from "react";
import { IconButton, Icon } from "@chakra-ui/react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

function ShowButton({ show, handleClick, }) {
  const Icon = show ? FiEye: FiEyeOff;

  return (
    <IconButton
      aria-label=""
      fontSize="22"
      icon={<Icon />}
      mt="2"
      h='1.75rem'
      onClick={handleClick}
    />
  );
}

interface IProps {
  label: string;
  name: string;
  placeholder: string;
}

export function PasswordInput({ label, name, placeholder,}: IProps) {
  const [show, setShow,] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <TextInput
      RightElement={() => <ShowButton show={show} handleClick={handleClick}  />}
      iconInput={<Icon as={FiLock} fontSize="20" mt="2" />}
      label={label}
      placeholder={placeholder}
      type={show ? "text" : "password"}
      name={name}
    />
  );
}