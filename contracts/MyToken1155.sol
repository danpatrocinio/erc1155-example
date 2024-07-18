// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MyToken1155 is ERC1155 {

    uint256 public constant BTC = 0;
    uint256 public constant GOLD = 1;
    uint256 public constant SILVER = 2;

    constructor() ERC1155("https://game.example/api/item/{id}.json") {
        mint(msg.sender, BTC, 10**18, "");
        mint(msg.sender, GOLD, 10**27, "");
        mint(msg.sender, SILVER, 1000, "");
    }

    function mint(address to, uint256 id, uint256 amount, bytes memory data) public {
        _mint(to, id, amount, data);
    }
    
    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public {
        _mintBatch(to, ids, amounts, data);
    }

    function burn(address account, uint256 id, uint256 amount) public {
        _burn(account, id, amount);
    }

    function burnBatch(address account, uint256[] memory ids, uint256[] memory amounts) public {
        _burnBatch(account, ids, amounts);
    }
}