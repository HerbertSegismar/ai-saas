import React from 'react'

const Footer = () => {
  return (
    <footer className="text-center">
      <p className=" text-slate-300">
        <span className="text-amber-200">&copy;</span> Copyright&nbsp;
        {new Date().getFullYear()} Herb Segis
      </p>
    </footer>
  );
}

export default Footer