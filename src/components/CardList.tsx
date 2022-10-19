import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';
import { Flex, Grid, Spacer } from '@chakra-ui/react'
interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { onOpen, isOpen, onClose } = useDisclosure();
  
  
  // TODO SELECTED IMAGE URL STATE
  const [ selectedImage, setSelectedImage ] = useState('');

  const openImage = (url) => {
    setSelectedImage(url);
    onOpen()
  }
  // TODO FUNCTION HANDLE VIEW IMAGE

  return (
    <>
      <SimpleGrid templateColumns='repeat(3, 1fr)' gap='40px'>
        {
          cards.map((card) => {
            return <Card data={card} viewImage={openImage} key={card.ts}></Card>;
          })
        }
      </SimpleGrid>

      {/* TODO MODALVIEWIMAGE */}
      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={selectedImage}/>
    </>
  );
}
