import React, { useEffect, useState } from 'react'

export default function BichoGame({ web3, contract, account, deployedNetwork }) {
  const [players, setPlayers] = useState([])
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    const getPlayers = async () => {
      const players = await contract.methods.getPlayers().call()
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
      const players = await contract.methods.getPlayers().call()
      const amount = await contract.methods.getContractBalance().call()
      setAmount(amount)
      setPlayers(players)
    } catch (err) {
      alert('error on participating!')
    }
  }

  const pickPlayers = async () => {
    try {
       
        const players = await contract.methods.getPlayers().call()
        const amount = await contract.methods.getContractBalance().call()

        console.log(players, amount)
      } catch (err) {
        alert('error on random')
      }
  }


  const pickWinner = async () => {
    try {
       
        const random = await contract.methods.pickWinner().send({ from: account })
        console.log(random)
      } catch (err) {
        alert('error on random')
        console.log(err)
      }
  }


  return (
    <div>
      <h1>Jogo#01</h1>
      <div>
        {players.find((player) => player == account) ? 'Participating!' : <button onClick={handleParticipate}>Participar</button>}
      </div>
      <div>
          Pote total: {amount}
      </div>
      <button onClick={pickWinner}>Ganhador</button>
      <button onClick={pickPlayers}>Jogadores</button>
      <div>
        <h3>Jogadores:</h3>
        {players && players.map((player) => <p>{player}</p>)}
      </div>
    </div>
  )
}
