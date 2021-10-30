import React, { useEffect, useState } from 'react'
import BichoGame from './components/BichoGame'
import BichoGameContract from './contracts/BichoGame.json'
import getWeb3 from './getWeb3'

const mockAccs = [
  '0x6e900a494695540490986128Ea0eCAD2E9F00564',
  '0xad26C0574235f05545Ec6fF300Bd6331adfd76Fe',
  '0x22c00C435a28169A9EA1702eaF7Be6fe4A1f5B53',
  '0x3C4ab60a52A28f8078E349C1253f0e30488530c4',
  '0x89A58E321f772f0CeeC9Aa0C3424d1A8f5149a5a',
  '0x7814A4e6e5Db769861862f55090E7E7702Ee25C9',
  '0x6ba7ceF0269BaC182259256d393C6C06e0Ae71B8',
  '0x3613Bc32eE377bdc1E19414498769bb3266f7485',
  '0x0c068F4f2cB1aCb225023A8D151A9040558e12A8',
  '0xf9e55C01C954a9F5484Ae8FE9A62Cfed536ADE08',
]

export default function App2() {
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
    <div className='App'>
      <h3>Address</h3>
      {accounts[0]}
      {contract && (
        <BichoGame
          contract={contract}
          web3={web3}
          account={accounts[0]}
          deployedNetwork={deployedNetwork}
        />
      )}
    </div>
  )
}
