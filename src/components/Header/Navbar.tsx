import { useRouter } from "next/router";
import {
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  Button,
  Stack,
  Link,
  Text,
  Icon
} from "@chakra-ui/react";
import { useSidebarDrawer } from "@contexts/SidebarDrawerContext";
import { MenuEnum } from "enums";
import { FiFileText, FiUser, FiLogOut } from "react-icons/fi";
import { useToken } from "@hooks/useToken";

const MENU_ITEMS = [
  {
    title: MenuEnum.REGISTER_OR_LOGIN,
    href: "/login",
    loggedOut: true,
    icon: FiUser
  },
  {
    title: MenuEnum.PROFILE,
    href: "/my-profile",
    loggedIn: true,
    icon: FiUser
  },
  {
    title: MenuEnum.REQUESTS,
    href: "/my-requests",
    loggedIn: true,
    icon: FiUser
  },
  {
    title: MenuEnum.ANNOUNCEMENTS,
    href: "/my-announcements",
    loggedIn: true,
    icon: FiUser
  },
  {
    title: MenuEnum.CREATE_ANNOUNCEMENT,
    href: "/create-announcement",
    icon: FiFileText,
    loggedIn: true
  }
];

interface IOnclick {
  href: string;
  title: MenuEnum;
}

export function Navbar() {
  const { isOpen, onClose } = useSidebarDrawer();
  const { hasAuth, clearToken } = useToken();

  const router = useRouter();

  function onClick({ href }: IOnclick) {
    onClose();
    setTimeout(() => router.push(href), 200);
  }

  function logout() {
    onClose();
    clearToken();
    setTimeout(() => router.replace("/"), 200);
  }

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent bg="orange.500" p="4">
          <DrawerCloseButton mt="6" color="white" />
          <DrawerHeader>
            <Text fontWeight="bold" color="white">Menu</Text>
          </DrawerHeader>
          <DrawerBody>
            <Stack display="flex" spacing="8">
              {MENU_ITEMS.map((item, index) => {
                if (item.loggedIn && !hasAuth) return;
                if (item.loggedOut && hasAuth) return;

                return (
                  <Link fontWeight="500" display="flex" alignItems="center" key={index} onClick={() => onClick(item)} color="white">
                    <Icon as={item.icon} fontSize="18" mr="2" />
                    {item.title}
                  </Link>
                );
              })}
            </Stack>
          </DrawerBody>
          {hasAuth && (
            <DrawerFooter justifyContent="center">
              <Button variant="solid" mr={3} onClick={logout} color="orange.500">
                <Icon as={FiLogOut} fontSize="18" mr="2" color="orange.500" />
                Sair
              </Button>
            </DrawerFooter>
          )}     
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
