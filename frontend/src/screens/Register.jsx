import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user.context'
import axios from '../config/axios'

const Register = () => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ name, setName ] = useState('')

    const { setUser } = useContext(UserContext)

    const navigate = useNavigate()


    function submitHandler(e) {

        e.preventDefault()

        axios.post('/users/register', {
            email,
            password,
            name
        }).then((res) => {
            console.log(res.data)
            localStorage.setItem('token', res.data.token)
            setUser(res.data.user)
            navigate('/')
        }).catch((err) => {
            console.log(err.response.data)
        })
    }


    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-[#eaeaea]">
            <div className="bg-white p-8 rounded-xl shadow-lg lg:w-full max-w-md">
                <h2 className="text-2xl font-bold text-zinc-700 mb-6">Register</h2>
                <form
                    onSubmit={submitHandler}
                >
                    <div className="mb-4">
                        <label className="block text-zinc-400 mb-2" htmlFor="email">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className="w-full p-3 rounded-xl bg-zinc-100 text-zinc-700"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-zinc-400 mb-2" htmlFor="password">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            className="w-full p-3 rounded-xl bg-zinc-100 text-zinc-700"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-zinc-400 mb-2" htmlFor="name">Name</label>
                        <input
                            onChange={(e) => setName(e.target.value)} 
                            type="name"
                            id="name"
                            className="w-full p-3 rounded-xl bg-zinc-100 text-zinc-700"
                            placeholder="Enter your Name"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 rounded-xl bg-teal-500 text-white font-bold hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        Register
                    </button>
                </form>
                <p className="text-zinc-400 mt-4">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register