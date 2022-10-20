import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import paths from "../paths";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { signin } from "../features/auth/AuthSlice";

type FormData = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { signinError, isSigningIn } = useAppSelector((state) => state.auth);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    dispatch(signin(data)).then(() => {
      navigate("/");
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <FormControl id="email" isInvalid={Boolean(errors.email)}>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          {...register("email", {
            required: "Please enter email.",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Invalid email",
            },
          })}
        />
        {errors.email && (
          <FormErrorMessage>{errors.email.message as string}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl id="password" mt="2" isInvalid={Boolean(errors.password)}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          {...register("password", {
            required: "Please enter password",
            maxLength: { value: 20, message: "Max length 20 exceeded." },
            minLength: { value: 5, message: "Min length 5." },
          })}
        />
        {errors["password"] && (
          <FormErrorMessage>
            {errors["password"]["message"] as string}
          </FormErrorMessage>
        )}
      </FormControl>
      <Heading color="blue.500" size="xs" mt="6">
        <Link to="/forgotPassword">Forgot Password?</Link>
      </Heading>
      <Text color="red.700" fontSize="sm">
        {signinError && signinError}
      </Text>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        pt="6"
      >
        <Box>
          New user?
          <Heading as="span" ml="2" color="blue.500" size="xs" mt="6">
            <Link to={paths.signup}>Create account</Link>
          </Heading>
        </Box>
        <Button colorScheme="blue" type="submit" disabled={isSigningIn}>
          Sign In
        </Button>
      </Box>
    </form>
  );
}
