import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Heading } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";

import DashboardLayout from "../../components/DashboardLayout";
import Card from "../../components/Card";

type Vaccine = {
  id: string;
  name: string;
  description: string;
  no_of_does: number;
  is_mandatory?: boolean;
  image_link?: string;
};

export default function CreateVaccinePage() {
  const apiUrl = process.env.REACT_APP_SERVER_UR;
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Vaccine>();

  const onSubmit = handleSubmit((data) => {
    setLoading(true);
    axios({
      method: "post",
      url: `${apiUrl}//`,
      data,
    })
      .then((res) => {
        setLoading(false);
        if (res.data.error) {
          setError(res.data.error);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  });

  return (
    <DashboardLayout bgColor="white">
      <Box pt={2} maxW="xl" mx="auto">
        <form onSubmit={onSubmit}>
          <Card id="info">
            <Heading fontSize="lg" mb={4} fontWeight="500">
              Create Vaccine
            </Heading>

            <FormControl
              mb={4}
              id="name"
              isInvalid={Boolean(errors.description)}
              isRequired
            >
              <FormLabel>Name</FormLabel>
              <Input
                borderColor="gray.300"
                placeholder="Name"
                isInvalid={Boolean(errors.name)}
                {...register("name", {
                  required: "Please enter name.",
                })}
              />
              {errors.name && (
                <FormErrorMessage>
                  {errors.name?.message as string}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              mb={4}
              id="description"
              isInvalid={Boolean(errors.description)}
              isRequired
            >
              <FormLabel>Description</FormLabel>
              <Textarea
                borderColor="gray.300"
                size="sm"
                placeholder="Description"
                {...register("description", {
                  required: "Please enter description.",
                })}
              />
            </FormControl>
            <FormControl
              mb={4}
              id="no_of_does"
              isInvalid={Boolean(errors.no_of_does)}
              isRequired
            >
              <FormLabel>No of does</FormLabel>
              <Input
                type="number"
                borderColor="gray.300"
                placeholder="1"
                {...register("no_of_does", {
                  required: "Please enter no of does",
                })}
              />
            </FormControl>

            <FormLabel>Add Image</FormLabel>

            <Flex
              align="center"
              direction="column"
              p={[4, 16]}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="8px"
            >
              <Heading fontSize="md">Add the Images</Heading>
              <Text>or drop or upload Image</Text>
            </Flex>
          </Card>

          <Text color="red.700" fontSize="sm">
            {error && error}
          </Text>

          <Flex justify="flex-end">
            <Button
              type="submit"
              isLoading={loading}
              mx={2}
              colorScheme="blue"
              variant="solid"
              mb={8}
            >
              Create Vaccine
            </Button>
          </Flex>
        </form>
      </Box>
    </DashboardLayout>
  );
}
