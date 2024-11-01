import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../services/firebase';
import User from '../models/User';

function Home() {
    const user = new User();
    const [signinVisibility, setSigninVisibility] = useState(false);
    const [signupVisibility, setSignupVisibility] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignup = async (event) => {
        event.preventDefault();

        const userCollectionRef = collection(db, 'users');
        const documentRef = await addDoc(userCollectionRef, {
            identification: user.getIdentification(),
            password: user.getPassword(),
        });
        // console.log(documentRef); -- testing purposes only
    };

    const handleSignin = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        const userCollectionRef = collection(db, 'users');
        const q = query(
            userCollectionRef,
            where("identification", "==", user.getIdentification()),
            where("password", "==", user.getPassword())
        );

        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            console.log("Sign in successful!");
        } else {
            setErrorMessage('Invalid credentials. Please try again.');
        }
    };

    const switchForm = async () => {
        setSigninVisibility(!signinVisibility);
        setSignupVisibility(!signupVisibility);
        setErrorMessage('');
    };

    return (
        <div>
            {signinVisibility && (
                <>
                    <h1>Sign in</h1>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <form onSubmit={handleSignin}>
                        <div>
                            <label>Identification</label>
                            <input type="number" placeholder="Identification" onChange={(e) => user.setIdentification(e.target.value)} required />
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" placeholder="Password" onChange={(e) => user.setPassword(e.target.value)} required />
                        </div>
                        <div>
                            <button type="submit">Sign in</button>
                        </div>
                    </form>
                    <button onClick={switchForm}>Don't you have an account?</button>
                </>
            )}

            <div>
                {signupVisibility && (
                    <>
                        <h1>Sign up</h1>
                        <form onSubmit={handleSignup}>
                            <div>
                                <label>Identification</label>
                                <input type="number" placeholder="Identification" onChange={(e) => user.setIdentification(e.target.value)} required />
                            </div>
                            <div>
                                <label>Password</label>
                                <input type="password" placeholder="Password" onChange={(e) => user.setPassword(e.target.value)} required />
                            </div>
                            <div>
                                <button type="submit">Sign up</button>
                            </div>
                        </form>
                        <button onClick={switchForm}>Already have an account?</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;
