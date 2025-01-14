import Web3 from "web3";
import { AbiItem } from "web3-utils";

export default function MTGYAtomicSwap(web3: Web3, contractAddy: string) {
  return new web3.eth.Contract(atomicSwapAbi, contractAddy);
}

const atomicSwapAbi: AbiItem[] = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newCost",
        type: "uint256",
      },
    ],
    name: "changeMtgyServiceCost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddy",
        type: "address",
      },
    ],
    name: "changeMtgyTokenAddy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_oracleAddress",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_changeAll",
        type: "bool",
      },
    ],
    name: "changeOracleAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_spendAddress",
        type: "address",
      },
    ],
    name: "changeSpendAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddy",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxSwapAmount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_targetNetwork",
        type: "string",
      },
      {
        internalType: "address",
        name: "_targetContract",
        type: "address",
      },
    ],
    name: "createNewAtomicSwapContract",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_mtgyAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_mtgySpendAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_oracleAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_createdBlockTimestamp",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_sourceContract",
        type: "address",
      },
      {
        internalType: "address",
        name: "_targetContract",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_isActive",
        type: "bool",
      },
    ],
    name: "updateSwapContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "updateSwapCreationGasLoadAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "creator",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllSwapContracts",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "address",
            name: "sourceContract",
            type: "address",
          },
          {
            internalType: "string",
            name: "targetNetwork",
            type: "string",
          },
          {
            internalType: "address",
            name: "targetContract",
            type: "address",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
        ],
        internalType: "struct MTGYAtomicSwap.TargetSwapInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_addy",
        type: "address",
      },
    ],
    name: "getLastCreatedContract",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "index",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "address",
            name: "sourceContract",
            type: "address",
          },
          {
            internalType: "string",
            name: "targetNetwork",
            type: "string",
          },
          {
            internalType: "address",
            name: "targetContract",
            type: "address",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
        ],
        internalType: "struct MTGYAtomicSwap.TargetSwapInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mtgyServiceCost",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "oracleAddress",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "swapCreationGasLoadAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "targetSwapContracts",
    outputs: [
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "address",
        name: "sourceContract",
        type: "address",
      },
      {
        internalType: "string",
        name: "targetNetwork",
        type: "string",
      },
      {
        internalType: "address",
        name: "targetContract",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "targetSwapContractsIndexed",
    outputs: [
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "address",
        name: "sourceContract",
        type: "address",
      },
      {
        internalType: "string",
        name: "targetNetwork",
        type: "string",
      },
      {
        internalType: "address",
        name: "targetContract",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
