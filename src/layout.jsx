import { Outlet } from 'react-router-dom';
import { MdClose, MdMinimize, MdOutlineTerminal, MdMenu, MdOutlineSearch } from 'react-icons/md';

const NavBar = () => {
  return (
    <div className="nav-bar">
      <div className="left-command-bar">
        <button className="cmd-btn">
          <MdOutlineTerminal size={25} />
        </button>
      </div>
      <div className="middle-bar">guest@lukes-portfolio: ~</div>
      <div className="right-command-bar">
        <button className="cmd-btn">
          <MdOutlineSearch size={25} />
        </button>
        <button className="cmd-btn">
          <MdMenu size={25}/>
        </button>
        <button className="circle-cmd-btn">
          <MdMinimize size={15} />
        </button>
        <button className="circle-cmd-btn">
          <MdClose size={15} />
        </button>
      </div>
    </div> 
  );
}

const Footer = () => {
  return (
    <div className="footer">

    </div>
  );
}

export const Layout = () => {
  return (
    <div className="layout">
        <NavBar />
        <Outlet />
        <Footer />
    </div>
  );
}
