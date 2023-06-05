import React from 'react'
import './index.css'

const IndexPage = () => {
  return     <div id="root">
  <div id="header">
      <div id="header-title">
          <h4 >Kho hàng</h4>
      </div>
      <div id="header-search flex-center">
          <div class="header-main-search flex-center">
            <div class="search-icon ti-search">
              <i class="fa fa-search" aria-hidden="true"></i>
            </div>
            <input type="text" class="search-input" placeholder="Tim kiem"/>
          </div>
      </div>

      <div id="header-login">
          
          <div id="header-user-avt">
              <div class="avt-user">
                  
              </div>
          </div>

          <div id="header-user-name">
              <div class="name-user">
                  <span class="username">User Name</span>
              </div>
          </div>

          <div id="header-notification">
              <i class="fa fa-bell-o" aria-hidden="true"></i>
          </div>
      </div>
  </div>

  <div id="content">
          <div id="menu">
              <ul class="menu-list">
                  <li>
                      <a href="" class="sidebar-btn-item">
                          <i class="fa fa-eye menu-icon" aria-hidden="true"></i>
                          <span>Over view</span>
                      </a>
                  </li>
                  <li>
                      <a href="" class="sidebar-btn-item">
                          <i class="fa fa-user menu-icon" aria-hidden="true"></i>
                          <span>Users</span>
                      </a>
                  </li>
                  <li>
                      <a href="" class="sidebar-btn-item">
                          <i class="fa fa-envelope menu-icon" aria-hidden="true"></i>
                          <span>Trade</span>
                      </a>
                  </li>
                  <li>
                      <a href="" class="sidebar-btn-item">
                          <i class="fa fa-address-card menu-icon" aria-hidden="true"></i>
                          <span>Wallet</span>
                      </a>
                  </li>
                  <li>
                      <a href="" class="sidebar-btn-item">
                          <i class="fa fa-circle menu-icon" aria-hidden="true"></i>
                          <span>Transactions</span>
                      </a>
                  </li>
                  <li>
                      <a href="" class="sidebar-btn-item">
                          <i class="fa fa-bar-chart menu-icon" aria-hidden="true"></i>
                          <span>Statistics</span>
                      </a>
                  </li>
                  <li>
                      <a href="" class="sidebar-btn-item">
                          <i class="fa fa-sliders menu-icon" aria-hidden="true"></i>
                          <span>Setting</span>
                      </a>
                  </li>
              </ul>
          </div>
      

      <div id="main">
          <div id="table-user">
              <table>
                  <tr>
                      <th class="title-column">ID</th>
                      <th class="title-column no-border">User Name</th>
                      <th class="title-column no-border">Phone Number</th>
                      <th class="title-column no-border">Email</th>
                      <th class="title-column no-border">Address</th>
                      <th class="title-column">Action</th>
                  </tr>
                  <tr>
                      <td class="item-column">1</td>
                      <td class="item-column">Peter</td>
                      <td class="item-column">1234</td>
                      <td class="item-column">1@gmail.com</td>
                      <td class="item-column">Ha Noi</td>
                      <td class="item-column">
                          <i class="fa fa-ellipsis-h" aria-hidden="true">
                              <ul class="sub-menu">
                                  <li><a href="#">Chat</a></li>
                                  <li><a href="#">Report</a></li>
                              </ul>
                          </i>
                      </td>
                  </tr>
                  <tr>
                      <td class="item-column">2</td>
                      <td class="item-column">Peter</td>
                      <td class="item-column">1234</td>
                      <td class="item-column">2@gmail.com</td>
                      <td class="item-column">Ha Noi</td>
                      <td class="item-column">
                          <i class="fa fa-ellipsis-h" aria-hidden="true">
                              <ul class="sub-menu">
                                  <li><a href="#">Chat</a></li>
                                  <li><a href="#">Report</a></li>
                              </ul>
                          </i>
                      </td>
                  </tr>
                  <tr>
                      <td class="item-column">3</td>
                      <td class="item-column">Peter</td>
                      <td class="item-column">1234</td>
                      <td class="item-column">3@gmail.com</td>
                      <td class="item-column">Ha Noi</td>
                      <td class="item-column">
                          <i class="fa fa-ellipsis-h" aria-hidden="true">
                              <ul class="sub-menu">
                                  <li><a href="#">Chat</a></li>
                                  <li><a href="#">Report</a></li>
                              </ul>
                          </i>
                      </td>
                  </tr>
                  <tr>
                      <td class="item-column">4</td>
                      <td class="item-column">Peter</td>
                      <td class="item-column">1234</td>
                      <td class="item-column">4@gmail.com</td>
                      <td class="item-column">Ha Noi</td>
                      <td class="item-column">
                          <i class="fa fa-ellipsis-h" aria-hidden="true">
                              <ul class="sub-menu">
                                  <li><a href="#">Chat</a></li>
                                  <li><a href="#">Report</a></li>
                              </ul>
                          </i>
                      </td>
                  </tr>
                </table>
                <div class="list-user-more">
                  <button class="view-more">View More</button>
                </div>
          </div>
      </div>
  </div>
</div>;
};

export default IndexPage;
