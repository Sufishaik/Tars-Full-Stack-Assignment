import React, { useEffect, useState } from 'react'
import "../ImgContainer/ImagesStyle.css"
import axios from 'axios'
import Like from "../../assets/like.svg"
import Modal from 'react-modal';
import Insta from "../../assets/instagram 2.svg"
import Twi from "../../assets/twitter 1.svg"

import X from "../../assets/Group 25.svg"

function Imges({ resp, setresp, text, search, seletedID, lightToggle, modalData }) {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const API = 'https://api.unsplash.com';
    const KEY = 'ARGKOV-qJT1nICBmFt_PBKzlJyv0Dzt4yQ7bnXiARJg';

    
    function openModal() {
        setIsOpen(true);
    }
    console.log(modalData)
    

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
    const customStyles = {
        content: {
            // top: '50%',
            left: '20%',
            right: 'auto',
            bottom: 'auto',
            width: '1045px',
            height: '500px',
            // marginRight: '50%',
            margin: '0px auto'
            // transform: 'translate(-50%, -50%)',
        },
    };
    const handleFilters = async (id) => {
        try {
            const res = await axios.get(`${API}/search/photos`, {
                params: {
                    query: id,
                },
                headers: {
                    Authorization: `Client-ID ${KEY}`
                }
            })
            setresp(res.data.results)
            closeModal()
            console.log(res.data.results)
        } catch (err) {
            console.log('Error', err)
        }
    }

    return (
        <div className={lightToggle == 1 ? 'img-div light' : 'img-div dark'}>
            {/* img-div' */}
            {
                resp.length > 0 && text === '' ? resp.map((val) => {
                    return (
                        <>
                            <div className='img-container' key={val.id} onClick={() => {
                                // getIDImages(val.id);
                                seletedID(val.id)
                                openModal()
                            }}>
                                <img className='big-img' src={val.urls.small_s3} alt="" />
                                <div className={lightToggle == 1 ? 'img-bottom light' : 'img-bottom dark'}>
                                    {/* img-bottom */}
                                    <div className={lightToggle == 1 ? 'img-name  light' : 'img-name  dark'}>
                                        {/* img-name */}
                                        <img src={val.user.profile_image.small} alt="" />
                                        <div className='img-user-name'>
                                            <p>{val.user.name.slice(0,10)}...</p>
                                            <span>{val.user.username}</span>
                                        </div>
                                    </div>
                                    <div className={lightToggle == 1 ? 'img-rate  light' : 'img-rate  dark'}>
                                        <img src={Like} alt="" />
                                        <span>{val.likes}</span>
                                    </div>
                                </div>

                            </div>
                        </>
                    )
                })
                    :
                    search.map((val) => {
                        return (
                            <>
                                <div className='img-container' onClick={openModal}>
                                    <img className='big-img' src={val.urls.small_s3} alt="" />
                                    <div className={lightToggle == 1 ? 'img-bottom light' : 'img-bottom dark'}>
                                        <div className={lightToggle == 1 ? 'img-name  light' : 'img-name  dark'}>
                                            <img src={val.user.profile_image.small} alt="" />
                                            <div className='img-user-name'>
                                                <p>{val.user.name.slice(0,10)}...</p>
                                                <span>{val.user.username}</span>
                                            </div>
                                        </div>
                                        <div className={lightToggle == 1 ? 'img-rate  light' : 'img-rate  dark'}>
                                            <img src={Like} alt="" />
                                            <span>{val.likes}</span>
                                        </div>
                                    </div>

                                </div>
                            </>
                        )
                    })
            }


            <Modal

                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='modal'>
                    <div className='closeModal' onClick={closeModal}>
                        {/* <img src={C ircle} alt="" className='circle'/> */}
                        <img src={X} alt="" className='x' />
                    </div>
                    <img className='modalImg' src={modalData && modalData.urls.small_s3} alt="" />
                    <div className='modal-details'>
                        <div className='img-user-name'>
                            <div className='user-sec'>

                                <img src={modalData && modalData.user.profile_image.small} alt="" />
                                <div className='user-name'>
                                    <p>{modalData && modalData.user.name}</p>
                                    <span>@{modalData && modalData.user.username}</span>
                                </div>
                            </div>
                            <div className='user-icon'>
                                <div className='user-icon-one'>
                                    <img src={Insta} alt="" />
                                    /
                                    <p>{modalData && modalData.user.social.instagram_username}</p>
                                </div>
                                <div className='user-icon-one'>

                                    <img src={Twi} alt="" />
                                    /
                                    <p>{modalData && modalData.user.social.twitter_username}</p>
                                </div>
                            </div>
                        </div>
                        <div className='user-likes'>
                            <p>{modalData && modalData.downloads} downloads</p>
                            <div className='user-likes-child'>

                                <img src={Like} alt="" />
                                <p>{modalData && modalData.likes}</p>
                            </div>
                        </div>
                    </div>
                    <div className='related-tags'>
                        <h1>Related Tags</h1>
                        <div className='related-btns'>
                            <button onClick={() => handleFilters('Animal In the World')}>Animal In the World</button>
                            <button onClick={() => handleFilters('Animal Images & Pictures')}>Animal Images & Pictures</button>
                            <button onClick={() => handleFilters('Elephant Images')}>Elephant Images</button>
                            <button onClick={() => handleFilters('Nature Images')}>Nature Images</button>
                            <button onClick={() => handleFilters('Animal walking')}>Animals walking</button>
                            <button onClick={() => handleFilters('Natural habitat')}>Natural habitat</button>
                            <button onClick={() => handleFilters('Wild')}>Wild</button>
                            <button onClick={() => handleFilters('Animal pictures')}>Animal pictures</button>
                            <button onClick={() => handleFilters('Animal')}>Animal</button>
                            <button onClick={() => handleFilters('Giant animals')}>Giant animals</button>
                            <button onClick={() => handleFilters('Forst animals')}>Forst animals</button>
                        </div>
                    </div>
                </div>
            </Modal>
            {/* </div> */}


        </div>
    )
}

export default Imges
