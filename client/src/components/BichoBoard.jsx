import React from 'react'
import { Box } from '@chakra-ui/react'
import BichoCard from './BichoCard'

const BICHOS = [
  {
    id: 1,
    name: 'Burro',
    numbers: [1, 2, 3, 4],
  },
  {
    id: 2,
    name: 'Elefante',
    numbers: [6, 7, 8, 10],
  },
  {
    id: 3,
    name: 'Gado',
    numbers: [5, 10, 33, 6],
  },
]

export default function BichoBoard({ handleCardClick, selectedCard }) {
  return (
    <Box border='1px solid red'>
      {BICHOS.map((bicho) => (
        <BichoCard
          key={bicho.id}
          name={bicho.name}
          id={bicho.id}
          nunbers={bicho.numbers}
          onClick={handleCardClick}
          selected={selectedCard === bicho.id}
        />
      ))}
    </Box>
  )
}
