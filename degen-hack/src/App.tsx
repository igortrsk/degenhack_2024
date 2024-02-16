import logo from "./logo.svg"
import "./App.css"
import Home from "./Components/Home"
import Navbar from "./Components/Navbar"

function App() {
  return (
    <div className="bg-[#121312]">
      <Navbar />

      <div className="h-full w-[90%] flex mx-auto flex-col">
        <Home />
      </div>
      {/* <WalletCard /> */}
    </div>
  )
}

export default App
