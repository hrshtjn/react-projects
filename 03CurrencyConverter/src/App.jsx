import { useEffect, useState } from 'react'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import { InputBox } from './components'

function App() {

  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [inputAmount, setInputAmount] = useState(0)
  const [outputAmount, setOutputAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)
  //console.log(currencyInfo)

  const [options, setOptions] = useState([]);
  const [conversionFactor, setConversionFactor] = useState(0);

  useEffect(() => {
    if (currencyInfo) {
      //const keys = Object.keys(currencyInfo);
      setOptions(["inr", "eur", "usd"]);
      setConversionFactor(currencyInfo[to]);
      console.log(conversionFactor)
    }
  }, [currencyInfo, from, to]);

  const swapCurrencies = () => {
    let tmp = from;
    setFrom(to);
    setTo(tmp);
  }


  return (
    <>
      <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        }}>
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <div className="w-full mb-1">
            <InputBox label="From" onAmountChange={(val) => {
              setInputAmount(val);
              setOutputAmount(val * conversionFactor)
            }
            } onCurrencyChange={(currency) => setFrom(currency)} currencyOptions={options}
              selectedCurrency={from} />
          </div>


          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5">
            <button onClick={swapCurrencies}>Swap</button>
          </div>
          <div className="w-full mt-1 mb-4">
            <InputBox label="To" isDisabled={true} currencyOptions={options}
              selectedCurrency={to} val={outputAmount}
              onCurrencyChange={(currency) => setTo(currency)} />
          </div>
        </div>



      </div>

    </>
  )
}

export default App
