import './App.css';
import {useState, useEffect} from 'react';
import getLink from './api/request';
import Loader from './assets/loader.svg'
function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000)
    return () => clearTimeout(timer)
  
  }, [count, setCount])
  
  const [input, setInput] = useState('');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const copied = navigator.clipboard.writeText(link);;
  const handleKeyDown = (event) => {
    
    setInput(event.target.value)

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    getShortLink();
  }

  const getShortLink = async () => {
    const formatStr = input.toString().toLowerCase().trim();
    let ourUrl = `https://api.shrtco.de/v2/shorten`
    const shortenedLink = await getLink(ourUrl, formatStr);
    setLoading(false);
    setLink(shortenedLink.data.result.full_short_link)
    console.log(shortenedLink)
  }
  return (
    <div className="App">
    <div class="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
  <div class="w-full sm:max-w-md p-5 mx-auto">
    <h2 class="mb-12 text-center text-5xl font-extrabold">CodingBDX shortcut</h2>
    <form onSubmit={(e) => handleSubmit(e)}>
      <div class="mb-4">
       
        <input value={input} onChange={handleKeyDown} type="text" name="shortcut" class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" placeholder='your shortcute here' />
      </div>
      
      
      <div class="mt-6">
             
                  <button onClick={() => {
                    if (link !== undefined) {
                      navigator.clipboard.writeText(link);

                    }
                    
                    setInterval(() => {
                    
                    }, 5000);
                  }} class="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
                  
                    type="submit"> {loading ? (<img src={Loader} alt="loading" className='animate-spin h-6 w-6 mx-auto' />) : (<>Shortcut url</>)}
              </button>
           {link !== "" ? (   
                <span className='w-full inline-flex items-center justify-center px-4 py-2 my-2 bg-green-200 border border-transparent rounded-md font-semibold capitalize'><span className='hidden'></span>{link} { copied ? <button>📄</button> : '' }</span>
              ) : ''} </div>
      <div class="mt-6 text-center">
              <p>page has been open since { count }</p>
      </div>
    </form>

        </div>
</div>
          </div>
  );
}

export default App;
