import { Link } from "react-router-dom";

export interface HeaderProps {
}

export function Header (props: HeaderProps) {
  return (
          // <header className="header">
          //       <div className="container">
          //       <Link to="/">Home</Link>
          //       <Link to="/login">Login</Link>
          //       <Link to="/styleguides">Styleguides</Link>
          //       <Link to="/register">Register</Link>
          //       <Link to="/dashboard">Dashboard</Link>
          //       <Link to="/404-page-test">page not found</Link>
          //       </div>
          //   </header>
             <header className="header">
             <nav className="text-white bg-black">
                     <div className="max-w-7xl mx-auto flex justify-between items-center relative">
                         <img width="186" src="https://aht-d1-backend.arrowhitech.net/static/img/home-new/Amtech_Charcoal_clearcut.png" alt="" />
                         <ul className="flex font-semibold">
                          <Link className="menu-item group-hover:border-white" to="/">Home</Link>
                          <Link className="menu-item group-hover:border-white" to="/login">Login</Link>
                          <Link className="menu-item group-hover:border-white" to="/styleguides">Styleguides</Link>
                          <Link className="menu-item group-hover:border-white" to="/register">Register</Link>
                          <Link className="menu-item group-hover:border-white" to="/dashboard">Dashboard</Link>
                             <li className='group'>
                                 <Link to="products" className='menu-item group-hover:border-white'>Products</Link>
                                 <div className="grid grid-cols-4 w-full p-5 absolute top-full left-0 bg-black mt-14 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-0 transition-all duration-500">
                                     <ul className="p-2">
                                         <li>
                                             <Link to="consumables" className='mega-sub-item-title'>Consumables</Link>
                                         </li>
                                         <li>
                                             <a href="#" className='mega-sub-item'>Equipment</a>
                                         </li>
                                         <li>
                                             <a href="#" className='mega-sub-item'>On Special</a>
                                         </li>
                                        
                                     </ul>
                                 </div>
                             </li>
                             <li className='group relative'>
                                 <Link replace to="category" className='menu-item group-hover:border-white'>Category</Link>
                                 <ul className="absolute left-0 bg-black w-max mt-14 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-0 transition-all duration-500">
                                     <li className="sub-dropdown relative">
                                         <a href="#" className='menu-sub-item'>Consumables</a>
                                         <ul className="sub-dropdown-content absolute left-full top-full bg-black w-max invisible translate-all duration-500">
                                             <li>
                                                 <a href="#" className='menu-sub-item'>Equipment</a>
                                             </li>
                                             <li>
                                                 <a href="#" className='menu-sub-item'>On Special</a>
                                             </li>
                                         </ul>
                                     </li>
                                     <li>
                                         <a href="#" className='menu-sub-item'>Equipment</a>
                                     </li>
                                     <li>
                                         <a href="#" className='menu-sub-item'>On Special</a>
                                     </li>
                                     
                                 </ul>
                             </li>
                             <li>
                                 <a href="#" className='menu-item'>Height Safety</a>
                             </li>
                             <li>
                                 <a href="#" className='menu-item'>Physio</a>
                             </li>
                         </ul>
                     </div>
             </nav>
        </header>
  );
}
