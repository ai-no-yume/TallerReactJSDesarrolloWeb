import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../services/firebase';
import User from '../models/User';

function Home() {
    const user = new User();
    const [signinVisibility, setSigninVisibility] = useState(false);
    const [signupVisibility, setSignupVisibility] = useState(true);

    const handleSignup = async (event) => {
        event.preventDefault();

        const userCollectionRef = collection(db, 'users');
        const documentRef = await addDoc(userCollectionRef, {
            identification: user.getIdentification(),
            password: user.getPassword(),
        });
        console.log(documentRef);
    };

    const handleSignin = async (event) => {
        console.log('yeah')
    }

    const switchForm = async () => {
        setSigninVisibility(!signinVisibility);
        setSignupVisibility(!signupVisibility);
    }

    return (
        <div>
            {signinVisibility && (
                <>
                <h1>Sign in</h1>
                    <form onSubmit={handleSignin}>
                        <div>
                            <label>identification</label>
                            <input type="number" placeholder="idenification" onChange={(e) => user.setIdentification(e.target.value)} required />
                        </div>

                        <div>
                            <label>password</label>
                            <input type="password" placeholder="password" onChange={(e) => user.setPassword(e.target.value)} required />
                        </div>

                        <div>
                            <button>Sign in</button>
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
                                <label>identification</label>
                                <input type="number" placeholder="idenification" onChange={(e) => user.setIdentification(e.target.value)} required />
                            </div>

                            <div>
                                <label>password</label>
                                <input type="password" placeholder="password" onChange={(e) => user.setPassword(e.target.value)} required />
                            </div>

                            <div>
                                <button>Sign up</button>
                            </div>
                        </form>
                        <button onClick={switchForm}>Already have an accout?</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;
