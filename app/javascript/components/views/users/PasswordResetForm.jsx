import React, { useEffect, useState } from 'react';
// import { useUser } from './useUser';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { success } from "../../parts/notifications";
import { handleAjaxError } from '../../parts/helpers';

const PasswordResetForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resetInfo, setResetInfo] = useState({
    email: '',
  });
  const navigate = useNavigate();
  const [resetError, setResetError] = useState([]);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.value;

    setResetInfo({ ...resetInfo, [name]: value });
  };

  const PasswordReset = async (email) => {
    try {
      const response = await window.fetch('/api/password_resets', {
        method: 'POST',
        body: JSON.stringify(email),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (!response.ok) throw Error(response.statusText);

      const authenticatedEmailStatus = await response.json();

      if (authenticatedEmailStatus.status === "ok") {
        success(authenticatedEmailStatus.message);
        navigate(`/`);
      } else {
        const errorMessage = authenticatedEmailStatus.error;
        setResetError(errorMessage);
        console.log(errorMessage);
      }
    } catch (error) {
      handleAjaxError(error);
    };
  };

  const isEmptyError = (errors) => errors.length === 0;

  const renderError = () => {
    if (isEmptyError(resetError)) {
      return null;
    }

    return (
      <div className="error_explanation">
        <div className="alert alert-danger">
          入力内容が正しくありません。ボタンをクリックして再入力してください。
        </div>
        <ul className="error_messages">
          {resetError.map((error) => (
            <li key={error} className="message">{error}</li>
          ))}
        </ul>
        <button onClick={setResetError([])}>再入力</button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmptyError(resetError)){
      PasswordReset(resetInfo);
      setIsLoading(true);
    };
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title></title>
        </Helmet>
      </HelmetProvider>
      {isLoading ? (
          <p className='loading'>メールを送信中です。今しばらくお待ちください。</p>
        ) : (
          <section className="section content-width">
            <div className="form__inner">
              <h1 className="sectionTitle">パスワードをお忘れの方</h1>
              <p className="description">
                パスワードの再設定を行います。<br />
                登録した覚えのあるメールアドレスを入力してください。
              </p>
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

                <input type="submit" value={"メールを送信"} className="form__btn btn" />
              </form>
            </div>
          </section>
        )
      }
    </>
  );
};

export default PasswordResetForm;