import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../style/recruitBoard/Studies.scss';

export default function Studies({ el, idx, userId }) {
  const [btnToggle, setBtnToggle] = useState('off');
  const likeBtnClickEvenet = async () => {
    if (btnToggle === 'off') {
      setBtnToggle('on');
      await axios.post('http://localhost:4000/study/like', {
        userId: userId,
        studyId: el._id,
      });
    } else {
      setBtnToggle('off');
    }
  };

  return (
    <div className="study" key={`study_${idx}`}>
      <div className="study_info">
        <div className="study_info-text">
          <div className="study_info-text-small">
            <div className="member_num">
              {el.memberNum.currentNum}/{el.memberNum.maxNum}
            </div>
            <div className="create_date">
              {new Date(el.createDate).toISOString().substring(0, 10)}
            </div>
          </div>
          <div className="study_intro">{el.studyIntro}</div>
        </div>
        <div className="study_info-skill">
          {el.skills.map((skill, idx) => {
            return (
              <img
                key={`skill_${idx}`}
                src={`/images/skill_icon/${skill}.svg`}
                alt={`${skill}이미지`}
              />
            );
          })}
        </div>
      </div>
      <div className="study_button">
        <ul>
          <li className="study_button-participate">
            <Link to={`/study/detail/${el._id}`}>참가하기</Link>
          </li>
          <li className="interst">
            <span>
              <img
                onClick={(e) => {
                  likeBtnClickEvenet(e);
                }}
                src={`./images/icon_heart${
                  btnToggle === 'on' ? 'on' : 'off'
                }.svg`}
                alt="heart"
              />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
