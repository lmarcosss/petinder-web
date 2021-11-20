import { useState } from 'react';

import { Flex, useBreakpointValue, IconButton, Icon, Text } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';

import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { useWindowEvent } from '../../hooks/useWindowEvent';

import { Navbar } from './Navbar';

const PAGE_TOP = 0;

export function Header() {
  const [prevScroll, setPrevScroll] = useState(0);
  const [isVisible, setVisible] = useState(true);
  const { onOpen } = useSidebarDrawer();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  function handleScroll() {
    const currentScroll = window.pageYOffset;
    const visible = prevScroll > currentScroll || currentScroll <= PAGE_TOP;

    setPrevScroll(currentScroll);
    setVisible(visible);
  }

  useWindowEvent('scroll', handleScroll);

  return (
    <Flex
      as="header"
      w="100%"
      h={['16', '20']}
      position="fixed"
      transition="top 0.5s"
      top={isVisible ? '0' : '-80px'}
      zIndex="99"
      background="teal.500"
      px="6"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          color="white"
          position="absolute"
          onClick={onOpen}
        />
      )}

      <Flex w="100%">
        <Text fontSize="30" fontWeight="bold" color="orange.400">
          PeTinder
        </Text>
      </Flex>
    </Flex>
  );
}
