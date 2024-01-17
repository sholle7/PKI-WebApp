"use client"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter();

  const redirectToBuyerLogin = () => {
    router.push("/loginBuyer");
  }

  const redirectToEmployeeLogin = () => {
    router.push("/loginEmployee");
  }

  return (
    <div className='homepage'>
      <div className='logo'>
      
      </div>

      <div className='buttonsForm'>
        <button className="loginButton" onClick={() => redirectToBuyerLogin()}>Uloguj se kao kupac</button>
        <h5 id="divider"><span>Or</span></h5>
        <button className="loginButton" onClick={() => redirectToEmployeeLogin()}>Uloguj se kao zaposleni</button>
      </div>
    </div>
  )
}
