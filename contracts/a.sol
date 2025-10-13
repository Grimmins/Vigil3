// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

error RevertIt();

contract Example {
  function reverts() external pure {
    revert RevertIt();
  }
}