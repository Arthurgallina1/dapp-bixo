const BichoGame = artifacts.require('../contracts/BichoGame.sol')

contract('BichoGame', async (accounts) => {
  it('should start with 0 balance and deploy successfuly', async () => {
    let bicho = await BichoGame.deployed()
    let balance = await bicho.getContractBalance()
    assert.equal(balance, 0)
    const address = bicho.address
    assert.notEqual(address, '')
    assert.notEqual(address, 0x0)
    assert.notEqual(address, undefined)
    assert.notEqual(address, null)
  })
})
