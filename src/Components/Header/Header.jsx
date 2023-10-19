import React, { useEffect, useState } from 'react'
import "../Header/HeaderStyle.css";
import ImageGallery from "../../assets/Image Gallery.svg"
import SearchIcon from "../../assets/Group 4.svg"
import CutIcon from "../../assets/Vector 1 (1).svg"
import WhiteLight from "../../assets/Rectangle 9 (1).svg"
import WhiteLightDot from "../../assets/Ellipse 5.svg"
import DarkLight from "../../assets/Rectangle 9 (2).svg"
import DarkLightDot from "../../assets/Ellipse 5 (1).svg"
function Header({ text, settext, changeTag, setchangeTag, lightToggle, setlightToggle }) {

    const [toggle, settoggle] = useState(false);
    return (
        <>


            <div className={`${lightToggle == 1 ? 'nav-cont light' : 'nav-cont dark'}`}>
                <nav className={`${lightToggle == 1 ? 'nav light' : 'nav dark'}`}>
                    <img src={ImageGallery} alt="" />
                    <div className={`${lightToggle == 1 ? 'middle-cont light' : 'middle-cont dark'}`}>

                        <div className={`${lightToggle == 1 ? 'search-div light' : 'search-div dark'}`}>

                            <div className='search-child'>
                                <img src={SearchIcon} alt="" />
                                <input type="text" name="" id="" placeholder='Search Images here' value={text} onChange={(e) => {
                                    settext(e.target.value);
                                    settoggle(true)
                                    setchangeTag(1)

                                }} />
                            </div>
                            {
                                text &&
                                <img src={CutIcon} className='cut' alt="" />
                            }
                        </div>

                        <ul className={`${lightToggle == 1 ? 'ul light' : 'ul dark'}`}>
                            <li><a href="">Explore</a></li>
                            <li><a href="">Collection</a></li>
                            <li><a href="">Community</a></li>
                        </ul>
                    </div>
                    {
                        lightToggle == 1 &&
                        <div className='light-mode'>
                            <p>Dark Mode</p>
                            <img src={WhiteLight} alt="" onClick={() => setlightToggle(2)} />
                            <img src={WhiteLightDot} alt="" className='whitedot' onClick={() => setlightToggle(2)} />
                        </div>
                    }
                    {
                        lightToggle == 2 &&
                        <div className='light-mode'>
                            <p>Light Mode</p>
                            <img src={DarkLight} alt="" onClick={() => setlightToggle(1)} />
                            <img src={DarkLightDot} alt="" className='darkdot' onClick={() => setlightToggle(1)} />
                        </div>
                    }
                </nav>
            </div>




        </>
    )
}

export default Header
