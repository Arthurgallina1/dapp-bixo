// SPDX-License-Identifier: MIT
pragma solidity >=0.7.1 <0.9.0;

interface ERC20Interface {
    function totalSupply() external view returns (uint256);

    function balanceOf(address owner) external view returns (uint256);

    function transfer(address to, uint256 value) external returns (bool);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function approve(address spender, uint256 value) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

contract Cryptos is ERC20Interface {
    string public name = "Cryptos";
    string public symbol = "CRPT";
    uint256 public decimals = 0; //18 is the most used but 0 to keep simple
    uint256 public override totalSupply; //obrigatorio por isso override

    address public founder;
    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) allowed;

    constructor() {
        totalSupply = 1000000;
        founder = msg.sender;
        balances[founder] = totalSupply;
    }

    function balanceOf(address tokenOwner)
        public
        view
        override
        returns (uint256 balance)
    {
        return balances[tokenOwner];
    }

    function transfer(address to, uint256 tokens)
        public
        override
        returns (bool success)
    {
        require(balances[msg.sender] >= tokens, "not enough tokens");
        balances[to] += tokens;
        balances[msg.sender] -= tokens;

        emit Transfer(msg.sender, to, tokens);

        return true;
    }

    function allowance(address tokenOwner, address spender)
        public
        view
        override
        returns (uint256)
    {
        return allowed[tokenOwner][spender];
    }

    function approve(address spender, uint256 tokens)
        public
        override
        returns (bool success)
    {
        require(balances[msg.sender] > tokens);
        require(tokens > 0);

        allowed[msg.sender][spender] = tokens;

        emit Approval(msg.sender, spender, tokens);

        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokens
    ) public override returns (bool success) {
        require(allowed[from][to] >= tokens);
        require(balances[from] >= tokens);

        balances[from] -= tokens;
        balances[to] += tokens;

        allowed[from][to] -= tokens;

        return true;
    }
}
