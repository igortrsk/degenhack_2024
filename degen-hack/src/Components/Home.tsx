import logoPC from "../Assets/amogpng.png";
import checkMark from "../Assets/check-mark-svgrepo-com.svg";
import sendTestTx from "../common";
import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS, IProvider } from "@web3auth/base";
import { FuseSDK } from "@fuseio/fusebox-web-sdk";
import { ethers } from "ethers";
import Web3 from "web3";
const clientId = "very cool clientID";
const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x7A", // Please use 0x1 for Mainnet
  rpcTarget: "https://rpc.fuse.io",
  displayName: "Fuse Mainnet",
  blockExplorer: "https://explorer.fuse.io/",
  ticker: "FUSE",
  tickerName: "Fuse",
};

const web3auth = new Web3Auth({
  uiConfig: {
    appName: "hackathon2024",
  },
  clientId,
  chainConfig,
  web3AuthNetwork: "sapphire_mainnet",
});
function Home() {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [fuseSDK, setFuseSDK] = useState<FuseSDK | null>(null);

  // useEffect to initialize Web3Auth
  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal({
          modalConfig: {
            [WALLET_ADAPTERS.OPENLOGIN]: {
              label: "openlogin",
              loginMethods: {
                // Disable facebook and reddit
                facebook: {
                  name: "facebook",
                  showOnModal: false,
                },
                reddit: {
                  name: "reddit",
                  showOnModal: false,
                },
              },
            },
          },
        });
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }

        console.log(loggedIn);
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  // Function to handle login
  const login = async () => {
    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      if (web3auth.connected) {
        setLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to get user information
  const getUserInfo = async () => {
    try {
      const user = await web3auth.getUserInfo();
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle logout
  const logout = async () => {
    try {
      await web3auth.logout();
      setProvider(null);
      setLoggedIn(false);
      console.log("Logged out");
    } catch (error) {
      console.error(error);
    }
  };

  const getAccounts = async () => {
    if (!provider) {
      console.log("Provider not initialized yet");
      return;
    }

    const web3 = new Web3(provider as any);
    const address = await web3.eth.getAccounts();
    const scaAddress = fuseSDK?.wallet.getSender();
    console.log(`EOA: ${address}`, `SCA: ${scaAddress}`);
  };

  // Function to get user balance
  const getBalance = async () => {
    if (!provider) {
      console.log("Provider not initialized yet");
      return;
    }

    const web3 = new Web3(provider as any);
    const address = (await web3.eth.getAccounts())[0];
    const balance = web3.utils.fromWei(
      await web3.eth.getBalance(address),
      "ether"
    );
    console.log(`Balance: ${balance} ETH`);
  };
  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const web3 = new Web3(provider as any);

    //   // Get user's Ethereum public address
    const fromAddress = (await web3.eth.getAccounts())[0];

    const originalMessage = "YOUR_MESSAGE";

    //   // Sign the message
    const signedMessage = await web3.eth.personal.sign(
      originalMessage,
      fromAddress,
      "test password!" // configure your own password here.
    );
    uiConsole(signedMessage);
  };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
    console.log(...args);
  }
  // IM

  return (
    <div>
      {!loggedIn ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mx-auto justify-center items-center py-16">
          <div className="bg-gradient-to-r from-[#27eb0e] from-81% to-[#2c65bb] to-27% rounded-lg p-16 flex flex-col">
            {/* mx auto */}
            <h1 className="text-5xl text-[#121312] pb-8 font-bold font-main">
              Some very interesting text
            </h1>
            <p className="text-lg text-[#121312] pb-8 font-main">
              Some very interesting text some very interesting text some very
              interesting text some very interesting text some very interesting
              text
            </p>
            <ul className="">
              <li className="flex flex-row items-center  mb-4">
                <img src={checkMark} alt="" className="h-4 pr-2" />
                <p className="font-main font-normal text-sm">cus we so cool</p>
              </li>
              <li className="flex flex-row items-center  mb-4">
                <img src={checkMark} alt="" className="h-4 pr-2" />
                <p className="font-main font-normal text-sm">cus we so cool</p>
              </li>{" "}
              <li className="flex flex-row items-center  mb-4">
                <img src={checkMark} alt="" className="h-4 pr-2" />
                <p className="font-main font-normal text-sm">cus we so cool</p>
              </li>{" "}
              <li className="flex flex-row items-center  mb-4">
                <img src={checkMark} alt="" className="h-4 pr-2" />
                <p className="font-main font-normal text-sm">cus we so cool</p>
              </li>
            </ul>
          </div>
          <div className="bg-[#1c1c1c] w-full h-full rounded-lg p-16 flex flex-col mx-auto align-center items-center">
            <img src={logoPC} alt="logo" className="max-h-16 max-w-16 pb-8" />
            <h1 className="text-2xl text-[#ffffff] text-center pb-6 font-bold font-main">
              Even more interesting
            </h1>
            <button
              className="text-2xl text-[#ffffff] mx-auto py-2 px-8 border-2 rounded-xl bg-[#9af0a6] border-[#9af0a6]"
              onClick={login}
            >
              Lunch wallet now
            </button>
            <button
              className="text-2xl mt-4 text-[#ffffff] mx-auto py-2 px-8 border-2 rounded-xl bg-[#9af0a6] border-[#9af0a6]"
              onClick={sendTestTx}
            >
              Send test tx
            </button>
            <div className="w-[80%]">
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-grey-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">OR</span>
                <div className="flex-grow border-t border-grey-400"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={logout} className="text-white">
            LOGOUT
          </button>
          <button onClick={getAccounts} className="text-white">
            getAccounts
          </button>
          <button onClick={getBalance} className="text-white">
            getBalance
          </button>
          <button onClick={signMessage} className="text-white">
            signMessage
          </button>
          <button onClick={getUserInfo} className="text-white">
            getUserInfo
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
