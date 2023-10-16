pragma solidity >=0.4.22 <0.9.0;

contract addNumber {
    uint256 public number;

    function add(uint256 _number) public {
        number += _number;
    }

    function subtract(uint256 _number) public {
        number -= _number;
    }

    function getNumber() public view returns (uint256) {
        return number;
    }
}
