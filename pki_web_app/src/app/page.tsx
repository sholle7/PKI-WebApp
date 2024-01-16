"use client"

import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter();

  return (
    <div className='homepage'>
      <div className='logo'>
      
      </div>

      <div className='buttonsForm'>
        <button className="loginButton">Uloguj se kao kupac</button>
        <h5 id="divider"><span>Or</span></h5>
        <button className="loginButton">Uloguj se kao zaposleni</button>
      </div>
    </div>
  )
}
