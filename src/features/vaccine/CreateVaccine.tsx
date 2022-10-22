import { useState } from "react";
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
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { createVaccine } from "./VaccineSlice";
import { VaccineForm, VaccineResponse } from "../../types/vaccine";
import { checkFileSize, checkMimeType, maxSelectFile } from "../../utils/image";
import { Switch } from "@chakra-ui/react";

export default function CreateVaccinePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { creating, createError } = useAppSelector((state) => state.vaccine);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<VaccineForm>();

  const is_mandatory = watch("is_mandatory");
  const userFiles = watch("userFiles");
  const file = userFiles && userFiles[0];

  const onSubmit = handleSubmit((data) => {
    dispatch(createVaccine(data)).then((data) => {
      let payload = data.payload as VaccineResponse;
      let requestStatus = data.meta.requestStatus as string;
      if (requestStatus === "fulfilled") {
        let id = payload.vaccine.id;
        if (id) {
          navigate(`/vaccine/edit/${id}`);
        }
      }
    });
  });

  const fileChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      if (
        maxSelectFile(event) &&
        checkMimeType(event) &&
        checkFileSize(event)
      ) {
      }
    }
  };
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

            <Input
              borderColor="gray.300"
              type="file"
              accept={"image/*"}
              id="userFiles"
              {...register("userFiles", {
                required: false,
              })}
            />
            {/* <input
              type="file"
              id="userFiles"
              {...register("userFiles", {
                required: false,
              })}
              // onChange={fileChangedHandler}
              name="userFiles"
              style={{ display: "none" }}
            /> */}

            <Flex
              align="center"
              direction="column"
              p={[4, 16]}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="8px"
              onClick={() => {
                let element = document.getElementById("userFiles");
                element && element.click();
              }}
            >
              {file ? (
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
                  src={URL.createObjectURL(file)}
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
            {createError && createError}
          </Text>

          <Flex justify="flex-end">
            <Button
              type="submit"
              isLoading={creating}
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
