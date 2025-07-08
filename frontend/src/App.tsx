
import { useRef, useState } from 'react'
import './App.css'
import { ScaleLoader } from 'react-spinners';

const max_len = 300;

function App() {
  const [Loading, set_Loading] = useState(false);
  const inputref = useRef<HTMLTextAreaElement | null>(null);
  const [emotion, set_emotion] = useState("");
  const [confidence, set_confidence] = useState("");
  const [inputValue, setInputValue] = useState("");

  const FetchResponse = async () => {
    if (!inputValue.trim()) {
      alert('Please enter a valid input');
      return;
    }
    set_Loading(true);
    try {
      const res = await fetch('http://localhost:5000/api/data', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          reflection: inputValue
        })
      });
      const data = await res.json();
      set_confidence(data.confidence);
      set_emotion(data.emotion);
    } catch (e) {
      alert('Something went wrong. Please try again.');
    }
    set_Loading(false);
  } 
  

  const getEmotionColor = (emotion: string) => {
    const emotionColors: Record<string, string> = {
      anxious: 'bg-gray-100 text-gray-700',
      happy: 'bg-yellow-100 text-yellow-700',
      sad: 'bg-blue-100 text-blue-700',
      excited: 'bg-orange-100 text-orange-700',
      angry: 'bg-red-100 text-red-700',
      calm: 'bg-green-100 text-green-700',
      cheerful: 'bg-pink-100 text-pink-700',
      surprised: 'bg-purple-100 text-purple-700',
      tired: 'bg-brown-100 text-brown-700',
      confident: 'bg-amber-100 text-amber-700',
      fearful: 'bg-black/10 text-black/70'
    }
    const key = emotion.toLowerCase();
    return emotionColors[key];
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="flex flex-col items-center w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
        <div className="font-extrabold font-mono text-3xl mb-2 text-center ">
          Share Your Reflection
        </div>
        <div className="text-md font-sans text-gray-500 text-center mb-6">
          Tell us what's on your mind, and we'll help you understand your emotions
        </div>
        <div className="w-full mb-2">
          <textarea ref={inputref} value={inputValue} onChange={e => setInputValue(e.target.value.slice(0, max_len))} placeholder="I feel nervous about my job interview..." rows={6} className="w-full p-3 border-2 border-black/10 rounded-lg text-sm placeholder-gray-400 resize-none" maxLength={max_len} disabled={Loading}/>
          <div className="text-xs text-right text-gray-400 mt-1">{inputValue.length}/{max_len} characters</div>
        </div>
        <button onClick={FetchResponse} className={`w-full py-3 mt-4 rounded-lg font-semibold text-white text-lg duration-300 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 hover:opacity-80 hover:shadow-xl ${Loading ? "cursor-not-allowed" : ""}`}>
          {Loading ? (
            <span className="flex items-center gap-2">
              <ScaleLoader height={15} width={6} radius={10} color="#ffffff" /> Analyzing...
            </span>
          ) :"Analyze my Emotions"}
        </button>
        
        <div className={`w-full mt-8 ${emotion && confidence ? "" : "hidden"}   `}>
          <div className={`rounded-xl p-6 shadow-lg flex flex-col items-center font-bold min-h-[100px] ${getEmotionColor(emotion)}`} >
            <div className="text-xl mb-2">🧠 {emotion}</div>
            <div className="text-md font-mono">
              <span className="font-thin">Confidence:</span> {confidence}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
