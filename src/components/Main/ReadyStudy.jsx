import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateLike } from '../../store/modules/user';
import '../../style/study.scss';

export default function ReadyStudy({ item, idx, liked, likedStudy, userId }) {
  // user의 likedStudy id와 study의 id를 비교하여 포함되어있으면 버튼이 on
  const date = new Date(item.createDate);
  const dispatch = useDispatch();

  const updateLikeList = async () => {
    await axios
      .get(`http://localhost:4000/user/${localStorage.getItem('userId')}`)
      .then((response) => {
        dispatch(updateLike(response.data.likedStudy));
      })
      .catch((err) => console.error(err));
  };

  const handleLike = async (e) => {
    e.preventDefault();
    if (liked > 0) {
      await axios.post('http://localhost:4000/study/like', {
        userId: userId,
        studyId: item._id,
        isDelete: true,
      });
    } else {
      await axios.post('http://localhost:4000/study/like', {
        userId: userId,
        studyId: item._id,
        isDelete: false,
      });
    }
    updateLikeList();
  };

  return (
    <Link
      key={idx}
      to={`/study/detail/${item._id}`}
      className="likeStudyBox studyContainer"
    >
      <p className="date">
        {`${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`} |{' '}
        {item.field}
      </p>
      <h3>{item.studyName}</h3>
      <div className="flexBox-alignCenter">
        <ul className="flexBox skills">
          {item?.skills?.map((el) => {
            return (
              <p key={el}>
                <img src={`/images/skill_icon/${el}.svg`} alt="" />
              </p>
            );
          })}
        </ul>
        <span className="ellipsis">{item?.skills.length > 4 && '...'}</span>
      </div>
      <p className="memberCount">
        <span>{`${item.memberNum.maxNum}`}</span>명 중{' '}
        <span> {`${item.memberNum.currentNum}`}</span>명 모집됨
      </p>
      <div className="clickHeart" onClick={(e) => handleLike(e)}>
        <img
          src={`./images/icon_heart${liked > 0 ? 'on' : 'off'}.svg`}
          alt="heart"
        />
      </div>
    </Link>
  );
}
