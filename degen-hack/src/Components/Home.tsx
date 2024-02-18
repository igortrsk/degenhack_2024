import { FuseSDK } from "@fuseio/fusebox-web-sdk";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import checkMark from "../Assets/check-mark-svgrepo-com.svg";
import logoPC from "../Assets/pie-chart-svgrepo-com.svg";
import { putTokenVault, sendTk, sendTx, withdrawTokenVault } from "../common";

interface HomeProps {
  loggedIn: boolean;
  login: () => void; // Define the type of the function
  getBalance: () => Promise<string | undefined>;
  fuseSDK: FuseSDK | null;
}

const Home: React.FC<HomeProps> = ({
  loggedIn,
  login,
  getBalance,
  fuseSDK,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [vaultedAmount, setVaultedAmount] = useState<number>(0);
  const [vaultOpen, setVaultOpen] = useState(false);
  const handleVaultOpen = () => setVaultOpen(true);
  const handleVaultClose = () => setVaultOpen(false);
  const [vaultAmount, setVaultAmount] = useState<number>(0);
  const [value, setValue] = useState("token");
  const [vaultValue, setVaultValue] = useState("vault");
  const [recAddr, setRecAddr] = useState<string>("");
  const [sendAmount, setSendAmount] = useState<number>(0);
  const [sendMsg, setSendMsg] = useState<string>("");
  const [userBalance, setUserBalance] = useState<string | undefined>();
  const [transactions, setTransactions] = useState<Array<Array<any>>>();
  useEffect(() => {
    const getUserBalance = async () => {
      const bal: string | undefined = await getBalance();
      setUserBalance(bal);
    };
    getUserBalance();
    window.addEventListener("storage", getUserBalance);
    return () => window.removeEventListener("storage", getUserBalance);
    // eslint-disable-next-line
  }, [loggedIn, fuseSDK]);
  const sliceAddr = (addr: string | any[]) => {
    const firstSixCharacters = addr?.slice(0, 6);
    const lastThreeCharacters = addr?.slice(-4);
    const shortenedAddress = `${firstSixCharacters}...${lastThreeCharacters}`;
    return shortenedAddress;
  };
  useEffect(() => {
    const handleStorageUpdate = () => {
      setTransactions([[]]);
      const pastTransactions = localStorage.getItem("user-hash");
      if (pastTransactions !== null) {
        const parsedObj = JSON.parse(pastTransactions);
        Array.from(parsedObj).forEach((item: any) => {
          const getLocalItem = localStorage.getItem(item);
          if (getLocalItem !== null) {
            const parsedItem = JSON.parse(getLocalItem);
            // if (transactions !== (null || undefined)) {
            setTransactions((prevTransactions) => {
              if (prevTransactions) {
                return prevTransactions.concat([parsedItem]);
              } else {
                return [parsedItem];
              }
            });
            // } else {
            // setTransactions(parsedItem);
            // }
          }
        });
      }
    };
    console.log(transactions);

    window.addEventListener("storage", handleStorageUpdate);
    return () => window.removeEventListener("storage", handleStorageUpdate);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handleVaultedAmountUpdate = () => {
      let vAmount = localStorage.getItem("valutedAmount");
      setVaultedAmount(Math.round(Number(vAmount) * 100) / 100);
    };

    window.addEventListener("storage", handleVaultedAmountUpdate);
    return () =>
      window.removeEventListener("storage", handleVaultedAmountUpdate);
    // eslint-disable-next-line
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleVaultChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVaultValue((event.target as HTMLInputElement).value);
  };

  const handleSendVault = () => {
    handleVaultClose();
    putTokenVault(vaultAmount);
  };

  const handleWithdrawVault = () => {
    handleVaultClose();
    withdrawTokenVault(vaultAmount);
  };

  const handleSendText = () => {
    handleClose();
    if (fuseSDK !== null) {
      sendTx(recAddr, sendMsg, fuseSDK);
    } else {
      console.log("Fuse sdk is null!");
    }
  };
  const handleSendToken = () => {
    handleClose();
    if (fuseSDK !== null) {
      sendTk(recAddr, sendAmount, fuseSDK);
    } else {
      console.log("Fuse sdk is null!");
    }
  };
  return (
    <div>
      {!loggedIn ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mx-auto justify-center items-center py-16 ">
          <div className="bg-gradient-to-r from-[#27eb0e] from-81% to-[#2c65bb] to-27% rounded-lg p-16 flex flex-col">
            {/* mx auto */}
            <h1 className="text-5xl text-[#121312] pb-8 font-bold font-main">
              Welcome to Fuzer
            </h1>
            <p className="text-xl text-[#121312] pb-8 font-main font-semibold">
              Join the Fuse blockchain ecosystem:
            </p>
            <ul className="">
              <li className="flex flex-row items-center  mb-4">
                <img src={checkMark} alt="" className="h-4 pr-2" />
                <p className="font-main font-normal text-sm">
                  Gasless transactions
                </p>
              </li>
              <li className="flex flex-row items-center  mb-4">
                <img src={checkMark} alt="" className="h-4 pr-2" />
                <p className="font-main font-normal text-sm">
                  Easy blockchain messaging
                </p>
              </li>{" "}
              <li className="flex flex-row items-center  mb-4">
                <img src={checkMark} alt="" className="h-4 pr-2" />
                <p className="font-main font-normal text-sm">
                  Saving with vaults
                </p>
              </li>{" "}
              <p className="text-xl text-[#121312] pb-8 font-main font-semibold">
                ... all just two clicks away. No wallets or keys needed!
              </p>
            </ul>
          </div>
          <div className="bg-[#1c1c1c] w-full h-full rounded-lg p-16 flex flex-col mx-auto align-center items-center border-[#12ff81] border-2">
            <img src={logoPC} alt="logo" className="max-h-16 max-w-16 pb-6" />
            <h1 className="text-2xl text-[#12ff81] text-center pb-6 font-bold font-main">
              Leave your mark on the Fuse blockchain!
            </h1>

            <button
              className="text-2xl text-[#1c1c1c] font-bold mx-auto py-2 px-8 border-2 rounded-xl bg-[#12ff81] border-[#12ff81]"
              onClick={login}
            >
              Launch Wallet
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mx-auto justify-center items-center py-16">
          <div className="bg-[#1c1c1c] w-full h-full rounded-lg p-4 ">
            <div className="flex flex-row gap-2">
              <h3 className="text-small text-[#a1a3a7] font-semibold font-main">
                Your assets:
              </h3>
              {userBalance !== undefined ? (
                <h2 className="text-md text-[#ffffff] font-bold">
                  {Number(userBalance) * 0.066827 + 329.13} USD
                </h2>
              ) : (
                <></>
              )}
            </div>
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-[#12ff81]"></div>
            </div>
            {/* Tokens */}
            <div>
              <div className="flex flex-row gap-2">
                <p className="font-main text-small text-[#ffffff]">
                  {userBalance} FUSE
                </p>
                {userBalance !== undefined ? (
                  <p className="text-[#12ff81] font-main text-small">
                    ${Number(userBalance) * 0.066827}
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex flex-row gap-2">
                <p className="font-main text-small text-[#ffffff]">
                  0.0003 WBTC
                </p>
                <p className="text-[#12ff81] font-main text-small">($326.12)</p>
              </div>
              <div className="flex flex-row gap-2">
                <p className="font-main text-small text-[#ffffff]">3 BUSD</p>
                <p className="text-[#12ff81] font-main text-small">($3.01)</p>
              </div>
            </div>
          </div>
          <div className="bg-[#1c1c1c] w-full h-full rounded-lg p-4 ">
            <div className="flex flex-row justify-between">
              {}
              <h3 className="text-small text-[#a1a3a7] font-semibold font-main">
                Your transactions
              </h3>
              <div className="flex gap-4">
                <button
                  className="border-2 border-[#12ff81] rounded-md px-1 py-px cursor-pointer"
                  onClick={handleOpen}
                >
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
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    sx={{
                      borderRadius: "0.5rem",
                      position: "absolute" as "aboslute",
                      top: "35%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 400,
                      bgcolor: "#1c1c1c",
                      border: "1px solid #12ff81",
                      boxShadow: 24,
                      p: 4,
                    }}
                  >
                    <div>
                      {" "}
                      <div className="flex flex-row">
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={value}
                          onChange={handleChange}
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <FormControlLabel
                            value="token"
                            control={
                              <Radio
                                sx={{
                                  color: "#fff",
                                  "&.Mui-checked": {
                                    color: "#12ff81",
                                  },
                                }}
                              />
                            }
                            sx={{ color: "#fff" }}
                            label="Send Fuse"
                          />
                          <FormControlLabel
                            value="message"
                            control={
                              <Radio
                                sx={{
                                  color: "#fff",
                                  "&.Mui-checked": {
                                    color: "#12ff81",
                                  },
                                }}
                              />
                            }
                            sx={{ color: "#fff" }}
                            label="Gasless Message"
                          />
                        </RadioGroup>
                      </div>
                    </div>
                    <div>
                      {value === "token" ? (
                        <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                              Receiving Address
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              type="text"
                              placeholder="0xFFFF...FFFF"
                              onChange={(e) => setRecAddr(e.target.value)}
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                              Amount
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              type="number"
                              placeholder="Amount to transfer"
                              onChange={(e) =>
                                setSendAmount(Number(e.target.value))
                              }
                            />
                          </div>
                          <div className="flex items-center justify-center">
                            <button
                              className=" border-[#12ff81] border-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              type="button"
                              onClick={handleSendToken}
                            >
                              <p className="text-[#12ff81]">Send</p>
                            </button>
                          </div>
                        </form>
                      ) : (
                        <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                              Receiving Address
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              type="text"
                              placeholder="0xFFFF...FFFF"
                              onChange={(e) => setRecAddr(e.target.value)}
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                              Message
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              type="text"
                              placeholder="Hello Vitalik"
                              onChange={(e) => setSendMsg(e.target.value)}
                            />
                          </div>
                          <div className="flex items-center justify-center">
                            <button
                              className=" border-[#12ff81] border-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              type="button"
                              onClick={handleSendText}
                            >
                              <p className="text-[#12ff81]">Send</p>
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </Box>
                </Modal>
                <button className="border-2 border-[#808080] rounded-md px-1 py-px cursor-pointer">
                  <span className="flex flex-row gap-2 justifty-center items-center cursor-not-allowed">
                    <p className="text-[#808080]">Withdraw</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#808080"
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
              {/*hash nadawca odbiorca wiadomosc waluta status */}
              {transactions !== (null || undefined) &&
                transactions.length > 0 &&
                Array.from(transactions)
                  .filter(function (item) {
                    if (item === undefined || null || item.length === 0) {
                      return false;
                    } else {
                      return true;
                    }
                  })
                  .map((item: any) => {
                    return (
                      // <div>
                      //   <p>{sliceAddr(item[0])}</p>
                      //   <p>{sliceAddr(item[1])}</p>
                      //   <p>{item[2]}</p>
                      //   <p>{item[3]}</p>
                      //   <p>{item[4]}</p>
                      // </div>
                      <div className="flex flex-col md:flex-row gap-2 pb-8 md:pb-2">
                        <div className="flex flex-row gap-2">
                          <a
                            target="_blank"
                            rel="noreferrer"
                            className="cursor-pointer"
                            href={`https://explorer.fuse.io/address/${item[0]}`}
                          >
                            <p className="font-main text-small text-[#ffffff]">
                              {sliceAddr(item[0])}
                            </p>
                          </a>
                          {item[4] === "done" ? (
                            <a
                              className="cursor-pointer"
                              href={`https://explorer.fuse.io/tx/${item[5]}`}
                              target="_blank"
                              rel="noreferrer"
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
                          ) : (
                            <a
                              className="cursor-pointer"
                              href={`https://explorer.fuse.io/tx/${item[5]}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <CircularProgress
                                sx={{ color: "yellow" }}
                                size="1.5rem"
                              />
                            </a>
                          )}
                          <a
                            target="_blank"
                            rel="noreferrer"
                            className="cursor-pointer"
                            href={`https://explorer.fuse.io/address/${item[1]}`}
                          >
                            <p className="font-main text-small text-[#ffffff]">
                              {sliceAddr(item[1])}
                            </p>
                          </a>
                        </div>
                        <div className="flex flex-row md:justify-between w-full md:px-4">
                          <p className="font-main text-small text-[#12ff81] md:pr-0 pr-6">
                            {item[2]}
                          </p>
                          <p className="font-main text-small text-[#12ff81]">
                            {item[3]} FUSE
                          </p>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
          <div className="bg-[#1c1c1c] w-full h-full rounded-lg p-4 ">
            <div className="flex flex-row gap-4 justify-between">
              <div className="flex flex-row gap-2">
                <h3 className="text-small text-[#a1a3a7] font-semibold font-main">
                  Your vaulted assets:
                </h3>{" "}
                {vaultedAmount !== undefined ? (
                  <h2 className="text-md text-[#ffffff] font-bold">
                    {Number(vaultedAmount)} DHIO
                  </h2>
                ) : (
                  <></>
                )}
              </div>
              <button
                className="border-2 border-[#12ff81] rounded-md px-1 py-px cursor-pointer"
                onClick={handleVaultOpen}
              >
                <span className="flex flex-row gap-2 justifty-center items-center">
                  <p className="text-[#12ff81]">Manage Vaulted Assets</p>
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
              <Modal
                open={vaultOpen}
                onClose={handleVaultClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    borderRadius: "0.5rem",
                    position: "absolute" as "aboslute",
                    top: "35%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "#1c1c1c",
                    border: "1px solid #12ff81",
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <div>
                    {" "}
                    <div className="flex flex-row">
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={vaultValue}
                        onChange={handleVaultChange}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          value="withdraw"
                          control={
                            <Radio
                              sx={{
                                color: "#fff",
                                "&.Mui-checked": {
                                  color: "#12ff81",
                                },
                              }}
                            />
                          }
                          sx={{ color: "#fff" }}
                          label="Withdraw"
                        />
                        <FormControlLabel
                          value="vault"
                          control={
                            <Radio
                              sx={{
                                color: "#fff",
                                "&.Mui-checked": {
                                  color: "#12ff81",
                                },
                              }}
                            />
                          }
                          sx={{ color: "#fff" }}
                          label="Vault"
                        />
                      </RadioGroup>
                    </div>
                  </div>
                  <div>
                    <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Amount
                        </label>

                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          type="number"
                          placeholder="Amount to transfer"
                          onChange={(e) =>
                            setVaultAmount(Number(e.target.value))
                          }
                        />
                      </div>
                      {vaultValue === "vault" ? (
                        <div className="flex items-center justify-center">
                          <button
                            className=" border-[#12ff81] border-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleSendVault}
                          >
                            <p className="text-[#12ff81]">Send</p>
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-center">
                            <button
                              className=" border-[#12ff81] border-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              type="button"
                              onClick={handleWithdrawVault}
                            >
                              <p className="text-[#12ff81]">Send</p>
                            </button>
                          </div>
                        </>
                      )}
                    </form>
                  </div>
                </Box>
              </Modal>
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
                <p className="font-main text-small text-[#ffffff]">
                  Daily Savings{" "}
                </p>
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
                <p className="font-main text-small text-[#ffffff]">
                  Shared Vault{" "}
                </p>
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
                <p className="font-main text-small text-[#ffffff]">Misc </p>
                <p className="font-main text-small text-[#a1a3a7]">-</p>
                <p className="font-main text-small text-[#ffffff]">
                  21:37:420{" "}
                </p>
                <p className="font-main text-small text-[#a1a3a7]">-</p>
                <p className="text-[#12ff81] font-main text-small">($0.73)</p>
              </div>
            </div>
          </div>
          <div className="bg-[#1c1c1c] w-full h-full rounded-lg p-4 flex justify-center">
            <PieChart
              className="w-[50%]"
              data={[
                {
                  title: "FUSE",
                  value: Number(userBalance),
                  color: "#A7D37D",
                },
                {
                  title: "WBTC",
                  value: 0.00015,
                  color: "#459DC3",
                },
                {
                  title: "BUSD",
                  value: 0.0003,
                  color: "#8088E6",
                },
              ]}
              label={({ dataEntry }) => dataEntry.title}
              labelStyle={{
                fill: "#fff",
                opacity: 0.75,
                pointerEvents: "none",
                fontSize: "0.5rem",
              }}
              labelPosition={100 - 80 / 2}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
