import React from "react";
import "./SuggestionList.scss";
import cn from "classnames";

const SuggestionItem = ({ id, img, ma, name, isFollowed = false }) => {
  const handleFollow = () => {};

  return (
    <div className="item" key={id}>
      <div className="info-item">
        <img src={`data:image/png;base64, ${img}`} alt="" />
        <div className="group-info">
          <span className="username">{ma}</span>
          <h4>{name}</h4>
        </div>
      </div>
      <button
        onClick={() => handleFollow()}
        className={cn(
          { "btn-follow": !isFollowed },
          { "btn-followed": isFollowed }
        )}
      >
        {false ? "...loading" : isFollowed ? "Following" : "Follow"}
      </button>
    </div>
  );
};

const SuggestionList = ({ listItem }) => {
  return (
    <div className="list-item">
      {listItem?.map((item) => (
        <SuggestionItem
          key={item.userId}
          img={item.base64Image}
          ma={item.fullName}
          name={item.userName}
        />
      ))}
    </div>
  );
};

export default SuggestionList;
