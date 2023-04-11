import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style/_header.scss';

export default function Header() {
  const [url, setUrl] = useState('/');
  const location = useLocation();

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  const headerTitle = {
    mycity: '나의 도시',
    todo: '나의 할일',
    create: '생성하기',
    study: '스터디',
    faq: 'FAQ',
  };

  return (
    <header>
      <div className="minMax">
        <div className="flexBox-between mainHeader">
          <div className="flexBox">
            <h1>
              <img src="" alt="logo" />
            </h1>
            <ul className="flexBox-between navigation">
              <li className={url === '/mycity' && 'pageIn'}>
                <Link to={'/mycity'}>나의 도시</Link>
              </li>
              <li className={url === '/study' && 'pageIn'}>
                <Link to={'/study'}>스터디</Link>
              </li>
              <li className={url === '/faq' && 'pageIn'}>
                <Link to={'/faq'}>FAQ</Link>
              </li>
            </ul>
          </div>
          <div className="flexBox">
            <div className="search">
              <input type="text" placeholder="스터디 / 챌린지를 검색해주세요" />
            </div>
            <div className="profileImg">
              <Link to={'/mycity'}>
                <img src="" alt="profile" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="location">
        <div className="minMax">
          <Link to={'/'}>
            <img src="/images/icon_home.svg" alt="home" />
          </Link>
          <p>
            {url.split('/')[1] ? headerTitle[url.split('/')[1]] : '데브시티'}
          </p>
          <p>{url.split('/')[2] && headerTitle[url.split('/')[2]]}</p>
        </div>
      </div>
    </header>
  );
}
