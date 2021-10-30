import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import BichoGameContract from "./contracts/BichoGame.json";
import getWeb3 from "./getWeb3";
import BichoGame from "./components/BichoGame";


class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = BichoGameContract.networks[networkId];
      const instance = new web3.eth.Contract(
        BichoGameContract.abi,
        '0x09350e674dE062b3efA48fE4db0D81589b027942',
      );

      console.log('instance', instance)



      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract, web3 } = this.state;
    console.debug('accounts', accounts)

    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // const players = await contract.methods.players(3).call()

    // console.log(players)
    // console.log(response)
    // let send = await web3.eth.sendTransaction({ from: accounts[0], to:'0x09350e674dE062b3efA48fE4db0D81589b027942' , value: 7770 });

    const response = await contract.methods.getContractBalance().call()
    const players = await contract.methods.getPlayers().call()

    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        {this.state.accounts[0]}
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
        <BichoGame contract={this.state.contract} web3={this.state.web3} account={this.state.accounts[0]} />
      </div>
    );
  }
}

export default App;
