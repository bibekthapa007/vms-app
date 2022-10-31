import { Box } from '@chakra-ui/layout';

type CardProps = {
  children: JSX.Element[] | JSX.Element;
  id: string;
  title?: string;
};

function Card({ children, id, title }: CardProps) {
  return (
    <Box bg="white" boxShadow="sm" borderRadius={[0, '8px']} my={[2, 2]} p={[3, 4, 6]} id={id}>
      {children}
    </Box>
  );
}

export default Card;
