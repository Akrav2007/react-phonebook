import React from 'react';

import Main from './component/main/Main';
import Footer from './component/footer/Footer';
import Header from './component/header/Header';

const App = () => {
  const date=new Date();
  return(
    <div className='app'>
      <Header name='PhoneBook'/>
      <Main/>
      <Footer date={date.getFullYear()}/>
    </div>
  )
  };
export default App;
