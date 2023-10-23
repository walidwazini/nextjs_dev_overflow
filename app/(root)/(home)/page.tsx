import Image from "next/image";
import ThemeButton from "@/components/DemoThemeButton";

const Home = () => {
  return (
    <div className="w-full h-full dark:bg-slate-800 bg-cyan-400 " >
      <h1 className="h1-bold" >Welcome to Next.js 13!</h1>
      <h1 className="h2-bold" >Welcome to Next.js 13!</h1>
      <h1 className="h3-bold" >Welcome to Next.js 13!</h1>
      {/* <ThemeButton /> */}
      <div className="dark:text-red-700 text-blue-500 font-semibold " >
        Hello
      </div>
    </div>
  )
}

export default Home