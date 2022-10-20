import { Flex } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";
import DeleteModal from "./DeleteModal";
import VaccineCard from "./VaccineCard";
import { useAppDispatch, useAppSelector } from "../store/hook";

function VaccineList() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const { vaccines } = useAppSelector((state) => state.vaccine);

  const handleDelete = (vaccineId: number) => {
    // dispatch(deleteVaccine(vaccineId));
  };

  return (
    <Flex
      border="1px solid gray.400"
      borderRadius="10px"
      p={2}
      direction="column"
      maxW="4xl"
      mx="auto"
    >
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={handleDelete}
      />
      {vaccines.map((vaccine, index) => {
        return <VaccineCard key={index} vaccine={vaccine} onOpen={onOpen} />;
      })}
    </Flex>
  );
}

export default VaccineList;
