import Header from './Header.jsx';
import {Routes, Route} from "react-router-dom"
import CallList from './pages/CallList.jsx';
import CallDetail from './pages/CallDetail.jsx';

function App() {
  return (
    <div className='w-[376px] h-[666px] z-100 bg-[#DBDDEA] rounded-[3px] shadow-[0_0_5px_0_rgba(0,0,0,0.9)] overflow-auto'>
      <Header/>
      <Routes>
        <Route path='/' element={<CallList />} />
        <Route path='/activities/:id' element={<CallDetail />} />
      </Routes>
    </div>
  );
}

export default App;
