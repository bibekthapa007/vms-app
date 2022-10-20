import { useState } from "react";
import { IconButton } from "@chakra-ui/button";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { Tooltip } from "@chakra-ui/tooltip";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import Link from "../components/Link";

import paths from "../paths";
import { Vaccine } from "../types/vaccine";

type VaccineCardProps = {
  onOpen: (e: any) => void;
  vaccine: Vaccine;
};

function VaccineCard({ onOpen, vaccine }: VaccineCardProps) {
  const [isMandatory, setMandatory] = useState(false);
  return (
    <Link
      passHref
      to={paths.updateVaccine(vaccine.id)}
      borderBottom="1px solid"
      borderColor="gray.200"
      _hover={{ bg: "gray.50" }}
    >
      <Box display="flex" borderRadius={10} p={[0, 2, 4]} my={[4, 4]}>
        <Image
          objectFit="contain"
          width={["120px", "120px", "200px"]}
          height="100%"
          src="https://images.unsplash.com/photo-1608326389386-0305acbe600f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=455&q=80"
          alt="Vaccine Title"
        />
        <Stack flexGrow="1" ml={[3, 4]}>
          <Flex display={["block", "flex"]} justify="space-between">
            <Flex direction="column">
              <Heading fontSize={["md", "lg"]}>{vaccine.name}</Heading>
            </Flex>

            <Flex>
              <Tooltip label="Mark Mandatory" aria-label="Favorite Ads">
                <IconButton
                  ml={1}
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    return setMandatory((mandatory) => !mandatory);
                  }}
                  aria-label="Mandatory"
                  icon={
                    isMandatory ? (
                      <MdFavorite color="red" />
                    ) : (
                      <MdFavoriteBorder />
                    )
                  }
                />
              </Tooltip>
              <Tooltip label="Update the Vaccine" aria-label="Edit Ad">
                <Link to={paths.updateVaccine(vaccine.id)}>
                  <IconButton
                    size="sm"
                    ml={1}
                    aria-label="Edit Vaccine"
                    icon={<FiEdit />}
                  />
                </Link>
              </Tooltip>
              <Tooltip label="Delete the Vaccine" aria-label="Delete Ad">
                <IconButton
                  ml={1}
                  size="sm"
                  aria-label="Delete"
                  onClick={(e) => {
                    e.preventDefault();
                    return onOpen(e);
                  }}
                  icon={<AiOutlineDelete />}
                />
              </Tooltip>
            </Flex>
          </Flex>
          <Text display={["none", "none", "block"]}>{vaccine.description}</Text>
          <Flex justify="space-between">
            {/* <Text fontSize={["sm", "md"]}>9 days ago</Text> */}
          </Flex>
        </Stack>
      </Box>
    </Link>
  );
}

export default VaccineCard;
