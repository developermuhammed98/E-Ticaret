 
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Formcargo from './Formcargo';
import Kargolist from './Kargolist';
import Yenisiparis from './Yenisiparis';
import Siparislist from './Siparislist';
import Yeniurun from './Yeniurun';
import Yeniuruntablo from './Yeniuruntablo';
import Musterikayit from './Musterikayit';
import Yenimusterilist from './Yenimusterilist';
import Login1 from './Login1';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Formcargo" element={<Formcargo />} />
        <Route path="/Kargolist" element={<Kargolist />} /> 
        <Route path="/Yenisiparis" element={<Yenisiparis />} />
        <Route path="/Siparislist" element={<Siparislist />} />
        <Route path="/Yeniurun" element={<Yeniurun />} />
        <Route path="/Yeniuruntablo" element={<Yeniuruntablo />} />
        <Route path="/Musterikayit" element={<Musterikayit />} />
        <Route path="/Yenimusterilist" element={<Yenimusterilist />} />
        <Route path="/" element={<Login1 />} />

      </Routes>
    </div>
  );
}

export default App;
