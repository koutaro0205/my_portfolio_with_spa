import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { success, warn } from "../../parts/notifications";
import { handleAjaxError, isEmptyArray } from '../../parts/helpers';
import { HeadBlock } from '../../HeadBlock';
import { ControllLoggedInContext } from '../../App';

const Login = () => {
  const ControllLoggedInFuncs = useContext(ControllLoggedInContext);
  const setCurrentUser = ControllLoggedInFuncs[0];
  const setLoggedInStatus = ControllLoggedInFuncs[1];
  const [requestUrl, setRequesttUrl] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [loginError, setLoginError] = useState([]);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
    remember_me: false,
  });
  useEffect(() => {
    if (location.state){
      setRequesttUrl(location.state.url);
    }
  }, []);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const LoginUser = async (userInfo) => {
    try {
      const response = await window.fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(userInfo),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (!response.ok) throw Error(response.statusText);

      const authenticatedUserStatus = await response.json();

      if (authenticatedUserStatus.logged_in && authenticatedUserStatus.activated) {
        setLoggedInStatus(true);
        setCurrentUser(authenticatedUserStatus.user);
        success('ログインしました!');
        if (requestUrl){
          navigate(requestUrl);
        } else {
          navigate(`/`);
        }
      } else if (authenticatedUserStatus.status === "unauthorized") {
        const errorMessage = authenticatedUserStatus.errors;
        setLoginError(errorMessage);
      } else if (!authenticatedUserStatus.logged_in && !authenticatedUserStatus.activated) {
        warn(authenticatedUserStatus.message);
        navigate(`/`);
      }
    } catch (error) {
      handleAjaxError(error);
    }
  };

  const renderError = () => {
    if (isEmptyArray(loginError)) {
      return null;
    }

    return (
      <div className="error_explanation">
        <div className="alert alert-danger">
          入力内容が正しくありません。ボタンをクリックして再入力してください。
        </div>
        <ul className="error_messages">
          {loginError.map((error) => (
            <li key={error} className="message">{error}</li>
          ))}
        </ul>
        <div className='reset-errors-wrap'>
          <button className='reset-errors' onClick={() => setLoginError([])}>再入力</button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmptyArray(loginError)){
      LoginUser(loginInfo);
    };
  };

  return (
    <>
      <HeadBlock title={"ログイン"}/>
      <section className="section content-width">
        <div className="form__inner">
          <h1 className="sectionTitle">ログイン</h1>
          <form className="form" onSubmit={handleSubmit}>
            {renderError()}

            <label className="form__label" htmlFor="email">メールアドレス</label>
            <input
              className="form__field"
              type="email"
              id="email"
              name="email"
              onChange={handleInputChange}
            />

            <label className="form__label" htmlFor="password">パスワード</label>
            <input
              className="form__field"
              type="password"
              id="password"
              name="password"
              onChange={handleInputChange}
            />

            <label className='checkbox' htmlFor="remember_me">
              <input type="checkbox" name="remember_me" id="remember_me" onChange={handleInputChange} />
              <span className="remember_me">次回から自動的にログインする</span>
            </label>

            <input type="submit" value={"ログイン"} className="form__btn btn" />
          </form>
          <p className="signup">ユーザー登録されていない方は<Link to={`/users/new`}>こちら</Link></p>
          <p className="reset">パスワードをお忘れの方は<Link to={`/password_resets/new`}>こちら</Link></p>
        </div>
      </section>
    </>
  );
};

export default Login;