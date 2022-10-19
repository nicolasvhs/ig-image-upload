import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    // <ModalOverlay>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w='900px'>
          <ModalBody>
            {/* <Box w="100%" h="32px" /> */}
              <Image src={imgUrl} alt="image"/>
            {/* </Box> */}
          </ModalBody>
          <ModalFooter>
            <Link to={imgUrl}>Abrir Original</Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    // </ModalOverlay>
  );
  
}
