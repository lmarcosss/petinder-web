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
  Text
} from "@chakra-ui/react";
import { useSidebarDrawer } from "@contexts/SidebarDrawerContext";
import { MenuEnum } from "enums";

const MENU_ITEMS = [
  {
    title: MenuEnum.REGISTER_OR_LOGIN,
    href: "/login",
  },
  {
    title: MenuEnum.PROFILE,
    href: "/my-profile",
    needAuth: true,
  },
  {
    title: MenuEnum.REQUESTS,
    href: "/my-requests",
    needAuth: true,
  },
  {
    title: MenuEnum.ANNOUNCEMENTS,
    href: "/my-announcements",
    needAuth: true,
  },
  {
    title: MenuEnum.CREATE_ANNOUNCEMENT,
    href: "/create-announcement",
    needAuth: true,
  },
];

interface IOnclick {
  href: string;
  title: MenuEnum;
}

export function Navbar() {
  const { isOpen, onClose, } = useSidebarDrawer();

  const router = useRouter();

  function onClick({ href, }: IOnclick) {
    onClose();
    setTimeout(() => router.push(href), 200);
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
                if (item.needAuth) return;

                return (
                  <Link key={index} onClick={() => onClick(item)} color="white">
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
