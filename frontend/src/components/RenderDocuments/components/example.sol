pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20Metadata.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract DecentralizedExchange {
    using SafeMath for uint256;

    // Token information
    address public tokenAddress;
    uint256 public tokenDecimals;
    uint256 public tokenBalance;

    // Swapping order structure
    struct SwapOrder {
        address sender;
        uint256 amountIn;
        uint256 amountOut;
    }

    // Array to store swap orders
    SwapOrder[] public swapOrders;

    // Mapping to track the user's deposited token balance
    mapping(address => uint256) public userBalances;

    // Constructor
    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
        tokenDecimals = IERC20Metadata(_tokenAddress).decimals();
    }

    // Function to deposit tokens to the DEX

    function depositTokens(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(IERC20(tokenAddress).balanceOf(msg.sender) >= amount, "Amount must equal or be greater than senders balance");
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount);
        userBalances[msg.sender] = userBalances[msg.sender].add(amount);
        tokenBalance = tokenBalance.add(amount);
    }

    // Function to create a swap order
    function createSwapOrder(uint256 amountIn, uint256 amountOut) external {
        require(amountIn > 0 && amountOut > 0, "Invalid amounts");
        require(amountIn <= userBalances[msg.sender], "Insufficient balance");
        userBalances[msg.sender] = userBalances[msg.sender].sub(amountIn);
        swapOrders.push(SwapOrder(msg.sender, amountIn, amountOut));
    }

    // Function to execute a swap order
    function executeSwap(uint256 orderIndex) external {
        require(orderIndex < swapOrders.length, "Invalid order index");
        SwapOrder memory order = swapOrders[orderIndex];
        require(userBalances[msg.sender] >= order.amountOut, "Insufficient balance for swap");

        // Perform the token swap
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), order.amountOut);
        IERC20(tokenAddress).transfer(order.sender, order.amountIn);

        // Update user balances and token balance
        userBalances[msg.sender] = userBalances[msg.sender].sub(order.amountOut);
        userBalances[order.sender] = userBalances[order.sender].add(order.amountIn);
        tokenBalance = tokenBalance.add(order.amountOut).sub(order.amountIn);

        // Remove the executed order from the array
        if (orderIndex < swapOrders.length - 1) {
            swapOrders[orderIndex] = swapOrders[swapOrders.length - 1];
        }
        swapOrders.pop();
    }
}