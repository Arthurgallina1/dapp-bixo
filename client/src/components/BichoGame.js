import React, { useEffect, useState } from 'react'

export default function BichoGame({ web3, contract, account }) {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    const getPlayers = async () => {
      const players = await contract.methods.getPlayers().call()
      setPlayers(players)
      console.log(players)
    }
    getPlayers()
  }, [])

  const handleParticipate = async () => {
    try {
      await web3.eth.sendTransaction({
        from: account,
        to: '0x09350e674dE062b3efA48fE4db0D81589b027942',
        value: 10500,
      })
      const players = await contract.methods.getPlayers().call()
      console.log('players', players)
      setPlayers(players)
    } catch (err) {
      alert('error on participating')
    }
  }

  return (
    <div>
      <h1>Jogo do bicho #01</h1>
      <div>
        {players.find((player) => player == account) ? 'Participating' : <button onClick={handleParticipate}>Participar</button>}
      </div>
      <div>
        <h3>Jogadores:</h3>
        {players && players.map((player) => <p>{player}</p>)}
      </div>
    </div>
  )
}
