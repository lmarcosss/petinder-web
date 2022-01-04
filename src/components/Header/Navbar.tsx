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
  Icon,
  useToast,
} from "@chakra-ui/react";
import { useSidebarDrawer } from "@contexts";
import { MenuEnum } from "enums";
import {
  FiFileText,
  FiUser,
  FiLogOut,
  FiActivity,
  FiUsers,
  FiFilePlus,
} from "react-icons/fi";
import { useToken } from "@hooks/useToken";
import { useAnnouncement } from "@contexts";
import { IconType } from "react-icons";
import { useGeolocation } from "@hooks/useGeolocation";

interface IMenuItems {
  name: MenuEnum;
  icon: IconType;
  href?: string;
  loggedOut?: boolean;
  loggedIn?: boolean;
  onAction?: () => void;
}

export function Navbar() {
  const { isOpen, onClose } = useSidebarDrawer();
  const { hasAuth, clearToken } = useToken();
  const { onOpen } = useAnnouncement();
  const router = useRouter();
  const { position } = useGeolocation();
  const toast = useToast();

  function goToCreateAnnouncement() {
    if (position?.latitude && position?.longitude) {
      onOpen();
    } else {
      toast({
        title: "Não é possível criar um anúncio",
        description:
          "Para criar um anúncio sua localização deve estar ativada. Ao ativar reiniciar a página",
        status: "error",
        position: "bottom-right",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  const menuItems = [
    {
      name: MenuEnum.REGISTER_OR_LOGIN,
      href: "/login",
      loggedOut: true,
      icon: FiUsers,
    },
    {
      name: MenuEnum.PROFILE,
      href: "/my-profile",
      loggedIn: true,
      icon: FiUser,
    },
    {
      name: MenuEnum.REQUESTS,
      href: "/my-requests",
      loggedIn: true,
      icon: FiActivity,
    },
    {
      name: MenuEnum.ANNOUNCEMENTS,
      href: "/my-announcements",
      loggedIn: true,
      icon: FiFileText,
    },
    {
      name: MenuEnum.CREATE_ANNOUNCEMENT,
      onAction: goToCreateAnnouncement,
      loggedIn: true,
      icon: FiFilePlus,
    },
  ] as IMenuItems[];

  function onClick({ href, onAction }: IMenuItems) {
    onClose();

    if (href) {
      setTimeout(() => router.push(href), 200);
    } else {
      onAction();
    }
  }

  function logout() {
    onClose();
    clearToken();
    setTimeout(() => router.replace("/login"), 200);
  }

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent bg="orange.500" p="4">
          <DrawerCloseButton mt="6" color="white" />
          <DrawerHeader>
            <Text fontWeight="bold" color="white">
              Menu
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <Stack display="flex" spacing="8">
              {menuItems.map((item, index) => {
                if (item.loggedIn && !hasAuth) return;
                if (item.loggedOut && hasAuth) return;

                return (
                  <Link
                    fontWeight="500"
                    display="flex"
                    alignItems="center"
                    key={index}
                    onClick={() => onClick(item)}
                    color="white"
                  >
                    <Icon as={item.icon} fontSize="18" mr="2" />
                    {item.name}
                  </Link>
                );
              })}
            </Stack>
          </DrawerBody>
          {hasAuth && (
            <DrawerFooter justifyContent="center">
              <Button
                variant="solid"
                mr={3}
                onClick={logout}
                color="orange.500"
              >
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
