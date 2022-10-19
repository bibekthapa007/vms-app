import { Flex } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";
import DeleteModal from "./DeleteModal";
import VaccineCard from "./VaccineCard";

type VaccineListProps = {};

function VaccineList({}: VaccineListProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      border="1px solid gray.400"
      borderRadius="10px"
      p={2}
      direction="column"
      maxW="4xl"
      mx="auto"
    >
      <DeleteModal isOpen={isOpen} onClose={onClose} />
      {Array(10)
        .fill(10)
        .map((item, index) => {
          return <VaccineCard key={index} onOpen={onOpen} />;
        })}
    </Flex>
  );
}

export default VaccineList;
