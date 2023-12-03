import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChatSvg from '../../assets/svg/chatSvg';
import CreateSvg from '../../assets/svg/createSvg';
import HomeSvg from '../../assets/svg/homeSVG';
import LogoutSvg from '../../assets/svg/logoutSvg';
import './navBar.scss';
import SearchSvg from '../../assets/svg/searchSvg';
import defaultUser from '../../assets/img/user.jpg';
import { useRouter } from '../../hooks/useRouter';
import { HOME_LINK, PROFILE_LINK } from '../../links/link';

const NavBar = () => {
  const { pushRoute } = useRouter();
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1];

  useEffect(() => {
    handleActiveTab();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleActiveTab = () => {
    const navBarItemList = document.querySelector('.navBar-items-list');
    const navBarItems = navBarItemList?.querySelectorAll('.navBar-item');
    const active = navBarItemList?.querySelector('.active');
    const navBarHome = navBarItemList?.querySelector('.navBar-item-home');

    if (active) {
      active.classList.remove('active');
    }

    if (currentPath.length === 0) {
      navBarHome.classList.add('active');
      return;
    }

    navBarItems.forEach((item) => {
      if (item.classList.contains('navBar-item-' + currentPath)) {
        item.classList.add('active');
      }
    });
  };

  const handleRedirect = (route) => {
    pushRoute(route);
  };

  return (
    <nav className='navBar-container'>
      <div className='navBar-logo'>
        <span>𝓝𝓮𝓽𝓝𝓮𝓼𝓽</span>
        {/* <img src={LogoSvg} alt='logo' /> */}
      </div>
      <ul className='navBar-items-list'>
        <li
          onClick={() => handleRedirect(HOME_LINK)}
          className='navBar-item navBar-item-home'
        >
          <HomeSvg />
          <span className='navBar-item-desc'>Home</span>
        </li>
        <li className='navBar-item navBar-item-search'>
          <SearchSvg />
          <span className='navBar-item-desc'>Search</span>
        </li>
        <li className='navBar-item navBar-item-chat'>
          <ChatSvg />
          <span className='navBar-item-desc'>Messgage</span>
        </li>
        <li className='navBar-item navBar-item-create'>
          <CreateSvg />
          <span className='navBar-item-desc'>Create</span>
        </li>
        <li
          onClick={() => handleRedirect(PROFILE_LINK)}
          className='navBar-item navBar-item-profile'
        >
          <img src={defaultUser} alt='' />
          <span className='navBar-item-desc'>Profile</span>
        </li>
      </ul>
      <div className='navBar-logout' onClick={() => handleLogout()}>
        <LogoutSvg />
        <span>Logout</span>
      </div>
    </nav>
  );
};

export default NavBar;
