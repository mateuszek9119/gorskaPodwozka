import styles from '../css/bottomsBar.module.css'
import { BsHouseDoor } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { MdAdd } from "react-icons/md";
import { PiCoffeeDuotone } from "react-icons/pi";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Link, useLocation } from 'react-router-dom';


function BottomsBar ({ onAddClick, onSearchClick}){

  const location = useLocation();
  const isMainPage = location.pathname === '/';
  const isCoffeePage = location.pathname === '/info/postaw-kawe';
  
  return(
    <div className={styles['bottom-bar']}>

      {isMainPage ? 
      <>
        <button className={styles.iconButton} onClick={onSearchClick}>
          <GoSearch size={24}/>
          <span>Szukaj</span>
        </button>
      </>:
      <>
       <Link to="/" className={styles.iconButton}>
          <BsHouseDoor size={24}/>
          <span>Główna</span>
        </Link>
      </>
      }
      
      
      {isMainPage &&
       <button className={styles.iconButton} onClick={onAddClick}>
        <MdAdd size={24}/>
        <span>Dodaj</span>
      </button>
      }

      {(!isMainPage && !isCoffeePage)?(
             <Link to="/info/postaw-kawe" className={styles.iconButton}>
        <PiCoffeeDuotone size={24}/>
        <span>Wesprzyj</span>
      </Link>
      ):null
     
      }

      
      

      <Link to="/info" className={styles.iconButton}>
        <BiDotsHorizontalRounded size={24}/>
        <span>Więcej</span>
      </Link>

    </div>
  )

}

export default BottomsBar