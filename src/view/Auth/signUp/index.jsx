import React, { useState } from 'react';
import '../auth.style.scss';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../../firebase';
import { errorTost, successTost } from '../../../utils/utils';
import { Link, useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = (e) => {
        e.preventDefault();
        const auth = getAuth(app);
        setLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                successTost('Your profile is created successfully');
                navigate('/');
            })
            .catch(() => {
                errorTost("Something went wrong. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="authContiner">
            <form onSubmit={handleSignUp}>
                <h3>Sign-Up</h3>

                <label htmlFor="sEmail">Email</label>
                <input
                    type="text"
                    placeholder="Email or Phone"
                    id="sEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className='authLink'>
                    <button type="submit" disabled={loading}>
                        {loading ? (
                            <div className='flex justify-center items-center'>
                                <span className="relative flex h-6  w-6">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-600 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-6 w-6 bg-violet-700"></span>
                                </span>
                            </div>
                        ) : (
                            'Sign Up'
                        )}
                    </button>
                    <Link to="/">Log in</Link>
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;
