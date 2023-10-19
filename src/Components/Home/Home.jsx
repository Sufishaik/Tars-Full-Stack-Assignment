import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import "../Home/HomeStyle.css"
import MiddleImage from "../../assets/daniel-leone-v7daTKlZzaw-unsplash 1.png"
import SearchIcon from "../../assets/Group 4.svg"
import Imges from '../ImgContainer/Imges'
import Loading from "../../assets/lf20_cTXX7h.json].svg"
import axios from 'axios'
import ModalStyle from '../Modal/ModalStyle'

function Home() {
  const [resp, setresp] = useState([]);
  const [text, settext] = useState('');
  const [search, setsearch] = useState([]);
  const [changeTag, setchangeTag] = useState(0)
  const [lightToggle, setlightToggle] = useState(1)
  const [modalData, setmodalData] = useState(null);
  const API = 'https://api.unsplash.com';
  const KEY = 'ARGKOV-qJT1nICBmFt_PBKzlJyv0Dzt4yQ7bnXiARJg';
  const [load, setload] = useState(false);

  const searchImages = async () => {
    try {
      const res = await axios.get(`${API}/search/photos`, {
        params: {
          query: text,
        },
        headers: {
          Authorization: `Client-ID ${KEY}`
        }
      })
      setsearch(res.data.results)
      console.log(res.data.results)
    } catch (err) {
      console.log('Error', err)
    }
  }

  const imagesCont = async () => {
    try {
      const res = await axios.get(`${API}/photos`, {

        headers: {
          Authorization: `Client-ID ${KEY}`
        }
      })
      setresp(res.data)
      // console.log(res.data)
    } catch (err) {
      console.log('Error', err)
    }
  }
  useEffect(() => {
    if (text === '') {
      imagesCont();
    } else {
      searchImages()
    }
  }, [text])
  const seletedID = async (id) => {
    try {
      const response = await axios.get(`${API}/photos/${id}`, {
        headers: {
          Authorization: `Client-ID ${KEY}`,
        },
      });

      return setmodalData(response.data)
    }

    catch (error) {
      console.error('Error fetching image details', error);
      return null;
    }


  }
  return (
    <>

      <div className='home-cont'>
        <Header resp={resp} text={text} settext={settext} changeTag={changeTag} lightToggle={lightToggle} setlightToggle={setlightToggle} setchangeTag={setchangeTag} />
        {
          resp.length < 1 ?
            <div className='loading'>
              <img src={Loading} alt="" />
              <p>Loading some awesome Images...</p>
            </div>
            :
            <>

              {
                changeTag == 0 &&

                <div className='middle-cont'>
                  <img src={MiddleImage} alt="" />
                  <div className='img-content'>
                    <h1>Download High Quality Images by creators</h1>
                    <p>Over 2.4 million + stock Images by our talented community</p>
                    <div className='ser-div'>
                      <img src={SearchIcon} alt="" />
                      <input type="text" name="" id="" placeholder='Search high resolution Images, categories, wallpapers' />
                    </div>
                  </div>
                </div>
              }
              {
                changeTag == 1 &&
                <div className='search-lines'>
                  <h1>{text}</h1>
                </div>
              }

              <Imges text={text} resp={resp} setresp={setresp} search={search} modalData={modalData} setmodalData={setmodalData} seletedID={seletedID} lightToggle={lightToggle} setlightToggle={setlightToggle} />
            </>

        }
      </div>




    </>
  )
}

export default Home
