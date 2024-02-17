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
