import React from 'react';
import { Link } from 'react-router-dom';



export default function Footer() {


  return (
    <footer className={`w-full py-20  px-4 border-t border-gray-300 pt-4`}>
        
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} <Link to="/" className={`hover:text-gray-400 `}>
                QKGEN
              </Link>. All rights reserved.</p>
          <p className="mt-2">Developed by <a href="https://github.com/quasimkhan" className="hover:text-gray-400 font-bold text-yellow-400">Quasim Khan</a></p>
        </div>
        <div className="mt-4 md:mt-0">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className={`hover:text-gray-400 text-yellow-400`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/post" className={`hover:text-gray-400 text-yellow-400`}>
                Generate Image
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
