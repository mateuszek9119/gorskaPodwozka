
import { useEffect, useState } from "react"
import BottomsBar from "./BottomsBar"
import TopBar from "./TopBar.module"




function Bars ({ onAddClick, onSearchClick }){

  const breakpoint = 768;

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return(
    <>
      { isDesktop?
        <TopBar />:
        <BottomsBar onAddClick={onAddClick} onSearchClick={onSearchClick}/>
      }
     
    </>
  )

}

export default Bars