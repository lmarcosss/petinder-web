import {
  Input,
  Text,
  FormControl,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  ComponentWithAs
} from "@chakra-ui/react";
import { useField } from "@unform/core";
import React, { MutableRefObject, ReactNode, useEffect, useRef } from "react";
import ReactInputMask, { Props as InputProps } from "react-input-mask";

interface IProps extends InputProps {
  labelColor?: string;
  placeholder?: string;
  type?: string;
  label: string;
  name: string;
  iconInput?: ReactNode;
  RightElement?: ComponentWithAs<"div">;
  ComponentInput?: ComponentWithAs<"div">;
  mask?: string;
}

export function TextInput ({
  labelColor,
  label,
  type,
  placeholder,
  name,
  iconInput,
  RightElement,
  mask,
  ...otherInputProps
}: IProps) {
  const inputRef = useRef<HTMLInputElement>();
  const { fieldName, registerField, error, defaultValue } = useField(name);

  function getValue(ref: MutableRefObject<HTMLInputElement>) {
    return ref.current.value;
  }

  function setValue(ref: MutableRefObject<HTMLInputElement>, value: string) {
    ref.current.value = value;
  }

  function clearValue(ref: MutableRefObject<HTMLInputElement>) {
    ref.current.value = "";
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue,
      setValue,
      clearValue
    });
  }, [fieldName, registerField]);

  const ComponentInput = mask ? ReactInputMask : Input;

  return (
    <FormControl isInvalid={!!error} pt={["4", "2"]}>
      <Text fontWeight="500" color={labelColor} mb="2">
        {label}
      </Text>
      <InputGroup>
        <InputLeftElement pointerEvents="none">{iconInput}</InputLeftElement>
        <Input
          defaultValue={defaultValue}
          as={ComponentInput}
          isInvalid={!!error}
          ref={inputRef}
          name={name}
          type={type}
          placeholder={placeholder}
          size="lg"
          variant="filled"
          focusBorderColor="teal.500"
          mask={mask}
          {...otherInputProps}
        />
        {RightElement && (
          <InputRightElement width='4.5rem'>
            <RightElement />
          </InputRightElement>
        )}
      </InputGroup>
      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}
