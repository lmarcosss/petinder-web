import { useState } from 'react';

import { Flex, Icon, IconButton } from '@chakra-ui/react';
import { RiMenuLine, RiUser3Fill } from 'react-icons/ri';

import { useSidebarDrawer } from '@contexts/SidebarDrawerContext';
import { useWindowEvent } from '@hooks/useWindowEvent';
import { Navbar } from './Navbar';
import { Logo } from './Logo';

const PAGE_TOP = 0;

export function Header() {
  const [prevScroll, setPrevScroll] = useState(0);
  const { onOpen } = useSidebarDrawer();
  const [isVisible, setVisible] = useState(true);

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
      transition="top 0.5s"
      top={isVisible ? '0' : '-80px'}
      zIndex="99"
      background="teal.500"
      px="6"
      align="center"
      justify="space-between"
    >
      <Logo />
      <IconButton
        aria-label="Open navigation"
        icon={
          <Flex
            align="center"
            justify="center"
            backgroundColor="white"
            borderRadius="24px"
            p={['4px 8px', '4px 5px']}
          >
            <Icon color="teal.500" fontSize="20" m="1" as={RiMenuLine} />
            <Icon color="teal.500" fontSize="20" m="1" as={RiUser3Fill} />
          </Flex>
        }
        fontSize="24"
        variant="unstyled"
        color="white"
        onClick={onOpen}
      />
      <Navbar />
    </Flex>
  );
}
