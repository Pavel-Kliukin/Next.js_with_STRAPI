'use client'
import { strapiFetcher } from '@/lib/api';
import { setToken } from '@/lib/auth';
import { useUser } from '@/lib/authContext';
import { useState } from 'react'

const Navbar = () => {

  const [data, setData] = useState({
    identifier: '',
    password: '',
  });

  const { user, loading } = useUser()

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

    console.log(authData);
    setToken(authData)
  }

  return (
    <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">STRAPI touch</a>
  </div>
  <div className="flex-none gap-4">
    <form className="flex gap-4">
      <div className="form-control">
        <input 
          type="text"
          name="identifier"
          placeholder="Username" 
          className="input input-bordered w-24 md:w-auto"
          onChange={changeHandler} />
      </div>
      <div className="form-control">
        <input 
          type="text"
          name="password"
          placeholder="Password" 
          className="input input-bordered w-24 md:w-auto"
          onChange={changeHandler} />
      </div>
      <button 
        className="btn btn-outline btn-primary"
        onClick={submitHanlder}
      >
        Submit
      </button>
    </form>

    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default Navbar