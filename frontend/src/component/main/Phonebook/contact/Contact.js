import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';
import { BsInfoCircle } from 'react-icons/bs';
import './contact.css';
import { useState } from 'react';
import ContactInfo from './Info/ContactInfo';

const Contact = ({ val, deleteContact, editHandler }) => {
  const [showInfoPopup, setShowInfopopup] = useState(false);
  const openPopup = () => {
    setShowInfopopup((prev) => setShowInfopopup(!prev));
  };

  return (
    <div className='contact-container'>
      {showInfoPopup && (
        <ContactInfo showInfoPopup={openPopup}>
          <section style={{display:"flex",flexDirection:'column',alignItems:'flex-start'}}>
            
              <h2>Name: {val.name}</h2>
              <h2>Phone: {val.phone}</h2>
              {val.email && <h2>Email: {val.email}</h2>}
            
          </section>
        </ContactInfo>
      )}

      <section className='image-container'>
        <img
          src={!val.image ? 'https://i.pravatar.cc/300' : val.image}
          alt='none'
        />
      </section>
      <section
        className='user-details'
        style={{ alignSelf: 'center' }}
      >
        <p style={{fontSize:'1.5rem'}}>{val.name}</p>
      </section>

      <section style={{ alignSelf: 'center' }}>
        <i onClick={() => editHandler(val._id)}>
          <MdModeEdit />
        </i>

        <i onClick={() => deleteContact(val._id)}>
          <FaRegTrashAlt />
        </i>
        <i onClick={openPopup}>
          <BsInfoCircle />
        </i>
      </section>
    </div>
  );
};

export default Contact;
