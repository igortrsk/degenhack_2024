import { FuseSDK } from "@fuseio/fusebox-web-sdk";
import { ethers } from "ethers";

export async function putTokenVault(amount: number) {
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
  // const vaultContractWithSigner = vaultContract.connect(signer);
  // const deposit = await vaultContractWithSigner.deposit(0);
  // console.log(deposit);
  // Approve the vault contract to spend tokens on behalf of the user
  const approvalAmount = ethers.constants.MaxUint256; // Approve max uint value to allow spending
  const approval = await tokenContract.approve(
    "0xC0b7Ac0586BA2aaA4355d3Be27848571dA7af7c0",
    approvalAmount
  );
  console.log(approval);

  // Deposit tokens into the vault
  const vaultContractWithSigner = vaultContract.connect(signer);
  const deposit = await vaultContractWithSigner.deposit(5); // Adjust the amount you want to deposit
  console.log(deposit);
}
export async function withdrawTokenVault(amount: number) {
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
  // const vaultContractWithSigner = vaultContract.connect(signer);
  // const deposit = await vaultContractWithSigner.deposit(0);
  // console.log(deposit);
  // Approve the vault contract to spend tokens on behalf of the user
  const approvalAmount = ethers.constants.MaxUint256; // Approve max uint value to allow spending
  const approval = await tokenContract.approve(
    "0xC0b7Ac0586BA2aaA4355d3Be27848571dA7af7c0",
    approvalAmount
  );
  console.log(approval);

  // Deposit tokens into the vault
  const vaultContractWithSigner = vaultContract.connect(signer);
  const withdraw = await vaultContractWithSigner.withdraw(5); // Adjust the amount you want to deposit
  console.log(withdraw);
}

export async function sendTx(
  addr: string,
  msg: string,
  fuseSdkIns: FuseSDK | null
) {
  console.log("sendTestTx...");

  if (fuseSdkIns === null) {
    console.log("error");
    return "error";
  }
  console.log(
    `Smart account address: https://explorer.fuse.io/address/${fuseSdkIns.wallet.getSender()}. Make sure to send some funds to it before you try to pay people.`
  );

  const to = addr;
  const value = ethers.utils.parseEther("0"); // or change to a higher number once SC account from above loaded up
  const data = new TextEncoder().encode(msg);
  const res = await fuseSdkIns.callContract(to, value, data);

  console.log(
    `UserOpHash generated: https://jiffyscan.xyz/userOpHash/${res?.userOpHash}?network=fuse`
  );
  const pastTransactions = localStorage.getItem("user-hash");
  if (pastTransactions !== null) {
    const parsedObj = JSON.parse(pastTransactions);

    let newObject = [...parsedObj, res?.userOpHash];
    localStorage.setItem("user-hash", JSON.stringify(newObject));
  } else {
    localStorage.setItem("user-hash", JSON.stringify([res?.userOpHash]));
  }

  if (res?.userOpHash !== undefined)
    localStorage.setItem(
      res?.userOpHash,
      JSON.stringify([
        fuseSdkIns.wallet.getSender(),
        addr,
        msg,
        0,
        "loading",
        "waiting",
      ])
    );
  window.dispatchEvent(new Event("storage"));
  console.log("Waiting for transaction...");

  const receipt = await res?.wait();

  console.log(
    `User operation included: https://explorer.fuse.io/tx/${receipt?.transactionHash}`
  );
  //userOpHash->fuseSdkIns.wallet.getSender(),addr,msg,0,done
  if (res?.userOpHash !== undefined)
    localStorage.setItem(
      res?.userOpHash,
      JSON.stringify([
        fuseSdkIns.wallet.getSender(),
        addr,
        msg,
        0,
        "done",
        receipt?.transactionHash,
      ])
    );
  window.dispatchEvent(new Event("storage"));
}

export async function sendTk(
  addr: string,
  amount: number,
  fuseSdkIns: FuseSDK | null
) {
  if (fuseSdkIns === null) return "error";

  console.log(`Sender Address is ${fuseSdkIns.wallet.getSender()}`);

  const to = addr;
  const value = ethers.utils.parseEther(amount.toString());
  const data = Uint8Array.from([]);
  console.log(data);
  const res = await fuseSdkIns.callContract(to, value, data);

  console.log(
    `UserOpHash generated: https://jiffyscan.xyz/userOpHash/${res?.userOpHash}?network=fuse`
  );

  const pastTransactions = localStorage.getItem("user-hash");
  if (pastTransactions !== null) {
    const parsedObj = JSON.parse(pastTransactions);

    let newObject = [...parsedObj, res?.userOpHash];
    localStorage.setItem("user-hash", JSON.stringify(newObject));
  } else {
    localStorage.setItem("user-hash", JSON.stringify([res?.userOpHash]));
  }
  window.dispatchEvent(new Event("storage"));

  if (res?.userOpHash !== undefined)
    localStorage.setItem(
      res?.userOpHash,
      JSON.stringify([
        fuseSdkIns.wallet.getSender(),
        addr,
        "No message",
        amount,
        "loading",
        "waiting",
      ])
    );
  window.dispatchEvent(new Event("storage"));

  console.log("Waiting for transaction...");

  console.log(
    `Smart account address: https://explorer.fuse.io/address/${fuseSdkIns.wallet.getSender()}. Make sure to send some funds to it before you try to pay people.`
  );

  const receipt = await res?.wait();
  console.log(
    `User operation included: https://explorer.fuse.io/tx/${receipt?.transactionHash}`
  );

  if (res?.userOpHash !== undefined)
    localStorage.setItem(
      res?.userOpHash,
      JSON.stringify([
        fuseSdkIns.wallet.getSender(),
        addr,
        "No message",
        amount,
        "done",
        receipt?.transactionHash,
      ])
    );
  window.dispatchEvent(new Event("storage"));
}
