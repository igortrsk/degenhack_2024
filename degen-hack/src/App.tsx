import "./App.css";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, IProvider } from "@web3auth/base";
import { CLIENT_ID } from "./env";
// import { FuseSDK } from "@fuseio/fusebox-web-sdk";
import Web3 from "web3";

const clientId = CLIENT_ID;
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
  clientId,
  chainConfig,
  web3AuthNetwork: "sapphire_mainnet",
});
function App() {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  // const [fuseSDK, setFuseSDK] = useState<FuseSDK | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  // useEffect to initialize Web3Auth
  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }

        console.log(loggedIn);
        // console.log(fuseSDK);
      } catch (error) {
        console.error(error);
      }
    };
    init();
    document.body.style.backgroundColor = "#121312";
    // eslint-disable-next-line
  }, []);
  // useEffect(() => {
  //   (async () => {
  //     if (loggedIn && provider) {
  //       const ethersProvider = new ethers.providers.Web3Provider(
  //         web3auth.provider as any
  //       );
  //       const signer = ethersProvider.getSigner();
  //       const publicApiKey = "pk_API_KEY";
  //       setFuseSDK(await FuseSDK.init(publicApiKey, signer));
  //     }
  //   })();
  // }, [provider, loggedIn]);

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
    // eslint-disable-next-line
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
  // const getUserInfo = async () => {
  //   try {
  //     const user = await web3auth.getUserInfo();
  //     console.log(user);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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

  // const getAccounts = async () => {
  //   if (!provider) {
  //     console.log("Provider not initialized yet");
  //     return;
  //   }

  //   const web3 = new Web3(provider as any);
  //   const address = await web3.eth.getAccounts();
  //   const scaAddress = fuseSDK?.wallet.getSender();
  //   console.log(`EOA: ${address}`, `SCA: ${scaAddress}`);
  // };

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
  // const getBalance = async () => {
  //   if (!provider) {
  //     console.log("Provider not initialized yet");
  //     return;
  //   }

  //   const web3 = new Web3(provider as any);
  //   const address = (await web3.eth.getAccounts())[0];
  //   const balance = web3.utils.fromWei(
  //     await web3.eth.getBalance(address),
  //     "ether"
  //   );
  //   console.log(`Balance: ${balance} ETH`);
  // };
  // const signMessage = async () => {
  //   if (!provider) {
  //     uiConsole("provider not initialized yet");
  //     return;
  //   }
  //   const web3 = new Web3(provider as any);

  //   //   // Get user's Ethereum public address
  //   const fromAddress = (await web3.eth.getAccounts())[0];

  //   const originalMessage = "YOUR_MESSAGE";

  //   //   // Sign the message
  //   const signedMessage = await web3.eth.personal.sign(
  //     originalMessage,
  //     fromAddress,
  //     "test password!" // configure your own password here.
  //   );
  //   uiConsole(signedMessage);
  // };

  // function uiConsole(...args: any[]): void {
  //   const el = document.querySelector("#console>p");
  //   if (el) {
  //     el.innerHTML = JSON.stringify(args || {}, null, 2);
  //   }
  //   console.log(...args);
  // }

  return (
    <div className="bg-[#121312]">
      <Navbar address={address} logout={logout} />
      <div className="h-full w-[90%] flex mx-auto flex-col">
        <Home loggedIn={loggedIn} login={login} />
      </div>
      {/* <WalletCard /> */}
    </div>
  );
}

export default App;
