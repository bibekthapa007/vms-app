import React from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import Link from './Link';

type NavItemData = {
  icon: any;
  label: string;
  link: string;
  onClick?: () => void;
};

const NavItem = ({ icon, label, link, onClick }: NavItemData) => {
  return (
    <Link
      href={link}
      onClick={onClick}
      display="flex"
      alignItems="center"
      py={2}
      pr={2}
      pl={4}
      mt={0}
      color="gray.700"
      _hover={{
        backgroundColor: 'gray.100',
      }}
    >
      <Flex align="center">
        {React.cloneElement(icon, { size: '24px' })}
        <Box ml={3} fontWeight="500">
          {label}
        </Box>
      </Flex>
    </Link>
  );
};

export default NavItem;
