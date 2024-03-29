// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

// Deployed at https://explorer.fuse.io/address/0x98Df5d96E4CB402982198507D15E6C2A76EE5a3d

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC20/ERC20.sol";

contract degenHackIoToken is ERC20 {
    constructor() ERC20("degenHackIoToken", "DHIO") {
        // Mint 100 tokens to msg.sender
        // Similar to how
        // 1 dollar = 100 cents
        // 1 token = 1 * (10 ** decimals)
        _mint(msg.sender, 100 * 10 ** uint(decimals()));
    }
}
