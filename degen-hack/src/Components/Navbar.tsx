import logo from "../Assets/pie-chart-svgrepo-com.svg";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

interface NavbarProps {
  address: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ address }) => {
  const sliceFunct = () => {
    console.log(address);
    const firstSixCharacters = address?.slice(0, 6);
    const lastThreeCharacters = address?.slice(-4);
    const shortenedAddress = `${firstSixCharacters}...${lastThreeCharacters}`;
    return shortenedAddress;
  };
  return (
    <div className="flex flex-row backdrop-blur-lg bg-[#1c1c1c] justify-between">
      {/* logo */}
      <div className="p-2 flex flex-row justify-center items-center">
        <img
          src={logo}
          alt="logo"
          className="max-h-8 max-w-8 md:max-h-12 max-w-12 bg-transparent"
        />
        <div className="pl-6">
          <h1 className="font-main text-2xl md:text-4xl font-semibold text-[#12ff81]">
            Fuzer
          </h1>
        </div>
      </div>
      {address !== null ? (
        <div className="flex gap-2 items-center pl-8 mr-6">
          <Jazzicon diameter={25} seed={jsNumberForAddress(address)} />
          <p className="text-white">{sliceFunct()}</p>
        </div>
      ) : (
        <></>
      )}
      {/* wallet status */}
    </div>
  );
};

export default Navbar;
