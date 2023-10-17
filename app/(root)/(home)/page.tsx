import Image from "next/image";
import {UserButton} from '@clerk/nextjs'

const Home = () => {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <h1 className="h1-bold" >Welcome to Next.js 13!</h1>
      <h1 className="h2-bold" >Welcome to Next.js 13!</h1>
      <h1 className="h3-bold" >Welcome to Next.js 13!</h1>
    </div>
  )
}

export default Home