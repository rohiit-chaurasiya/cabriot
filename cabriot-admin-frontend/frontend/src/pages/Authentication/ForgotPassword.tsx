import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../images/assets/img/cabriot_ventures.svg';
import axios from 'axios';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';



const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const csrfToken = Cookies.get('csrftoken');
      // console.log('csrfToken:', csrfToken)
      const response = await axios.post(
        'https://cabriot-admin-auth.onrender.com/api/account/reset-password/',
        { email },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'X-CSRFToken': csrfToken
          },
        }
      );
      
      setIsEmailSent(true);
      console.log(response); // Assuming successful response structure
    } catch (error) {
      console.error('Error:', error);

      if (isAxiosError(error) && error.response && error.response.status === 404) {
        // User not found
        setError('User not found. Please check your email.');
      } else {
        setError('Failed to send reset email. Try again!!');
      }
    }
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

                {isEmailSent ? (
                    <>
                        <h2 className="mb-6 xl:mb-8 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 text-center">Email Sent</h2>
                        <p className="text-green-600 text-center">Forgot password link has been successfully sent to your email. Check your inbox.</p>
                    </>
                ) : (
                    <>
                    <h2 className="mb-6 xl:mb-8 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 text-center">
                        Forgot Password
                    </h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <form onSubmit={handleEmailSubmit}>
                      <div className="mb-4">
                        <label className="mb-2.5 block font-medium text-black dark:text-white">
                          Email
                        </label>
                        <div className="relative">
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />

                          <span className="absolute right-4 top-4">
                            <svg
                              className="fill-current"
                              width="22"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {/* ... (SVG content) */}
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div className="mb-5">
                        <input
                          type="submit"
                          value="Submit"
                          className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                        />
                      </div>
                    </form>
                    <div className="mt-6 text-center">
                      <p>
                        <span
                          className="text-primary"
                          onClick={handleLoginClick}
                          style={{ cursor: 'pointer' }}
                        >
                          Click here to login.
                        </span>
                      </p>
                    </div>
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

export default ForgotPassword;
