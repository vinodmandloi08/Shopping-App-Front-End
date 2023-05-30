import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import registerImg from '../assets/images/login.png'
import { logout } from '../redux/AuthSlice'
import { useDispatch, useSelector } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import { register_user } from '../services/UserService'

export default function Register() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [error, setError] = useState(null);

    useEffect(() => {
        if (isLoggedIn !== false) {
            confirmAlert({
                title: 'Confirm to submit',
                message: 'If you try to visit this link, your session will be expired. Are you sure to do this?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            dispatch(logout());
                            navigate("/register")
                        }
                    },
                    {
                        label: 'No',
                        onClick: () => {
                            navigate("/dashboard/user")
                        }
                    }
                ]
            });
        }
        // eslint-disable-next-line
    }, [])

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (!(isValidEmail(data.email) || (isValidPhone(data.email)))) {
            setError('Wrong or Invalid email address or mobile phone number.');
        } else {
            setError(null);
            toast.info('Registering in...', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });

            register_user(data)
                .then(res => {
                    toast.success('Registration Successful', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: "colored",
                    });
                })
                .catch(err => {
                    toast.error(`${err.response !== undefined ? err.response.data.message : 'Something went wrong'}!!`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: "colored",
                    });
                })
            setData({
                name: '', email: '', password: ''
            })
        }
    }

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    const isValidPhone = (phone) => {
        return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone);
    }

    return (
        <div className="flex flex-row items-center justify-center min-h-[89vh] text-center text-black">
            <form className="flex flex-col justify-center pb-10 bg-black border-2 rounded-2xl min-w-[30vw] shadow-[1rem_1.5rem_grey]" onSubmit={onSubmit}>
                <ToastContainer className="mt-[10vh]" />
                <h1 className="justify-center pt-4 text-2xl font-bold leading-8 text-white">Register Here</h1>
                <div className='grid grid-cols-[repeat(2,1fr)] mx-0 my-4 pr-12'>
                    <label htmlFor="name" className="mt-2 text-xl font-semibold text-white">Name</label>
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
                    <label htmlFor="email" className="mt-2 text-xl font-semibold text-white">Mobile number or email</label>
                    <input
                        className="p-3 text-base text-center border-b border-black rounded-2xl"
                        type="text"
                        placeholder="youremail@gmail.com"
                        name="email"
                        value={data.email}
                        onChange={onChange}
                        required />
                </div>
                {error && <h2 className='font-extrabold text-red-500'>{error}</h2>}
                <div className="grid grid-cols-[repeat(2,1fr)] mx-0 my-4 pr-12">
                    <label htmlFor="password" className="mt-2 text-xl font-semibold text-white">Password</label>
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