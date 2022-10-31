import { Box, Heading } from '@chakra-ui/react';
import SignupForm from '../../components/SignUpForm';

export default function SignUpPage() {
  return (
    <Box
      w={{ base: '100%', md: '60%' }}
      flex="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box w={{ base: 'full', md: 'xl' }} px={{ base: '8', md: '16' }}>
        <Heading py="2" color="blue.500">
          Welcome back
        </Heading>
        <Heading size="md" py="2" color="blue.400">
          Sign in to contine
        </Heading>
        <Box mt="10" p="10" bg="white" rounded="md" shadow="md">
          <SignupForm />
        </Box>
      </Box>
    </Box>
  );
}
