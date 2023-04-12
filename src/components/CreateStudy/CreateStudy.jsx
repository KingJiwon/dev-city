import axios from 'axios';
import React, { Fragment, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useNavigate } from 'react-router-dom';
import { create } from '../../store/modules/study';
import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../../style/createStudy.scss';
// react-select
const animatedComponents = makeAnimated();

// select 데이터들
const numOptions = [
  { value: 'one', label: '1명' },
  { value: 'two', label: '2명' },
  { value: 'three', label: '3명' },
  { value: 'four', label: '4명' },
  { value: 'five', label: '5명' },
];

const fieldOptions = [
  { value: 'web', label: '웹' },
  { value: 'app', label: '앱' },
  { value: 'game', label: '게임' },
  { value: 'product-manager', label: '기획' },
  { value: 'etc', label: '기타' },
];

const skillOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'spring', label: 'Spring' },
  { value: 'go', label: 'Go' },
  { value: 'java', label: 'Java' },
  { value: 'nestjs', label: 'Nestjs' },
  { value: 'nodejs', label: 'Nodejs' },
  { value: 'figma', label: 'Figma' },
];

export default function CreateStudy() {
  const [percent, setPercent] = useState({
    skills: [{ value: 'javascript', label: 'JavaScript' }],
  });
  const studyNameInput = useRef();
  const studyIntroInput = useRef();
  const studyFieldSelect = useRef();
  const memberNumSelect = useRef();
  const skillSelect = useRef();
  const studySystemInput = useRef();
  const etcInput = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createStudyBtn = async () => {
    let skills = skillSelect.current.props.value;
    let skillsArr = [];
    for (let i = 0; i < skills.length; i++) {
      skillsArr.push(skills[i].label);
    }

    if (
      !studyNameInput.current.value ||
      !studyIntroInput.current.value ||
      !studyFieldSelect.current.props.value ||
      !memberNumSelect.current.props.value ||
      !skillSelect.current.props.value
      // || !studySystemInput.current.value
    )
      return alert('필수 값을 입력해주세요.');

    const resCreate = await axios.post(
      'http://localhost:4000/study/create_study',
      {
        userId: localStorage.getItem('userId'),
        study_name: studyNameInput.current.value,
        study_intro: studyIntroInput.current.value,
        study_system: studySystemInput.current.value,
        study_field: studyFieldSelect.current.props.value.label,
        skills: skillsArr,
        member_num: {
          currentNum: 0,
          maxNum: parseInt(
            memberNumSelect.current.props.value.label.split('명'),
          ),
        },
        member: [
          {
            isLeader: true,
            memberId: localStorage.getItem('userId'),
          },
        ],
        board: {},
        structureImg: 'img',
        study_system: studySystemInput.current.value,
        study_etc: etcInput.current.value,
      },
    );

    if (resCreate.status !== 200) return alert(resCreate.data);
    // 백엔드에서 에러 멘트 적어둔거
    // 200이 아니면 여기서 함수 자체가 종료

    alert(resCreate.data);
    // 200이 들어오면 백엔드에서 작성한
    // '스터디 생성 성공' 뜸
    // 그리고 밑에 navigate() 주소로 이동

    dispatch(
      create({
        userId: localStorage.getItem('userId'),
        study_name: studyNameInput.current.value,
        study_intro: studyIntroInput.current.value,
        study_system: studySystemInput.current.value,
        study_field: studyFieldSelect.current.props.value.label,
        skills: skillsArr,
        member_num: {
          currentNum: 0,
          maxNum: parseInt(
            memberNumSelect.current.props.value.label.split('명'),
          ),
        },
        member: {},
        board: {},
        structureImg: 'img',
        study_etc: etcInput.current.value,
      }),
    );
    return navigate('/study'); // 일단 생성 완료 시 /study로 가게 함
  };

  const handleValue = (e, key) => {
    if (e !== '') {
      setPercent({ ...percent, [key]: e });
    } else {
      setPercent({ ...percent, [key]: 'empty' });
    }
  };
  const elementContent = [
    {
      title: '기본정보',
      detail: [
        {
          subTitle: '스터디명',
          require: true,
          input: (
            <input
              onChange={(e) => handleValue(e.target.value, 'study_name')}
              className="inputContainer inputBox"
              type="text"
              ref={studyNameInput}
              placeholder="3~10자 이내로 입력해주세요."
            />
          ),
        },
        {
          subTitle: '모집인원',
          require: true,
          input: (
            <Select
              onChange={(e) => handleValue(e.value, 'member_num')}
              className="inputContainer"
              options={numOptions}
              placeholder="최대 5명까지 선택할 수 있습니다."
              ref={memberNumSelect}
            />
          ),
        },
        {
          subTitle: '모집분야',
          require: true,
          input: (
            <Select
              onChange={(e) => handleValue(e.value, 'study_field')}
              className="inputContainer"
              options={fieldOptions}
              placeholder="프론트엔드 / 백엔드 / 게임 / 기획 등 추후 추가 예정"
              ref={studyFieldSelect}
            />
          ),
        },
        {
          subTitle: '사용언어',
          require: true,
          input: (
            <Select
              onChange={(e) => handleValue(e, 'skills')}
              className="inputContainer"
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={skillOptions}
              placeholder="사용 언어를 선택해주세요."
              ref={skillSelect}
            />
          ),
        },
      ],
    },
    {
      title: '세부정보',
      detail: [
        {
          subTitle: '스터디 한줄 소개',
          require: true,
          input: (
            <textarea
              onChange={(e) => handleValue(e.target.value, 'study_intro')}
              className="inputContainer"
              name=""
              id=""
              cols={40}
              rows={8}
              placeholder="스터디 소개"
              ref={studyIntroInput}
            ></textarea>
          ),
        },
        {
          subTitle: '회의 진행 / 모임 방식',
          require: false,
          input: (
            <textarea
              onChange={(e) => handleValue(e.target.value, 'study')}
              className="inputContainer"
              name=""
              id=""
              cols={40}
              rows={8}
              placeholder={`- 1주에 몇 번 정도 회의나 모임을 진행할 계획인가요?\n(ex - 1주일에 1회/2회 정도 정기적으로 회의합니다)\n- 온/오프라인 회의 진행시 진행방식을 적어주세요\n(ex - 온라인은 줌을 활용하고, 오프라인은 강남역 카페등을 대관할예정입니다,\n 커뮤니케이션은 슬랙을 위주로 사용합니다 )`}
              ref={studySystemInput}
            ></textarea>
          ),
        },
        {
          subTitle: '기타',
          require: false,
          input: (
            <input
              className="inputContainer inputBox"
              type="text"
              placeholder="기타사항을 입력하세요"
              ref={etcInput}
            />
          ),
        },
      ],
    },
  ];

  const perventage = Object.values(percent).filter((el) => {
    return el !== 'empty';
  });
  console.log(percent);
  return (
    <div className="minMax flexBox-between">
      <div className="box-write">
        <h1>나의 스터디 생성하기</h1>
        {elementContent.map((el, idx) => {
          return (
            <Fragment key={idx}>
              <h3>{el.title}</h3>
              <div className="studyInputBox">
                {el.detail.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className={`flexBox${
                        el.title === '기본정보' ? '-alignCenter' : ''
                      } studyInputSubBox`}
                    >
                      <p className="subTitle">
                        {item.subTitle}
                        {item.require && <span className="require">*</span>}
                      </p>
                      {item.input}
                    </div>
                  );
                })}
              </div>
            </Fragment>
          );
        })}
      </div>
      <div className="box-confirm">
        <div className="percent">
          <CircularProgressbarWithChildren
            value={perventage.length !== 0 ? (perventage.length / 5) * 100 : 0}
            // text={`${
            //   perventage.length !== 0 ? (perventage.length / 5) * 100 : 0
            // }%`}
            styles={
              (buildStyles({
                textSize: '16px',
                textColor: '#605CFF',
              }),
              {
                path: {
                  stroke: `#605CFF`,
                },
                text: {
                  // Text color
                  fill: '#605CFF',
                  // Text size
                  fontSize: '16px',
                  fontWeight: 700,
                },
              })
            }
          >
            <p className="percentText">
              {perventage.length !== 0 ? (perventage.length / 5) * 100 : 0}
              <span>%</span>
            </p>
            <p className="percentSubText">작성이 완료되었습니다.</p>
          </CircularProgressbarWithChildren>
        </div>
        <a
          className={`btn btn--create ${perventage.length !== 5 && 'disabled'}`}
          onClick={createStudyBtn}
        >
          생성하기
        </a>
        <a className="btn btn--cancel" onClick={() => navigate('/')}>
          취소하기
        </a>
      </div>
    </div>
  );
}
