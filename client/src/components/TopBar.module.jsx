import styles from '../css/topBar.module.css'
import { BsHouseDoor } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { MdAdd } from "react-icons/md";
import { PiCoffeeDuotone } from "react-icons/pi";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Link, NavLink, useLocation } from 'react-router-dom';


function TopBar ({ onAddClick, onSearchClick, isDesktop}){

  const location = useLocation();
  const isMainPage = location.pathname === '/';
  const isCoffeePage = location.pathname === '/info';
  const isAboutME = location.pathname === '/info/o-mnie';
  
  return(

    <div className={styles['top-bar']}>

      <Link to="/" className={styles['top-bar-link']} >
        <img src="/logo/logoApp.png" alt="logo" className='logo'  />  
        GórskaPodwózka
      </Link>

        
      <Link to="/info" className={styles['top-bar-link']} isDesktop>
        <span>WIĘCEJ</span>
      </Link>

    </div>
  )

}

export default TopBar