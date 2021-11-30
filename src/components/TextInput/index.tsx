import {
  Box,
  Input,
  InputProps,
  Text,
  FormControl,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { useField } from '@unform/core';
import { MutableRefObject, useEffect, useRef } from 'react';

interface IProps extends InputProps {
  labelColor?: string;
  label: string;
  name: string;
  iconInput?: any;
}

export var TextInput = function ({
  labelColor,
  label,
  value,
  type,
  onChange,
  placeholder,
  name,
  iconInput,
  ...otherInputProps
}: IProps) {
  const inputRef = useRef<HTMLInputElement>();
  const { fieldName, registerField, error } = useField(name);

  function getValue(ref: MutableRefObject<HTMLInputElement>) {
    return ref.current.value;
  }

  function setValue(ref: MutableRefObject<HTMLInputElement>, value: string) {
    ref.current.value = value;
  }

  function clearValue(ref: MutableRefObject<HTMLInputElement>) {
    ref.current.value = '';
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue,
      setValue,
      clearValue,
    });
  }, [fieldName, registerField]);

  return (
    <FormControl isInvalid={!!error} pt={['4', '2']}>
      <Text fontWeight="500" color={labelColor} mb="2">
        {label}
      </Text>
      <InputGroup>
        <InputLeftElement pointerEvents="none">{iconInput}</InputLeftElement>
        <Input
          isInvalid={!!error}
          ref={inputRef}
          name={name}
          type={type}
          placeholder={placeholder}
          size="lg"
          variant="filled"
          focusBorderColor="teal.500"
          {...otherInputProps}
        />
      </InputGroup>
      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
