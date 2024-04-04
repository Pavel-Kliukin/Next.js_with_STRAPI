'use client'
import { strapiFetcher } from '@/lib/api';
import { setToken, unsetToken } from '@/lib/auth';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { checkUser } from '@/redux/userSlice';
import Image from "next/image";

const Navbar = () => {

  // State variable to track changes in submitHandler
  const [userStatusTrigger, setUserStatusTrigger] = useState(false);


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUser())
  }, [dispatch, userStatusTrigger])

  const isUser = useSelector((state) => state.user.isUser)

  const [data, setData] = useState({
    identifier: '',
    password: '',
  });

  const changeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

  }

  const submitHanlder = async (e) => {
    e.preventDefault();

    const authData = await strapiFetcher('auth/local', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: data.identifier,
        password: data.password,
      }),
    }
    );

    setToken(authData)

    // Update the state variable to trigger the useEffect hook
    setUserStatusTrigger((prevValue) => !prevValue);
  }

  const logoutHanlder = (e) => {
    e.preventDefault();
    unsetToken()
    setUserStatusTrigger((prevValue) => !prevValue);
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">STRAPI touch</a>
      </div>
      {isUser ? (
        <div className="flex-none gap-4">
          <button
            className="btn btn-outline btn-primary"
            onClick={logoutHanlder}
          >
            Logout
          </button>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image
                alt="User avatar"
                width={100}
                height={100}
                src="/assets/avatar.jpeg"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-none gap-4">
          <form className="flex gap-4">
            <div className="form-control">
              <input
                type="text"
                name="identifier"
                placeholder="Username"
                className="input input-bordered w-24 md:w-auto"
                onChange={changeHandler}
              />
            </div>
            <div className="form-control">
              <input
                type="text"
                name="password"
                placeholder="Password"
                className="input input-bordered w-24 md:w-auto"
                onChange={changeHandler}
              />
            </div>
            <button
              className="btn btn-outline btn-primary"
              onClick={submitHanlder}
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Navbar