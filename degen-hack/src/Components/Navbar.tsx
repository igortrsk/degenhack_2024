import logo from "../Assets/amogpng.png";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

interface NavbarProps {
  address: string | null;
  logout: () => void; // Define the type of the function
}

const Navbar: React.FC<NavbarProps> = ({ address, logout }) => {
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
      <div>
        <img src={logo} alt="logo" className="max-h-12 max-w-12" />
      </div>
      {address !== null ? (
        <div className="flex gap-2 items-center px-8">
          <button onClick={logout}>LOGOUT</button>
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
