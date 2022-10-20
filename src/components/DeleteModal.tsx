import { Button } from "@chakra-ui/button";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";

type DeleteModalProps = {
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
  handleDelete: (vaccine_id: number) => void;
};

function DeleteModal({
  isOpen,
  onOpen,
  onClose,
  handleDelete,
}: DeleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete the Vaccine Tiltle</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure? You can't undo this action afterwards.
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="red"
            mr={3}
            onClick={(e) => {
              e.preventDefault();
              // handleDelete(vaccineId);
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteModal;
