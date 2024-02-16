import logoPC from "../Assets/amogpng.png"
import checkMark from "../Assets/check-mark-svgrepo-com.svg"
import sendTestTx from "../common"
function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mx-auto justify-center items-center py-16">
      <div className="bg-gradient-to-r from-[#27eb0e] from-81% to-[#2c65bb] to-27% rounded-lg p-16 flex flex-col">
        {/* mx auto */}
        <h1 className="text-5xl text-[#121312] pb-8 font-bold font-main">
          Some very interesting text
        </h1>
        <p className="text-lg text-[#121312] pb-8 font-main">
          Some very interesting text some very interesting text some very
          interesting text some very interesting text some very interesting text
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
        <a
          className="text-2xl text-[#ffffff] mx-auto py-2 px-8 border-2 rounded-xl bg-[#9af0a6] border-[#9af0a6]"
          href="./"
        >
          Lunch wallet now
        </a>
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
  )
}

export default Home
