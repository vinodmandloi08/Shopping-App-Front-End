import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import registerImg from '../assets/images/login.png'

export default function Register() {

    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(data)
    }

    return (
        <div className="flex flex-row items-center justify-center min-h-[89vh] text-center text-black">
            <form className="flex flex-col justify-center pb-10 bg-black border-2 rounded-2xl min-w-[30vw] shadow-[1rem_1.5rem_grey]" onSubmit={onSubmit}>
                <ToastContainer className="mt-[10vh]" />
                <h1 className="justify-center pt-4 text-2xl font-bold leading-8 text-white">Register Here</h1>
                <div className='grid grid-cols-[repeat(2,1fr)] mx-0 my-4 pr-12'>
                    <label htmlFor="name" className="text-xl font-semibold text-white">Name</label>
                    <input
                        className="p-3 text-base text-center border-b border-black rounded-2xl"
                        type="text"
                        placeholder="Full Name"
                        name="name"
                        value={data.name}
                        onChange={onChange}
                        required />
                </div>
                <div className="grid grid-cols-[repeat(2,1fr)] mx-0 my-4 pr-12">
                    <label htmlFor="email" className="text-xl font-semibold text-white">Email</label>
                    <input
                        className="p-3 text-base text-center border-b border-black rounded-2xl"
                        type="email"
                        placeholder="youremail@gmail.com"
                        name="email"
                        value={data.email}
                        onChange={onChange}
                        required />
                </div>
                <div className="grid grid-cols-[repeat(2,1fr)] mx-0 my-4 pr-12">
                    <label htmlFor="password" className="text-xl font-semibold text-white">Password</label>
                    <input
                        className="p-3 text-base text-center border-b border-black rounded-2xl"
                        type="password"
                        placeholder="************"
                        name="password"
                        value={data.password}
                        onChange={onChange}
                        required
                        minLength={6}
                        maxLength={30} />
                </div>
                <button className="text-black bg-green-400 font-bold text-lg mt-4 mb-0 mx-28 p-2 rounded-[2rem] hover:text-white hover:bg-green-500" type='submit'>Register</button>
                <Link to="/login" className="underline text-white font-bold text-[medium] mt-4 mb-0 mx-28 p-2 rounded-[2rem] hover:text-[rgb(198,33,41)]">
                    Already have an account? Login here
                </Link>
            </form>
            <div className="max-w-md ml-32">
                <h2 className="text-4xl font-extrabold text-center text-black">Join Us Today!</h2>
                <img className="mt-12" src={registerImg} alt="Illustration of a doctor" />
            </div>
        </div>
    )
}