import React from 'react';
import { IoIosPersonAdd } from 'react-icons/io';
import { BsTrash } from 'react-icons/bs';
import Contact from '../contact/Contact';

import './ContactList.css';

const ContactList = ({
  contacts,
  openForm,
  searchName,
  searchValue,
  editHandler,
  deleteContact,
  deleteAllContacts,
  
}) => {
  const list=contacts
  .filter((val) => val.name.toLowerCase().includes(searchName.toLowerCase()))
  .map((val) => (
    <Contact
      val={val}
      key={val._id}
      editHandler={editHandler}
      deleteContact={deleteContact}
    />
  ))
  return (
    <div className='phonebook'>
      <p >{contacts.length}{contacts.length<=1?<> people</>:<> peoples</>}</p>
      <section>
        
        <input
          type='search'
          
          value={searchName}
          onChange={searchValue}
        />
        
        <section className='icons'>
        <i>
        <IoIosPersonAdd onClick={openForm}/>
        </i>
         <i>
         <BsTrash onClick={deleteAllContacts}/>
         </i>
        
        </section>
        
        
        
        
      </section>
      
      {list}
    </div>
  );
};
export default ContactList;
