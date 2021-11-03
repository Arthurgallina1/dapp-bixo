import React, { useState, useEffect } from 'react'
import { Heading, Container as Div } from '@chakra-ui/react'
import BichoGameContract from '../contracts/BichoGameV2.json'
import getWeb3 from '../getWeb3'
import BichoGame from './BichoGame'

export default function Container() {
  const [web3, setWeb3] = useState()
  const [accounts, setAccounts] = useState([])
  const [contract, setContract] = useState()
  const [deployedNetwork, setDeployedNetwork] = useState()

  useEffect(() => {
    const runWeb3 = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3()
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts()
        console.log(accounts)

        // Get the contract instance.
        const networkId = await web3.eth.net.getId()
        const deployedNetwork = BichoGameContract.networks[networkId]
        const instance = new web3.eth.Contract(
          BichoGameContract.abi,
          deployedNetwork && deployedNetwork.address,
        )
        //      deployedNetwork && deployedNetwork.address,

        setWeb3(web3)
        setAccounts(accounts)
        setContract(instance)
        setDeployedNetwork(deployedNetwork)
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        )
        console.error(error)
      }
    }

    runWeb3()
  }, [])

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>
  }
  return (
    <Div mt={12}>
      <Heading>Address</Heading>
      {accounts[0]}
      <Div px={0} mx={0} mt={12}>
        {contract && (
          <BichoGame
            contract={contract}
            web3={web3}
            account={accounts[0]}
            deployedNetwork={deployedNetwork}
          />
        )}
      </Div>
    </Div>
  )
}
