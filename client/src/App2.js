import React  from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Container from './components/Container.jsx'

export default function App2() {
  return (
    <ChakraProvider>
        <Container />
    </ChakraProvider>
  )
}
