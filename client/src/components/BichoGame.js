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

  useEffect(() => {
    const getPlayers = async () => {
      // const players = await contract.methods.getPlayers().call()
      const amount = await contract.methods.getContractBalance().call()
      setPlayers(players)
      setAmount(amount)
      console.log(amount)
    }
    getPlayers()
  }, [])

  const handleParticipate = async () => {
    try {
      await web3.eth.sendTransaction({
        from: account,
        to: deployedNetwork && deployedNetwork.address,
        value: 1000000000000000000,
      })
      // const players = await contract.methods.getPlayers().call()
      const amount = await contract.methods.getContractBalance().call()
      setAmount(amount)
      setPlayers(players)
    } catch (err) {
      alert('error on participating!')
    }
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
        {players.find((player) => player == account) ? (
          'Participating!'
        ) : (
          <Button onClick={handleParticipate}>Participar</Button>
        )}
      </Box>
      <Box mt={3}>Pote total: {amount}</Box>
      <Button onClick={pickWinner}>Sortear</Button>
      {/* {players.length > 1 && } */}
      <Box mt={8}>
        <Heading size='md' as='h5'>
          Jogadores:
        </Heading>
        {players && players.map((player) => <p key={player}>{player}</p>)}
      </Box>
    </Box>
  )
}
