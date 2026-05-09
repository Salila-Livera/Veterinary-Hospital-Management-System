import React from 'react'
import Logo from '../assets/VetCare.png'

function Header() {
  return (
    <div>
        <nav className='bg-white p-4 flex justify-between items-center'>
            <img src={Logo} alt='logo' className='w-24'/>
            <div>
            <ul className=' flex flex-row gap-20'>
                <li className='inline-block text-lg ml-4 cursor-pointer'><a href='/'> Home</a></li>
                <li className='inline-block text-lg ml-4'>About</li>
                <li className='inline-block text-lg ml-4'>Services</li>
                <li className='inline-block text-lg ml-4'>Contact</li>
                <li><a href='/login' className='text-black bg-orange-300 rounded-full px-8 py-2 text-lg'>Login</a></li>
            <li><a href='/create' className=' mr-10 text-black bg-orange-400 rounded-full px-8 py-2 text-lg'>Register</a></li>
            </ul>

            
            </div>
        </nav>
    </div>
  )
}

export default Header