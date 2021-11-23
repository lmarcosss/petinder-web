import { useRouter } from 'next/router';
import {
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  Stack,
  Link,
  Text,
} from '@chakra-ui/react';
import { useSidebarDrawer } from '@contexts/SidebarDrawerContext';

const MENU_ITEMS = [
  {
    title: 'Meu Perfil',
    anchor: '#about',
  },
  {
    title: 'Minhas Solicitações',
    anchor: '#about',
  },
  {
    title: 'Meus Anúncios',
    anchor: '#about',
  },
  {
    title: 'Cadastro',
    anchor: '#about',
  },
  {
    title: 'Login',
    anchor: '#about',
  },
];

export function Navbar() {
  const { isOpen, onClose } = useSidebarDrawer();
  const router = useRouter();

  function onClick(anchor: string) {
    onClose();
    setTimeout(() => router.push(anchor), 200);
  }

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent bg="teal.700" p="4">
          <DrawerCloseButton mt="6" color="white" />
          <DrawerHeader>
            <Text color="orange.500">Menu</Text>
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
