/*

  Copyright 2019 ZeroEx Intl.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.

*/

pragma solidity 0.5.10;

import "ROOT/0x/utils/contracts/src/interfaces/IOwnable.sol";
import "ROOT/0x/utils/contracts/src/LibOwnableRichErrors.sol";
import "ROOT/0x/utils/contracts/src/LibRichErrors.sol";


contract Ownable is
    IOwnable
{
    address public owner;

    constructor ()
        public
    {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        _assertSenderIsOwner();
        _;
    }

    function transferOwnership(address newOwner)
        public
        onlyOwner
    {
        if (newOwner == address(0)) {
            revert("TransferOwnerToZeroError");
            //LibRichErrors.rrevert(LibOwnableRichErrors.TransferOwnerToZeroError());
        } else {
            owner = newOwner;
            emit OwnershipTransferred(msg.sender, newOwner);
        }
    }

    function _assertSenderIsOwner()
        internal
        view
    {
        if (msg.sender != owner) {
            revert("OnlyOwnerError");
            //LibRichErrors.rrevert(LibOwnableRichErrors.OnlyOwnerError(
            //    msg.sender,
            //    owner
            //));
        }
    }
}
