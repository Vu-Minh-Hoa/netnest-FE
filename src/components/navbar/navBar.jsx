import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ChatSvg from "../../assets/svg/chatSvg";
import CreateSvg from "../../assets/svg/createSvg";
import HomeSvg from "../../assets/svg/homeSVG";
import LogoutSvg from "../../assets/svg/logoutSvg";
import "./navBar.scss";
import SearchSvg from "../../assets/svg/searchSvg";
import defaultUser from "../../assets/img/user.jpg";
import logoImg from "../../assets/img/logo.jpg";
import { useRouter } from "../../hooks/useRouter";
import { HOME_LINK, PROFILE_LINK } from "../../links/link";
import classNames from "classnames";
import SearchBar from "../search/search";
import { USER } from "../../contants/mock";
import { useAction } from "../../hooks/useAction";
import { get } from "../../services/request";
import { API_LIST } from "../../contants/common";
import { useSelector } from "react-redux";

const NavBar = () => {
  const [isSmallTab, setIsSmallTab] = useState(false);
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);
  const [searchedUsers, setSearchedUser] = useState([]);
  const [recentSearchedUser, setRecentSearchedUser] = useState([]);
  const [isNotificationBarActive, setIsNotificationBarActive] = useState(false);
  const { token } = useSelector((store) => store.user);
  const { action } = useAction();
  const { pushRoute } = useRouter();
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1];

  useEffect(() => {
    handleActiveTab();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath, isSearchBarActive]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleActiveTab = (currentTab) => {
    if (isSearchBarActive) return;

    const navBarItemList = document.querySelector(".navBar-items-list");
    const navBarItems = navBarItemList?.querySelectorAll(".navBar-item");
    const active = navBarItemList?.querySelector(".active");
    const navBarHome = navBarItemList?.querySelector(".navBar-item-home");

    if (active) {
      active.classList.remove("active");
    }

    if (currentPath.length === 0 && !currentTab) {
      navBarHome.classList.add("active");
      return;
    }

    navBarItems.forEach((item) => {
      if (
        item.classList.contains("navBar-item-" + (currentTab || currentPath))
      ) {
        item.classList.add("active");
      }
    });
  };

  const handleResizeNavBar = (currentTab) => {
    handleActiveTab(currentTab);
  };

  const handleRedirect = (route) => {
    pushRoute(route);
  };

  const handleSearchBar = async (value) => {
    await action({
      action: async () =>
        get({
          url: `${API_LIST.get_search_user}/${value}`,
          config: {
            headers: { authorization: "Bearer " + token },
          },
        }),
      onSuccess: async (data) => {
        setSearchedUser(data);
      },
    });
  };

  return (
    <>
      <nav
        className={classNames("navBar-container", { "small-nav": isSmallTab })}
      >
        <div className="navBar-logo">
          <span>𝓝𝓮𝓽𝓝𝓮𝓼𝓽</span>
          <img src={logoImg} alt="logo" />
        </div>
        <ul className="navBar-items-list">
          <li
            onClick={() => {
              setIsSmallTab(false);
              setIsSearchBarActive(false);
              if (currentPath.length === 0) {
                handleResizeNavBar();
              } else {
                handleRedirect(HOME_LINK);
              }
            }}
            className="navBar-item navBar-item-home"
          >
            <HomeSvg />
            <span className="navBar-item-desc">Home</span>
          </li>
          <li
            className="navBar-item navBar-item-search"
            onClick={() => {
              setIsSmallTab(!isSmallTab);
              setIsSearchBarActive(!isSearchBarActive);
              handleResizeNavBar("search");
            }}
          >
            <SearchSvg />
            <span className="navBar-item-desc">Search</span>
          </li>
          <li className="navBar-item navBar-item-chat">
            <ChatSvg />
            <span className="navBar-item-desc">Messgage</span>
          </li>
          <li className="navBar-item navBar-item-create">
            <CreateSvg />
            <span className="navBar-item-desc">Create</span>
          </li>
          <li
            onClick={() => {
              setIsSmallTab(false);
              setIsSearchBarActive(false);
              if (currentPath === "profile") {
                handleResizeNavBar();
              } else {
                handleRedirect(PROFILE_LINK);
              }
            }}
            className="navBar-item navBar-item-profile"
          >
            <img src={defaultUser} alt="" />
            <span className="navBar-item-desc">Profile</span>
          </li>
        </ul>
        <div className="navBar-logout" onClick={() => handleLogout()}>
          <LogoutSvg />
          <span>Logout</span>
        </div>
      </nav>
      <SearchBar
        recentSearchUser={recentSearchedUser}
        isActive={isSearchBarActive}
        onChange={handleSearchBar}
        searchedUsers={searchedUsers}
      />
    </>
  );
};

export default NavBar;
