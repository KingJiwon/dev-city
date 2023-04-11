import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignInPage() {
  const navigate = useNavigate();
  const userIdInput = useRef('');
  const passwordInput = useRef('');

  const login = async (e) => {
    e.preventDefault();

    const account = {
      userId: userIdInput.current.value,
      password: passwordInput.current.value,
    };

    try {
      const res = await axios.post(
        `http://localhost:4000/user/signin`,
        account,
      );

      if (res.status === 200) {
        const data = res.data;
        localStorage.setItem('JWT', data);
        navigate('/');
      } else {
        console.log(`요청실패, status는 ${res.status}`);
      }
    } catch (err) {
      console.error(`요청실패, 에러는 ${err}`);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('JWT') !== null) {
      navigate('/');
    }
  });

  return (
    <>
      <h1>로그인</h1>
      <form onSubmit={login} className="sign-form">
        <input
          type="text"
          ref={userIdInput}
          placeholder="이메일을 입력하세요"
        />
        <input
          type="password"
          ref={passwordInput}
          placeholder="비밀번호를 입력하세요"
        />
        <button type="submit">로그인</button>
      </form>
    </>
  );
}
