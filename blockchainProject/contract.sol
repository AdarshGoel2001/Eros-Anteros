// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract Minter is ERC721URIStorage{

    uint tokenCount ;
    string URI ;

    constructor(string memory name, string memory symbol, string memory uree) ERC721(name, symbol){
        URI=uree;

}

function mint (address _to, uint amount) external returns (uint256){
    tokenCount++;
    for (uint i=0; i< amount; i++){
    _safeMint(_to, tokenCount);
    _setTokenURI(tokenCount, URI);
    // token increment  
    tokenCount++;
    }

    return (tokenCount);
}

function uri () public view returns (string memory){
    return(URI);
}

function transfer (address _to, uint tokenID) public {

    _transfer (msg.sender, _to, tokenID );
}


}