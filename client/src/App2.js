import React, { useEffect, useState } from 'react'
import BichoGame from './components/BichoGame';
import BichoGameContract from "./contracts/BichoGame.json";
import getWeb3 from './getWeb3'

export default function App2() {
  const [web3, setWeb3] = useState()
  const [accounts, setAccounts] = useState([])
  const [contract, setContract] = useState()
  const [storageValue, setStorageValue] = useState(0)

  useEffect(() => {
    const runWeb3 = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3()
      
            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts()
      
            // Get the contract instance.
            const networkId = await web3.eth.net.getId()
            const deployedNetwork = BichoGameContract.networks[networkId]
            const instance = new web3.eth.Contract(
              BichoGameContract.abi,
              '0x09350e674dE062b3efA48fE4db0D81589b027942',
            )

            console.log(instance)
      
            setWeb3(web3)
            setAccounts(accounts)
            setContract(instance)

            const response = await instance.methods.getContractBalance().call()
            setStorageValue(response)

      
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
      <h1>Good to Go!</h1>
      {accounts[0]}
      <p>Your Truffle Box is installed and ready.</p>
      <h2>Smart Contract Example</h2>
      <p>
        If your contracts compiled and migrated successfully, below will show a
        stored value of 5 (by default).
      </p>
      <p>
        Try changing the value stored on <strong>line 42</strong> of App.js.
      </p>
      <div>The stored value is: {storageValue}</div>
      {contract && <BichoGame contract={contract} web3={web3} account={accounts[0]} />}
    </div>
  )
}
