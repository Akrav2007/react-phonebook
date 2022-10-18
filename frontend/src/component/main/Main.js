import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useState, useEffect } from 'react';
import data from './Data';
import ContactList from './Phonebook/contactList/ContactList';
import Form from './Phonebook/form/Form';

const defaultValue = {
  id: '',
  name: '',
  phone: '',
  email: '',
  validateName: '',
  validatePhone: '',
  image: 'https://i.pravatar.cc/150?img=',
};

const Main = () => {
  const [values, setValue] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    description: '',
    validateName: '',
    validatePhone: '',
    image: 'https://i.pravatar.cc/150?img=',
  });
  const [searchName, setSearchName] = useState('');
  const [contacts, setContacts] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [ifEdit, setIfEdit] = useState(true);
  const [nameIsValid, setNameIsValid] = useState(false);
  const [phoneIsValid, setPhoneIsvalid] = useState(false);
  useEffect(() => {
    fetchContacts();
  }, []);
  useEffect(() => {
    setNameIsValid(false);
  }, [values.name]);
  useEffect(() => {
    setPhoneIsvalid(false);
  }, [values.phone]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({
      ...values,
      [name]: value,
    });
  };

  const openForm = () => {
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
    setValue(defaultValue);
  };

  const searchValue = (e) => {
    setSearchName(e.target.value);
  };

  const addToList = (e) => {
    e.preventDefault();
    /*validate duplicate values*/
    if (values.name.trim() === '') {
      values.validateName = 'Not be Blank';
      setNameIsValid(true);
      return;
    }

    if (values.phone.trim() === '') {
      values.validatePhone = 'Not be Blank';
      setPhoneIsvalid(true);
      return;
    }

    const newArray = contacts.filter((el) => el.id !== values.id);
    for (const el of newArray) {
      if (el.name.toLowerCase() === values.name.toLocaleLowerCase()) {
        values.validateName = 'this name is exist in another person';
        setNameIsValid(true);
        return;
      }
      setNameIsValid(false);
      if (el.phone === values.phone) {
        values.validatePhone = 'this phone is exist in another person';
        setPhoneIsvalid(true);
        return;
      }
      setPhoneIsvalid(false);
    }
    /********************************* */
    const requestBody = {
      query: `
          mutation {
            createContact(contactInput: {name: "${values.name}", description: "${values.description}", phone: "${values.phone}", email: "${values.email}",image:"${values.image}"}) {
              _id
              name
              description
              phone
              image
             
            }
          }
        `,
    };

    fetch('http://localhost:8000/graphql',{
      method:'POST',
      body:JSON.stringify(requestBody),
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(result=>{
      return result.json()
    }).then(resData=>{
      fetchContacts();
    })
    .catch(err=>{
      console.log(err)
    })

    // // if (!ifEdit) {
    // //   setContacts(
    // //     contacts.map((el) => (el.id === values.id ? { ...el, ...values } : el))
    // //   );

    // //   setIfEdit(true);
    // // } else {
    // //   setContacts([
    // //     ...contacts,
    // //     {
    // //       id: uuidv4,
    // //       name: values.name,
    // //       phone: values.phone,
    // //       email: values.email,
    // //       image: values.image,
    // //     },
    // //   ]);
    // }

    setShowForm(false);
    setValue(defaultValue);
  };

  //Sorting method
  contacts.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );
  //delete contact from the book by id
  const deleteContact = (id) => {
    const deleteUser = contacts.filter((el) => el.id !== id);
    setContacts(deleteUser);
  };
  /*DELETE ALL CONTACTS FROM THE LIST*/
  const deleteAllContacts = () => {
    setContacts([]);
  };

  const editHandler = (id) => {
    setShowForm(true);

    let editContact = contacts.find((el) => {
      return el.id === id;
    });

    setValue(editContact);

    setIfEdit(false);
  };
const fetchContacts=()=>{
  const requestBody = {
    query: `
        query {
          contacts{
            _id
            name
            email
            phone
            image
            
            
          }
        }
      `
  };

  fetch('http://localhost:8000/graphql',{
    method:'POST',
    body:JSON.stringify(requestBody),
    headers:{
      'Content-Type': 'application/json',
    }
  })
  .then((res) => {
    
    return res.json();
  })
  .then((resData) => {
    if (resData) {
      const contacts=resData.data.contacts;
      setContacts(contacts)
    }
  })
  .catch((err) => {
    console.log(err);
  });
}
  return (
    <main>
      <Form
        closeForm={closeForm}
        showForm={showForm}
        addToList={addToList}
        handleChange={handleChange}
        values={values}
        nameIsValid={nameIsValid}
        phoneIsValid={phoneIsValid}
      />
      <ContactList
        searchName={searchName}
        openForm={openForm}
        searchValue={searchValue}
        contacts={contacts}
        editHandler={editHandler}
        deleteContact={deleteContact}
        deleteAllContacts={deleteAllContacts}
      />
    </main>
  );
};
export default Main;
