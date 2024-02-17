import logoPC from "../Assets/amogpng.png";
import checkMark from "../Assets/check-mark-svgrepo-com.svg";
import sendTestTx from "../common";
import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS, IProvider } from "@web3auth/base";
import { FuseSDK } from "@fuseio/fusebox-web-sdk";
import Web3 from "web3";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
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
  const [address, setAddress] = useState<string | null>();

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

  useEffect(() => {
    if (loggedIn) {
      accAddr()
        .then((userAddress) => {
          setAddress(userAddress);
        })
        .catch((error) => {
          console.error("Error fetching address:", error);
        });
    }
  }, [loggedIn]);

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

  const sliceFunct = () => {
    const firstSixCharacters = address?.slice(0, 6);
    const lastThreeCharacters = address?.slice(-3);
    const shortenedAddress = `${firstSixCharacters}...${lastThreeCharacters}`;
    return shortenedAddress;
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

  async function accAddr() {
    console.log("running");
    if (!provider) {
      console.log("Provider not initialized yet");
      throw new Error("Provider not initialized yet");
    }
    const web3 = new Web3(provider as any);
    const addresses = await web3.eth.getAccounts();
    if (addresses && addresses.length > 0) {
      return addresses[0];
    } else {
      throw new Error("No accounts found");
    }
  }
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
        //Wyswietlanie wszystkich coinów oraz ich sumaryczna wartość & Przycisk do dodawania tokenów
        //Status transakcji i pod tym przycisk do wysyłania tokenów -> modal
        //Informacje o posiadanych locked wartościach -> przycisk do dodawania nowych, modal
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mx-auto justify-center items-center py-16">
          <div className="bg-[#1c1c1c] w-full h-full rounded-lg p-4 ">
            <div className="flex flex-row gap-2">
              <h3 className="text-small text-[#a1a3a7] font-semibold font-main">
                Your assets:
              </h3>
              <h2 className="text-md text-[#ffffff] font-bold">0.00 USD</h2>
            </div>
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-[#12ff81]"></div>
            </div>
            {/* Tokens */}
            <div>
              <div className="flex flex-row gap-2">
                <p className="font-main text-small text-[#ffffff]">11 FUSE</p>
                <p className="text-[#12ff81] font-main text-small">($0.73)</p>
              </div>
              <div className="flex flex-row gap-2">
                <p className="font-main text-small text-[#ffffff]">
                  0.0003 WBTC
                </p>
                <p className="text-[#12ff81] font-main text-small">($0.XX)</p>
              </div>
              <div className="flex flex-row gap-2">
                <p className="font-main text-small text-[#ffffff]">3 BUSD</p>
                <p className="text-[#12ff81] font-main text-small">($X.XX)</p>
              </div>
            </div>
          </div>
          <div className="bg-[#1c1c1c] w-full h-full rounded-lg p-4 ">
            <div className="flex flex-row justify-between">
              <h3 className="text-small text-[#a1a3a7] font-semibold font-main">
                Your transactions
              </h3>
              <div className="flex gap-4">
                <button className="border-2 border-[#12ff81] rounded-md px-1 py-px cursor-pointer">
                  <span className="flex flex-row gap-2 justifty-center items-center">
                    <p className="text-[#12ff81]">Send</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#12ff81"
                      className="w-5 h-5"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
                <button className="border-2 border-[#12ff81] rounded-md px-1 py-px cursor-pointer">
                  <span className="flex flex-row gap-2 justifty-center items-center">
                    <p className="text-[#12ff81]">Withdraw</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#12ff81"
                      className="w-5 h-5"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M20.03 3.97a.75.75 0 0 1 0 1.06L6.31 18.75h9.44a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1-.75-.75V8.25a.75.75 0 0 1 1.5 0v9.44L18.97 3.97a.75.75 0 0 1 1.06 0Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-[#12ff81]"></div>
            </div>
            {/* Transactions */}
            <div>
              <div className="flex flex-row gap-2 justify-around">
                <div className="flex flex-row gap-2">
                  <a
                    target="_blank"
                    className="cursor-pointer"
                    href="https://explorer.fuse.io/address/0x5dCcCAAd516D68E01823AfF6E75dE8bE73fb57bC"
                  >
                    <p className="font-main text-small text-[#ffffff]">
                      0xFFF...FFFF
                    </p>
                  </a>
                  <a
                    className="cursor-pointer"
                    href="https://explorer.fuse.io/tx/0x23a89806bdf507bcd5e23df2b2854cb6d525f763b691dc462570ac0f4633529c"
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#90EE90"
                      className="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    target="_blank"
                    className="cursor-pointer"
                    href="https://explorer.fuse.io/address/0x5dCcCAAd516D68E01823AfF6E75dE8bE73fb57bC"
                  >
                    <p className="font-main text-small text-[#ffffff]">
                      0xFFF...FFFF
                    </p>
                  </a>
                </div>

                <p className="font-main text-small text-[#12ff81]">11 FUSE</p>
              </div>
              <div className="flex flex-row gap-2 justify-around">
                <div className="flex flex-row gap-2">
                  <a
                    target="_blank"
                    className="cursor-pointer"
                    href="https://explorer.fuse.io/address/0x5dCcCAAd516D68E01823AfF6E75dE8bE73fb57bC"
                  >
                    <p className="font-main text-small text-[#ffffff]">
                      0xFFF...FFFF
                    </p>
                  </a>
                  <a
                    className="cursor-pointer"
                    href="https://explorer.fuse.io/tx/0x23a89806bdf507bcd5e23df2b2854cb6d525f763b691dc462570ac0f4633529c"
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#FBEC5D"
                      className="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>

                  <a
                    target="_blank"
                    className="cursor-pointer"
                    href="https://explorer.fuse.io/address/0x5dCcCAAd516D68E01823AfF6E75dE8bE73fb57bC"
                  >
                    <p className="font-main text-small text-[#ffffff]">
                      0xFFF...FFFF
                    </p>
                  </a>
                </div>

                <p className="font-main text-small text-[#12ff81]">7 FUSE</p>
              </div>
            </div>
          </div>
          <div className="bg-[#1c1c1c] w-full h-full rounded-lg p-4 ">
            <div className="flex flex-row gap-4 justify-between">
              <h3 className="text-small text-[#a1a3a7] font-semibold font-main">
                Your vaults
              </h3>
              <button className="border-2 border-[#12ff81] rounded-md px-1 py-px cursor-pointer">
                <span className="flex flex-row gap-2 justifty-center items-center">
                  <p className="text-[#12ff81]">Create new vault</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#12ff81"
                    className="w-6 h-6"
                  >
                    <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875Z" />
                    <path d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 0 0 1.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 0 0 1.897 1.384C6.809 12.164 9.315 12.75 12 12.75Z" />
                    <path d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 15.914 9.315 16.5 12 16.5Z" />
                    <path d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 19.664 9.315 20.25 12 20.25Z" />
                  </svg>
                </span>
              </button>
            </div>
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-[#12ff81]"></div>
            </div>
            {/* Tokens */}
            <div>
              <div className="flex flex-row gap-2 pb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#12ff81"
                  className="w-6 h-6"
                >
                  <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875Z" />
                  <path d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 0 0 1.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 0 0 1.897 1.384C6.809 12.164 9.315 12.75 12 12.75Z" />
                  <path d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 15.914 9.315 16.5 12 16.5Z" />
                  <path d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 19.664 9.315 20.25 12 20.25Z" />
                </svg>
                <p className="font-main text-small text-[#ffffff]">Name </p>
                <p className="font-main text-small text-[#a1a3a7]">-</p>
                <p className="font-main text-small text-[#ffffff]">
                  21:37:420{" "}
                </p>
                <p className="font-main text-small text-[#a1a3a7]">-</p>
                <p className="text-[#12ff81] font-main text-small">($0.73)</p>
              </div>
              <div className="flex flex-row gap-2 pb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#12ff81"
                  className="w-6 h-6"
                >
                  <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875Z" />
                  <path d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 0 0 1.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 0 0 1.897 1.384C6.809 12.164 9.315 12.75 12 12.75Z" />
                  <path d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 15.914 9.315 16.5 12 16.5Z" />
                  <path d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 19.664 9.315 20.25 12 20.25Z" />
                </svg>
                <p className="font-main text-small text-[#ffffff]">Name </p>
                <p className="font-main text-small text-[#a1a3a7]">-</p>
                <p className="font-main text-small text-[#ffffff]">
                  21:37:420{" "}
                </p>
                <p className="font-main text-small text-[#a1a3a7]">-</p>
                <p className="text-[#12ff81] font-main text-small">($0.73)</p>
              </div>
              <div className="flex flex-row gap-2 pb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#12ff81"
                  className="w-6 h-6"
                >
                  <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875Z" />
                  <path d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 0 0 1.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 0 0 1.897 1.384C6.809 12.164 9.315 12.75 12 12.75Z" />
                  <path d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 15.914 9.315 16.5 12 16.5Z" />
                  <path d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 19.664 9.315 20.25 12 20.25Z" />
                </svg>
                <p className="font-main text-small text-[#ffffff]">Name </p>
                <p className="font-main text-small text-[#a1a3a7]">-</p>
                <p className="font-main text-small text-[#ffffff]">
                  21:37:420{" "}
                </p>
                <p className="font-main text-small text-[#a1a3a7]">-</p>
                <p className="text-[#12ff81] font-main text-small">($0.73)</p>
              </div>
            </div>
          </div>
          <div className="bg-[#1c1c1c] w-full h-full rounded-lg p-4 "></div>
        </div>
        // <div>
        //   <button onClick={logout} className="text-white">
        //     LOGOUT
        //   </button>
        //   <button onClick={getAccounts} className="text-white">
        //     getAccounts
        //   </button>
        //   <button onClick={getBalance} className="text-white">
        //     getBalance
        //   </button>
        //   <button onClick={signMessage} className="text-white">
        //     signMessage
        //   </button>
        //   <button onClick={getUserInfo} className="text-white">
        //     getUserInfo
        //   </button>
        //   {address != (null || undefined) ? (
        //     <div className="flex gap-2">
        //       <Jazzicon diameter={25} seed={jsNumberForAddress(address)} />
        //       <p className="text-white">{sliceFunct()}</p>
        //     </div>
        //   ) : (
        //     <></>
        //   )}
        // </div>
      )}
    </div>
  );
}

export default Home;
