import { useRouter } from "next/router";
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
  Icon
} from "@chakra-ui/react";
import { useSidebarDrawer } from "@contexts/SidebarDrawerContext";
import { MenuEnum } from "enums";
import { FiUser } from "react-icons/fi";

const MENU_ITEMS = [
  {
    title: MenuEnum.REGISTER_OR_LOGIN,
    href: "/login",
    icon: FiUser
  },
  {
    title: MenuEnum.PROFILE,
    href: "/my-profile",
    needAuth: true,
    icon: FiUser
  },
  {
    title: MenuEnum.REQUESTS,
    href: "/my-requests",
    needAuth: true,
    icon: FiUser
  },
  {
    title: MenuEnum.ANNOUNCEMENTS,
    href: "/my-announcements",
    needAuth: true,
    icon: FiUser
  },
  {
    title: MenuEnum.CREATE_ANNOUNCEMENT,
    href: "/create-announcement",
    needAuth: true,
    icon: FiUser
  }
];

interface IOnclick {
  href: string;
  title: MenuEnum;
}

export function Navbar() {
  const { isOpen, onClose } = useSidebarDrawer();

  const router = useRouter();

  function onClick({ href }: IOnclick) {
    onClose();
    setTimeout(() => router.push(href), 200);
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
                if (item.needAuth) return;

                return (
                  <Link display="flex" alignItems="center" key={index} onClick={() => onClick(item)} color="white">
                    <Icon as={item.icon} fontSize="20" mr="2" />
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
