import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

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
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { editVaccine, fetchVaccine } from "./VaccineSlice";
import { Vaccine, VaccineResponse } from "../../types/vaccine";
import { Switch } from "@chakra-ui/react";

export default function EditVaccinePage() {
  const dispatch = useAppDispatch();
  let { vaccine_id: id } = useParams();
  const { editing, editError, vaccine } = useAppSelector(
    (state) => state.vaccine
  );

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { isDirty, errors },
  } = useForm<Vaccine>();

  useEffect(() => {
    id &&
      dispatch(fetchVaccine(parseInt(id))).then((data) => {
        let payload = data.payload as VaccineResponse;
        reset(payload.vaccine as Vaccine);
      });
  }, [id, dispatch, reset]);

  const onSubmit = handleSubmit((data) => {
    data.id = parseInt(id as string);
    dispatch(editVaccine(data)).then((data) => {
      let requestStatus = data.meta.requestStatus as string;
      if (requestStatus === "fulfilled") {
        let payload = data.payload as VaccineResponse;
        reset(payload.vaccine as Vaccine);
      }
    });
  });

  const is_mandatory = watch("is_mandatory");

  return (
    <DashboardLayout bgColor="white">
      <Box pt={2} maxW="xl" mx="auto">
        <form onSubmit={onSubmit}>
          <Card id="info">
            <Heading fontSize="lg" mb={4} fontWeight="500">
              Edit Vaccine
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
              isInvalid={Boolean(errors.no_of_doses)}
              isRequired
            >
              <FormLabel>No of does</FormLabel>
              <Input
                type="number"
                borderColor="gray.300"
                {...register("no_of_doses", {
                  required: "Please enter no of does",
                })}
              />
            </FormControl>

            <FormControl
              mb={4}
              id="is_mandatory"
              isInvalid={Boolean(errors.is_mandatory)}
            >
              <FormLabel>Is Mandatory</FormLabel>
              <Switch
                isChecked={is_mandatory}
                size="sm"
                {...register("is_mandatory", { required: false })}
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
              {vaccine && vaccine.image_link ? (
                <img
                  alt="vaccine"
                  className="profile-user-img img-fluid"
                  style={{
                    cursor: "pointer",
                    height: "auto",
                    minHeight: "150px",
                    width: "100%",
                    border: "2px solid #ddd",
                    objectFit: "cover",
                  }}
                  src={vaccine.image_link}
                />
              ) : (
                <Box>
                  <Heading fontSize="md">Add the Images</Heading>
                  <Text>or click to add</Text>
                </Box>
              )}
            </Flex>
          </Card>

          <Text color="red.700" fontSize="sm">
            {editError && editError}
          </Text>

          <Flex justify="flex-end">
            <Button
              type="submit"
              isLoading={editing}
              isDisabled={!isDirty}
              mx={2}
              colorScheme="blue"
              variant="solid"
              mb={8}
            >
              Edit Vaccine
            </Button>
          </Flex>
        </form>
      </Box>
    </DashboardLayout>
  );
}
