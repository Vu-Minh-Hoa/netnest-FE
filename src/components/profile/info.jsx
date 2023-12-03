const Info = () => {
  return (
      <div className="">
          <div className="profile-card">
      <img
        className="profile-picture"
        src="https://cdn.alongwalk.info/vn/wp-content/uploads/2022/09/28150733/image-69-hinh-anh-gai-xinh-trung-quoc-hot-girl-trung-quoc-dep-nhat-2022-166432725338362.jpg"
        alt="User Profile"
      />
      <div className="user-info">
        <div className="line">
          <div className="">_name</div>
          <button>Dang theo doi</button>
          <button>Nhan tin</button>
        </div>
        <div className="line2">
          <p>
            <b>0</b> bài viết
          </p>
          <p>
            <b>47</b> người theo dõi
          </p>
          <p>
            Đang theo dõi <b>19</b> người dùng
          </p>
        </div>
        <h2>Ten nam o day</h2>
        <span className="mb-3">mo ta thong tin ve ten</span>
        <p>
          Co <b>_hanguyen</b> và 6 người khác theo dõi
        </p>
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
  );
};

export default Info;
