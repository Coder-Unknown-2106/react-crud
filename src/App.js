import { Route, Routes } from 'react-router-dom';
import './App.css';
// import Display from './axoisdata/Display';
import FormRegister from './form_register/FormRegister';
import Login from './login/Login';
import Home from './home/Home';
import DashBoard from './dashBoard/DashBoard';
import Protect from './protect/Protect';
import Navbar from './home/Navbar';
import Footer from './footer/Footer';
import AddProduct from './products/AddProduct';
import EditProduct from './products/editProdcts/EditProduct';
import Missing from './missing/Missing';
import ProtectLogin from './protect/ProtectLogin';
import CheckLogin from './login/checkLogin/CheckLogin';
import ListProduct from './listProduct/ListProduct';
import ReactBox from './react-table/ReactBox';
import SummaProduct from './products/editProdcts/Summaedit';
// import SummaProduct from './products/editProdcts/Summaedit';
function App() {


  return (
    <div >
      <Navbar />
      {/* <ReactBox /> */}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<ProtectLogin />} >
          <Route index element={<Login />} />
        </Route>
        <Route path='/checkLogin' element={<Protect />}>
          <Route path='/checkLogin' element={<CheckLogin />} />
        </Route>
        <Route path='/register' element={<FormRegister />} />
        <Route path='/dashBoard' element={<Protect />}>
          <Route index element={<DashBoard />} />
        </Route>
        <Route path='/addProduct' element={<Protect />}>
          <Route index element={<AddProduct />} />
        </Route>
        <Route path='/listProduct' >
          <Route index element={<ListProduct />} />
          <Route path='edit/:id' element={<SummaProduct />} />
        </Route>
        <Route path='*' element={<Missing />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
