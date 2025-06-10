import NavBar from "./NavBarr";
import { TiLocation } from "react-icons/ti";
import { Buttons } from "./Buttons";

export default function DownloadPage() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#101015] flex flex-col items-center py-40 px-2 font-robert-medium">
        {/* Hero Section */}
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-gradient-to-br from-[#181828] via-[#23233a] to-[#101015] rounded-3xl shadow-2xl p-6 md:p-12 mb-10 border border-[#23233a]">
          {/* App Image */}
          <img src="/img/gallery-1.webp" alt="App preview" className="w-full max-w-xs md:max-w-sm rounded-2xl shadow-lg object-cover border-2 border-[#23233a] transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer" />
          {/* Title & Description */}
          <div className="flex-1 flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white-100 mb-4 tracking-tight drop-shadow-lg">Download the App Now</h1>
            <p className="text-white-100 text-lg md:text-xl mb-6 max-w-lg leading-relaxed opacity-90">Experience the future of productivity with our intuitive app, designed to streamline your workflow and enhance your daily tasks. Available on all major platforms, it’s never been easier to stay connected and organized.</p>
            <a href="/img/download.webp" download className="inline-block px-10 py-4 text-center bg-gradient-to-r from-blue-700 to-violet-700 hover:from-blue-800 hover:to-violet-800 text-white-100 text-xl rounded-2xl shadow-xl transition-all duration-200 mb-2 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400">Download Now</a>
            {/* Patch Downloads Section (moved here) */}
            <div className="w-full mt-8 text-center flex flex-col gap-3 bg-gradient-to-br from-[#181828] via-[#23233a] to-[#101015] rounded-2xl shadow-xl p-8 border border-[#23233a]">
              <h3 className="text-2xl text-white-100 mb-2 tracking-tight">Download Patches</h3>
              <p className="text-white-100 mb-4 text-lg opacity-90">Keep your app up to date with the latest patches. Download and apply the newest updates below.</p>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <a href="/patches/patch-v1.1.zip" download className="flex-1 px-6 py-4 bg-gradient-to-r from-violet-700 to-blue-700 hover:from-violet-800 hover:to-blue-800 text-white-100 font-semibold rounded-xl shadow-lg text-center transition-all hover:scale-105 active:scale-95 text-lg focus:outline-none focus:ring-2 focus:ring-violet-400">Patch v1.1</a>
                <a href="/patches/patch-v1.0.zip" download className="flex-1 px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white-100 font-semibold rounded-xl shadow-lg text-center transition-all hover:scale-105 active:scale-95 text-lg focus:outline-none focus:ring-2 focus:ring-gray-400">Patch v1.0</a>
              </div>
            </div>
          </div>
        </div>
        {/* Platform Buttons */}
        <div className="w-full max-w-3xl mb-8 items-center text-center">
          <h2 className="text-2xl font-semibold text-white-100 mb-4 tracking-tight">Available on All Platforms</h2>
          {/* Direct Links as Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-2 mb-6">
            <a href="https://drive.google.com/your-game-link" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white-100 text-lg rounded-xl shadow transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 font-bold">Google Drive</a>
            <a href="https://mega.nz/your-game-link" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white-100 text-lg rounded-xl shadow transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400 font-bold">Mega</a>
          </div>
          
        </div>
        {/* Screenshots Grid */}
        <div className="w-full max-w-4xl flex flex-col gap-6 mt-8">
          <h2 className="text-3xl text-white-100 mb-6 text-center tracking-tight drop-shadow-lg">Registration of awards</h2>
            <div className="flex justify-center mb-6">
              <Buttons rightIcon={<TiLocation/>} text="Sign up" className="!bg-blue-100" hrf="/register" />
           
            </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <img src="/img/gallery-2.webp" alt="Screenshot 2" className="rounded-2xl shadow-lg object-cover w-full h-72 border-2 border-[#23233a] transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer" />
            <div className="grid grid-cols-2 gap-6">
              <img src="/img/gallery-3.webp" alt="Screenshot 3" className="rounded-2xl shadow-lg object-cover w-full h-36 border-2 border-[#23233a] transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer" />
              <img src="/img/gallery-4.webp" alt="Screenshot 4" className="rounded-2xl shadow-lg object-cover w-full h-36 border-2 border-[#23233a] transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer" />
              <img src="/img/gallery-5.webp" alt="Screenshot 5" className="rounded-2xl shadow-lg object-cover w-full h-36 col-span-2 border-2 border-[#23233a] transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
