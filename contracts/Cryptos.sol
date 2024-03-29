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

contract CryptosICO is Cryptos {
    address public admin;
    address payable public deposit; //ether will be transfered to this address to have a safer method
    uint256 tokenPrice = 0.001 ether; // 1 ETH = 1000 CRPT, 1 CRPT = 0.001ETH
    uint256 public hardCap = 300 ether; //max amount that can be invested
    uint256 public raisedAmount;
    uint256 public saleStart = block.timestamp; //to add one hour from deployment: block.timestamp + 3600
    uint256 public saleEnd = block.timestamp + 604800; //ico ends in one week
    uint256 public tokenTradeStart = saleEnd + 604800; //tokens locked so early investors can't dump it
    uint256 public maxInvestment = 5 ether;
    uint256 public minInvestment = 0.1 ether;
    enum State {
        beforeStart,
        running,
        afterEnd,
        halted
    }
    State public icoState;

    constructor(address payable _deposit) {
        admin = msg.sender;
        deposit = _deposit;
        icoState = State.beforeStart;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "not allowed");
        _;
    }

    function halt() public onlyAdmin {
        icoState = State.halted;
    }

    function resume() public onlyAdmin {
        icoState = State.running;
    }

    function changeDepositAddress(address payable _deposit) public onlyAdmin {
        deposit = _deposit;
    }

    function getCurrentState() public view returns (State) {
        return icoState;
        // if(icoState == State.halted) {
        //     return State.halted;
        // } else if( block.timestamp < saleStart) {
        // return State.beforeStart;
        // } else if (block.timestamp >= saleStart && block.timestamp <= saleEnd) {
        // return State.running;
        // } else {
        // return State.afterEnd;
        // }
    }

    event Invest(address invester, uint256 value, uint256 tokens);

    //called when received ether by receive()
    function invest() public payable returns (bool) {
        icoState = getCurrentState();
        require(icoState == State.running, "Ico not running");
        require(msg.value >= minInvestment && msg.value <= maxInvestment);
        raisedAmount += msg.value;
        require(raisedAmount <= hardCap);

        uint256 tokens = msg.value / tokenPrice;

        balances[msg.sender] += tokens;
        balances[founder] -= tokens;

        deposit.transfer(msg.value);
        emit Invest(msg.sender, msg.value, tokens);

        return true;
    }

    receive() external payable {
        invest();
    }

    function transfer(address to, uint256 tokens)
        public
        override
        returns (bool success)
    {
        require(block.timestamp > tokenTradeStart, "not allowed to sell yet");
        Cryptos.transfer(to, tokens);
        //super.transfer(to, tokens <- same things
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokens
    ) public override returns (bool success) {
        require(block.timestamp > tokenTradeStart, "not allowed to sell yet");
        Cryptos.transfer(to, tokens);
        return true;
    }

    //anyone can burn the remaining tokens
    function burn() public returns (bool) {
        icoState = getCurrentState();
        require(icoState == State.afterEnd, "ico still running");
        balances[founder] = 0;
        return true;
    }
}
