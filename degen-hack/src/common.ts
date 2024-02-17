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
    `Smart account address: https://explorer.fuse.io/address/${fuseSDK.wallet.getSender()}`
  );

  const to = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045"; // for vitalik.eth
  const value = ethers.utils.parseEther("0");
  const data = new TextEncoder().encode("testing");
  const res = await fuseSDK.callContract(to, value, data);

  console.log(`UserOpHash: ${res?.userOpHash}`);
  console.log("Waiting for transaction...");

  const receipt = await res?.wait();

  console.log(
    `User operation included: https://explorer.fuse.io/tx/${receipt?.transactionHash}`
  );
}
