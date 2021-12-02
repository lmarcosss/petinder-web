import {
  TextareaProps,
  Text,
  FormControl,
  Textarea,
  FormErrorMessage
} from "@chakra-ui/react";
import { useField } from "@unform/core";
import { MutableRefObject, useEffect, useRef } from "react";
  
  interface IProps extends TextareaProps {
    labelColor?: string;
    label: string;
    name: string;
    iconInput?: any;
  }
  
export var TextAreaInput = function ({
  labelColor,
  label,
  placeholder,
  name,
}: IProps) {
  const inputRef = useRef();
  const { fieldName, registerField, error, } = useField(name);
  
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
      clearValue,
    });
  }, [fieldName, registerField,]);
  
  return (
    <FormControl isInvalid={!!error} pt={["4", "2",]}>
      <Text fontWeight="500" color={labelColor} mb="2">
        {label}
      </Text>
      <Textarea
        isInvalid={!!error}
        ref={inputRef}
        name={name}
        placeholder={placeholder}
        variant="filled"
        focusBorderColor="teal.500"
      />
      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
  