import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Divider, Stack } from "@chakra-ui/layout";

import { CgMenuGridO } from "react-icons/cg";
import { AiOutlineHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import Navbar from "./Navbar";
import NavItem from "./NavItem";
import paths from "../paths";
import Link from "./Link";

type DashboardLayoutData = {
  children: JSX.Element[] | JSX.Element;
  bgColor: string;
};

function DashboardLayout({ children, bgColor }: DashboardLayoutData) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Navbar onOpen={onOpen} />
      <Box bg={bgColor || "gray.50"} minHeight="calc(100vh - 80px)">
        {children}
      </Box>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <MainDrawerContent />
      </Drawer>
    </Box>
  );
}

function MainDrawerContent() {
  return (
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>
        <Link to={paths.home}>Vaaccine Management</Link>
      </DrawerHeader>

      <Stack>
        <NavItem
          icon={<AiOutlineHome />}
          label="Vaccine"
          link={paths.vaccine}
        />
        <NavItem
          icon={<CgMenuGridO />}
          label="Create Vaccine"
          link={paths.createVaccine}
        />
        <Divider color="gray.400" />
        <NavItem icon={<BiLogOut />} label="Log Out" link="#" />
        <Divider color="gray.400" />
      </Stack>
      <DrawerFooter></DrawerFooter>
    </DrawerContent>
  );
}

export default DashboardLayout;
