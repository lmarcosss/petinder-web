import { useRouter } from 'next/router';
import {
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  useBreakpointValue,
  Stack,
  Link,
  Text,
} from '@chakra-ui/react';

import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';

const MENU_ITEMS = [
  {
    title: 'Sobre',
    anchor: '#about',
  },
];

export function Navbar() {
  const { isOpen, onClose } = useSidebarDrawer();
  const router = useRouter();
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  });

  function onClick(anchor: string) {
    onClose();
    setTimeout(() => router.push(anchor), 200);
  }

  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg="gray.800" p="4">
            <DrawerCloseButton mt="6" color="white" />
            <DrawerHeader>
              <Text color="green.500">Navegação</Text>
            </DrawerHeader>
            <DrawerBody>
              <Stack display="flex" spacing="8">
                {MENU_ITEMS.map((item, index) => {
                  return (
                    <Link key={index} onClick={() => onClick(item.anchor)} color="white">
                      {item.title}
                    </Link>
                  );
                })}
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <Stack pl="8" display="flex" direction="row" spacing="8">
      {MENU_ITEMS.map((item, index) => (
        <Link href={item.anchor} key={index} color="white">
          {item.title}
        </Link>
      ))}
    </Stack>
  );
}
