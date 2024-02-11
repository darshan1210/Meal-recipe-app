import React, { useContext, useState } from 'react';
import '../auth.style.scss';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { errorTost, successTost } from '../../../utils/utils';
import { AuthContext } from '../../../utils/AuthContext';

const LoginPage = () => {
    const navigate = useNavigate()
    const { setToken } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        const auth = getAuth(app);
        setLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                successTost('log in successfull')
                const user = userCredential.user;
                setToken(user?.accessToken);
                navigate('/dashboard')
            })
            .catch(() => {
                errorTost("something went wrong please try again");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (

        <div className="authContiner">

            <form onSubmit={handleLogin}>
                <h3>Login Here</h3>

                <label htmlFor="lEmail">Email</label>
                <input
                    type="text"
                    placeholder="Email or Phone"
                    id="lEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="lPassword">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    id="lPassword"
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
                            'Log in'
                        )}
                    </button>
                    <Link to="/sign-up">Sign up</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
