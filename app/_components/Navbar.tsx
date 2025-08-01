import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-10 w-screen h-20 bg-black/80 text-white">
      <div>
        <p className='text-amber-400 text-xl tracking-wider'>AI Newsletter</p>
      </div>
      <div>
        <p>
          <button className='bg-blue-500 w-20 h-10 rounded-xl cursor-pointer hover:bg-blue-500/70'>Sign Out</button>
        </p>
      </div>
    </nav>
  );
}

export default Navbar