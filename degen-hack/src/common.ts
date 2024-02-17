import { FuseSDK } from "@fuseio/fusebox-web-sdk";
import { ethers } from "ethers";
import { API_KEY } from "./env";

export default async function sendTestTx(addr: string, msg: string) {
  console.log("sendTestTx...");

  //   const privateKey =
  // process.env.PRIVATE_KEY ??
  // (() => {
  //   const pk = generatePrivateKey();
  //   console.log(pk);
  //   return pk;
  // })();

  const apiKey = API_KEY;
  const credentials = new ethers.Wallet("INSERT_PRIVKEY_HERE"); // FIXME
  const fuseSDK = await FuseSDK.init(apiKey, credentials, {
    withPaymaster: true,
  });

  console.log(
    `Smart account address: https://explorer.fuse.io/address/${fuseSDK.wallet.getSender()}. Make sure to send some funds to it before you try to pay people.`
  );

  const to = "0x5dCcCAAd516D68E01823AfF6E75dE8bE73fb57bC"; // for vitalik.eth
  const value = ethers.utils.parseEther("0");
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
