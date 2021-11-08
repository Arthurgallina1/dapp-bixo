const { assert } = require('chai');

const Color = artifacts.require('Color.sol')

require('chai').use(require('chai-as-promised'))
.should()

contract('Color', (accounts) => {
    let contract
    before(async () => {
        contract = await Color.deployed()

    })

    describe('Deployment', () => {
        
        it('It deploys succesfully', async () => {
            const address = contract.address
            assert.notEqual(address, '')
            assert.notEqual(address, 0x0)
            assert.notEqual(address, undefined)
            assert.notEqual(address, null)
        })

        it('has a name', async () => {
            const name = await contract.name()
            const symbol = await contract.symbol()
            assert.equal(name, 'Color')
            assert.equal(symbol, 'COLOR')
        })
    })

    describe('minting', async () => {

        it('creates a new token', async () => {
            const result = await contract.mint('#EC058E')
            const totalSupply = await contract.totalSupply();

            assert.equal(totalSupply, 1)
            // console.log(result)
            const event = result.logs[0].args
            assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
            assert.equal(event.to, accounts[0], 'to is correct')

            await contract.mint('#EC058E').should.be.rejected;

        })
    })

    describe('indexing', async () => {
        it('list colors', async () => {
            //mint 3 more tokens and 
            await contract.mint('#FFFFFF')
            await contract.mint('#FA0152')
            await contract.mint('#FFF3A0')
            const totalSupply = await contract.totalSupply();

            let color
            let result = []

            for(let i = 1; i <= totalSupply; i++) {
                color = await contract.colors(i - 1)
                result.push(color)
            }

            let expected = ['#EC058E', '#FFFFFF', '#FA0152', '#FFF3A0']
            assert.equal(result.join(','), expected.join(','))
        })
    })
    
})