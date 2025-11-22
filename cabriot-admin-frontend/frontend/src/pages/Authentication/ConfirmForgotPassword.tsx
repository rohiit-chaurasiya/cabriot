import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Logo from '../../images/assets/img/cabriot_ventures.svg';
import axios from 'axios';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';

const ConfirmForgotPassword: React.FC = () => {
  const [password, setPass1] = useState('');
  const [password2, setPass2] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>(); // Fetch token from route
  const [isPasswordSet, setIsPasswordSet] = useState(false);

  const handlePasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }

    try {
      const csrfToken = Cookies.get('csrftoken');
      const response = await axios.post(
        'https://cabriot-admin-auth.onrender.com/api/account/reset-password/confirm_password/',
        { token, password, password2 },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'X-CSRFToken': csrfToken
          },
        }
      );
      
      // Assuming successful response structure
      setIsPasswordSet(true);
      console.log(response); 
    } catch (error) {
      console.error('Error:', error);
      if (isAxiosError(error) && error.response && error.response.status === 404) {
        setError('User not found. Please check your email.');
      } else {
        setError('Failed to reset password. Please try again!!');
      }
    }
  };

  const handleForgotPasswordClick = () => {
    navigate('/');
  };
  const handleLoginClick = () => {
    navigate('/');
  };

  // Type guard for AxiosError
  function isAxiosError(error: any): error is AxiosError {
    return error.isAxiosError !== undefined;
  }

  return (
    <>
      <div className="px-7 pt-20 md:px-20 lg:px-40 xl:px-30 lg:pt-12 md:pt-25">
        <div>
          <div className="flex flex-wrap items-center">
          <img src={Logo} alt="logo" className="w-40 xl:w-60 mb-6.5 mx-auto" />
            <div className="w-full  xl:w-2/4 sm:w-full mx-auto ounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="w-full p-5 sm:p-14.5 xl:px-17.5 inline-block items-center">
                {isPasswordSet ? (
                  <>
                    <h2 className="mb-6 xl:mb-8 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 text-center">Pssword Changed</h2>
                    <p className="text-green-600 text-center">Yout Password has been changed successfully.</p>
                    <div className="mt-6 text-center">
                      <p>
                        <span
                          className="text-primary"
                          onClick={handleForgotPasswordClick}
                          style={{ cursor: 'pointer' }}
                        >
                          Click here to login.
                        </span>
                      </p>
                    </div>
                  </>
                  ) : (
                    <>
                      <h2 className="mb-6 xl:mb-8 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 text-center">
                          Set New Password
                      </h2>
                      {error && <p className="text-red-500">{error}</p>}
                      <form onSubmit={handlePasswordSubmit}>
                        <div className="mb-4">
                          <label className="mb-2.5 block font-medium text-black dark:text-white">
                            New Password
                          </label>
                          <input
                            value={password}
                            onChange={(e) => setPass1(e.target.value)}
                            type="text"
                            placeholder="Enter your new password"
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="mb-2.5 block font-medium text-black dark:text-white">
                            Confirm Password
                          </label>
                          <input
                            value={password2}
                            onChange={(e) => setPass2(e.target.value)}
                            type="text"
                            placeholder="Confirm your new password"
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="mb-5">
                          <input
                            type="submit"
                            value="Reset Password"
                            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                          />
                        </div>
                      </form>
                      
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmForgotPassword;
