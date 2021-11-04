import React, { useEffect, useState } from 'react'
import { Heading, Button, Box } from '@chakra-ui/react'

export default function BichoGame({
  web3,
  contract,
  account,
  deployedNetwork,
}) {
  const [players, setPlayers] = useState([])
  const [amount, setAmount] = useState(0)
  const [animals, setAnimals] = useState([])

  useEffect(() => {
    const getPlayers = async () => {
      const players = await contract.methods.getPlayers().call()
      const amount = await contract.methods.getContractBalance().call()
      setPlayers(players)
      setAmount(amount)
    }
    getPlayers()
  }, [])

  const handleParticipate = async () => {
    try {
      // await web3.eth.sendTransaction({
      //   from: account,
      //   to: deployedNetwork && deployedNetwork.address,
      //   value: 1000000000000000000,
      // })
      await contract.methods.participate(1).send({ from: account, value: 4300000000000000000 })
      const amount = await contract.methods.getContractBalance().call()
      const players = await contract.methods.getPlayers().call()
      setAmount(amount)
      setAnimals(players.map(p => p[1]))
      setPlayers(players)
    } catch (err) {
      alert('error on participating!')
    }
  }

  const showPlayers = async () => {
    const players = await contract.methods.getPlayers().call()
    console.log(players)
    setAnimals(players.map(p => p[1]))
    console.log(!!players.map(p => p[0]).find(p => p == account))
  }

  const pickWinner = async () => {
    try {
      const random = await contract.methods.pickWinner().send({ from: account })
      console.log(random)
    } catch (err) {
      // alert('error on random')
      console.log(err)
    }
  }

  return (
    <Box>
      <Heading>Jogo#01</Heading>
      <Box mt={3}>
        {!!players.map(p => p[0]).find(p => p == account) ? (
          'Participating!'
        ) : (
          <Button onClick={handleParticipate}>Participar</Button>
        )}
      </Box>
      <Button onClick={showPlayers}>Jogadores</Button>
      <Box mt={3}>Pote total: {amount}</Box>
      <Button onClick={pickWinner}>Sortear</Button>
      {/* {players.length > 1 && } */}
      <Box mt={8}>
        <Heading size='md' as='h5'>
          Jogadores:
        </Heading>
        {players && players.map((player) => <p key={player}>{player}</p>)}
      </Box>
        {animals && animals.map((animal) => <p key={animal}> - {animal}</p>)}

    </Box>
  )
}
