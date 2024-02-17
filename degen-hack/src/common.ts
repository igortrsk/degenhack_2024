import { FuseSDK } from "@fuseio/fusebox-web-sdk";
import { ethers } from "ethers";
import { API_KEY } from "./env";

export async function getTokenData() {
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  // MetaMask requires requesting permission to connect users accounts
  await provider.send("eth_requestAccounts", []);

  // The MetaMask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, you need the account signer...
  const signer = provider.getSigner();

  const abiTokenContract = [
    "function name() public view returns (string)",
    "function symbol() public view returns (string)",
    "function decimals() public view returns (uint8)",
    "function totalSupply() public view returns (uint256)",
    "function balanceOf(address account) public view returns (uint256)",
    "function approve(address _spender, uint256 _value) public returns (bool success)",
  ];

  const abiVaultContract = [
    "function deposit(uint _amount) public",
    "function withdraw(uint _shares) public",
  ];

  const tokenContract = new ethers.Contract(
    "0x98Df5d96E4CB402982198507D15E6C2A76EE5a3d",
    abiTokenContract,
    signer
  );

  const vaultContract = new ethers.Contract(
    "0xC0b7Ac0586BA2aaA4355d3Be27848571dA7af7c0",
    abiVaultContract,
    provider
  );

  const name = await tokenContract.name();
  const symbol = await tokenContract.symbol();
  const decimals = await tokenContract.decimals();
  const totalSupply = await tokenContract.totalSupply();
  const balanceOfO = await tokenContract.balanceOf(
    "0x5dCcCAAd516D68E01823AfF6E75dE8bE73fb57bC"
  );

  console.log(
    `${symbol} (${name}) total supply is ${ethers.utils.formatUnits(
      totalSupply,
      decimals
    )}`
  );
  console.log(`O: ${ethers.utils.formatUnits(balanceOfO, decimals)}`);

  // TODO: Get approval
  const vaultContractWithSigner = vaultContract.connect(signer);
  const deposit = await vaultContractWithSigner.deposit(0);
  console.log(deposit);
}

export async function sendTx(addr: string, msg: string) {
  console.log("sendTestTx...");

  //   const privateKey =
  // process.env.PRIVATE_KEY ??
  // (() => {
  //   const pk = generatePrivateKey();
  //   console.log(pk);
  //   return pk;
  // })();

  const apiKey = API_KEY;

  // FIXME:
  const credentials = new ethers.Wallet(
    "b7e3bd038939e922525a206d1273a139239362915431c95c8440c3aa3031f87f"
  );

  // this is a dev privkey for https://explorer.fuse.io/address/0x8e3B791630e941302179F242e960c97E2ac4b844

  const fuseSDK = await FuseSDK.init(apiKey, credentials, {
    withPaymaster: true,
  });

  console.log(
    `Smart account address: https://explorer.fuse.io/address/${fuseSDK.wallet.getSender()}. Make sure to send some funds to it before you try to pay people.`
  );

  const to = "0x5dCcCAAd516D68E01823AfF6E75dE8bE73fb57bC";
  const value = ethers.utils.parseEther("0"); // or change to a higher number once SC account from above loaded up
  const data = new TextEncoder().encode("Hello there, just testing ;) ");
  const res = await fuseSDK.callContract(to, value, data);

  console.log(
    `UserOpHash generated: https://jiffyscan.xyz/userOpHash/${res?.userOpHash}?network=fuse`
  );
  console.log("Waiting for transaction...");

  const receipt = await res?.wait();

  console.log(
    `User operation included: https://explorer.fuse.io/tx/${receipt?.transactionHash}`
  );
}
