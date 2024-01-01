import "./info.scss";

const Info = ({ userInfo }) => {
  console.log(userInfo);
  return (
    <div className="profile__container">
      <div className="profile">
        <div className="profile-card">
          <div className="profile-picture">
            <img
              src={`data:image; base64,${userInfo.base64Image}`}
              alt="User Profile"
            />
          </div>
          <div className="user-info">
            <div className="line">
              <div className="">{userInfo.userName}</div>
              <button>Edit</button>
              {/* <button>Nhan </button> */}
            </div>
            <div className="line2">
              <p>
                <b>0</b> posts
              </p>
              <p>
                <b>{userInfo.countfollowers}</b> followers
              </p>
              <p>
                <b>{userInfo.countfollowing}</b> following
              </p>
            </div>
            <h2 className="username" style={{ marginTop: "0 0 15px" }}>
              Vu minh Hoa
            </h2>
            {/* <p>
              Co <b>_hanguyen</b> và 6 người khác theo dõi
            </p> */}
          </div>
        </div>
        <div className="form-tag">
          <div className="nav-tag-list">
            <div className="tag-item active">
              <i className="fa-solid fa-table-cells"></i>
              Bài viết
            </div>
            <div className="tag-item">
              <i className="fa-regular fa-id-badge"></i>
              Được gắn thẻ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
