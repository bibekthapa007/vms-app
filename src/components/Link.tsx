import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ChackraLink } from '@chakra-ui/react';

const Link = ({
  children,
  to,
  as,
  passHref,
  replace,
  scroll,
  shallow,
  locale,
  nextLink,
  decoration,
  ...chackraProps
}: any) => {
  chackraProps._hover = {
    ...chackraProps._hover,
    textDecoration: decoration || 'none',
  };
  return (
    <RouterLink
      to={to}
      as={as}
      passHref={passHref}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      locale={locale}
      {...nextLink}
    >
      <ChackraLink {...chackraProps}>{children}</ChackraLink>
    </RouterLink>
  );
};

export default Link;
