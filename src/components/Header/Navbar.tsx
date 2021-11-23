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
  MenuList,
  MenuItem,
  Icon,
  MenuButton,
  Menu,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { useSidebarDrawer } from '@contexts/SidebarDrawerContext';
import { RiMenuLine, RiUser3Fill } from 'react-icons/ri';

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

  return (
    <Menu>
      {!isDrawerSidebar && (
        <MenuButton
          as={IconButton}
          aria-label="Open navigation"
          icon={
            <Flex
              align="center"
              justify="center"
              backgroundColor="white"
              borderRadius="24px"
              p="4px 5px"
            >
              <Icon color="teal.500" fontSize="20" m="1" as={RiMenuLine} />
              <Icon color="teal.500" fontSize="20" m="1" as={RiUser3Fill} />
            </Flex>
          }
          fontSize="20"
          variant="unstyled"
          color="white"
          mb="1"
        />
      )}
      <MenuList>
        {MENU_ITEMS.map((item) => (
          <MenuItem>{item.title}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
