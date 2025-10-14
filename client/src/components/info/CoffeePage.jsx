import React from "react";
import style from '../../css/rulesAndPolicy.module.css'
import { IoTrailSignSharp } from "react-icons/io5";
import { FaMountain } from "react-icons/fa";
import { MdNightShelter } from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";
import { Link } from "react-router-dom";
import Bars from "../Bars";

const CoffeePage = () => {

  const coffees = [
    {
      size: "small",
      price: "9 zł",
      label: "W schronisku",
      reactIcon: <MdNightShelter size={24}/>,
      icon: "coffee-small-primary.svg",
      url: "https://buycoffee.to/mateuszp?coffeeSize=small",
    },
    {
      size: "medium",
      price: "20 zł",
      label: "Na szlaku",
      reactIcon: <IoTrailSignSharp  size={24} />,
      icon: "coffee-medium-primary.svg",
      url: "https://buycoffee.to/mateuszp?coffeeSize=medium",
    },
    {
      size: "large",
      price: "45 zł",
      label: "Na szczycie",
      reactIcon: <FaMountain size={24} />,
      icon: "coffee-large-primary.svg",
      url: "https://buycoffee.to/mateuszp?coffeeSize=large",
    },
    {
      size: "custom",
      price: "inna kwota",
      reactIcon: <FaHeartbeat size={24} />,
      label: "Od serca",
      icon: "coffee-large-primary.svg", 
      url: "https://buycoffee.to/mateuszp", 
    },
  ];

  return (

    <>
    
      <div className={style.rulesAndPolicyConteiner}>

        <div>
          <h3>
            <img src="/logo/logoApp.png" alt="logo" className='logo'  /> Górska kawa wsparcia
          </h3>
          <p>
            Kawa ☕ smakuje najlepiej w górach ⛰️, ale ta przy pisaniu kodu 👨‍💻 też potrafi być pyszna.
            A może kiedyś uda się wypić ją razem gdzieś na szlaku...
          </p>
        </div>

        <div className={style.linkCoffeeContainer}>

          {coffees.map((coffee) => (

            <a
              key={coffee.size}
              href={coffee.url}
              className={`${style.linkCoffee} ${coffee.size === "custom" ? style.linkCoffeeFull : ""}`}
              target="_blank"
              rel="noopener noreferrer"
              title={`Postaw kawę${coffee.size !== "custom" ? ` za ${coffee.price}` : ""}`}
            >
              <span className={style.spanCoffee}>{coffee.label}</span>
              <div className={style.coffeeIconsConteiner}>
                {coffee.reactIcon}
                <img
                  src={`https://buycoffee.to/img/${coffee.icon}`}
                  alt={`${coffee.size} coffee icon`}
                  className={style.imgCoffee}
                />
              </div>           
              <small>{coffee.price}</small>
            </a>
          ))}

        </div>

        <figure style={{textAlign: 'center'}}>
          <img src="/logo/logo2.png" alt="logo" width={200} height={'auto'}  />
        </figure>
          
        <h3>
            Dziękuję za wsparcie !!! 🙂
        </h3>

        <p className={style.wrapperBackLink}>
          <Link className={style.backLink} to="/info">← Powrót</Link>
        </p>

      </div>

      <p className={style.mycopyright} >
        © 2025 GórskaPodwózka — wszystkie prawa zastrzeżone. Autor: Mateusz
      </p>

      <Bars />

    </>
    
  );
};

export default CoffeePage;
