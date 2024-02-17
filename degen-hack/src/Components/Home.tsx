import { PropsWithChildren, useState } from "react";
import logoPC from "../Assets/amogpng.png";
import checkMark from "../Assets/check-mark-svgrepo-com.svg";
import sendTestTx from "../common";
import { PieChart } from "react-minimal-pie-chart";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

interface HomeProps {
  loggedIn: boolean;
  login: () => void; // Define the type of the function
}

const Home: React.FC<HomeProps> = ({ loggedIn, login }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState("token");
  const [recAddr, setRecAddr] = useState<string>("");
  const [sendAmount, setSendAmount] = useState<number>(0);
  const [sendMsg, setSendMsg] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
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
                            label="Token"
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
                            label="Message"
                          />
                        </RadioGroup>
                      </div>
                    </div>
                    <div>
                      {value === "token" ? (
                        <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                              Reciving Address
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              type="text"
                              placeholder="0xFFFF...FFF"
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
                            />
                          </div>
                          <div className="flex items-center justify-center">
                            <button
                              className=" border-[#12ff81] border-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              type="button"
                            >
                              <p className="text-[#12ff81]">Send</p>
                            </button>
                          </div>
                        </form>
                      ) : (
                        <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                              Reciving Addr
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              type="text"
                              placeholder="0xFFFF...FFF"
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
                            />
                          </div>
                          <div className="flex items-center justify-center">
                            <button
                              className=" border-[#12ff81] border-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              type="button"
                            >
                              <p className="text-[#12ff81]">Send</p>
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </Box>
                </Modal>
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
              </h3>{" "}
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
          <div className="bg-[#1c1c1c] w-full h-full rounded-lg p-4 flex justify-center">
            <PieChart
              className="w-[50%]"
              data={[
                {
                  title: "FUSE",
                  value: 10,
                  color:
                    "#" + Math.floor(Math.random() * 16777215).toString(16),
                },
                {
                  title: "WBTC",
                  value: 15,
                  color:
                    "#" + Math.floor(Math.random() * 16777215).toString(16),
                },
                {
                  title: "BUSD",
                  value: 20,
                  color:
                    "#" + Math.floor(Math.random() * 16777215).toString(16),
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
