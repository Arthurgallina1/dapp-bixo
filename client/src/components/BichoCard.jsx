import React from 'react'
import { Image, Box, Heading } from '@chakra-ui/react'

export default function BichoCard({
  id,
  name,
  src,
  numbers,
  selected,
  onClick,
}) {
  return (
    <Box
      backgroundColor={selected ? 'red.500' : 'white'}
      onClick={() => onClick(id)}
    >
      <Box maxW='150px' shadow='md'>
        <Image
          src='https://bit.ly/sage-adebayo'
          alt='Segun Adebayo'
          boxSize='150px'
        />
        <Heading as='h4'>{name}</Heading>
      </Box>
    </Box>
  )
}
