import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../services/firebase';
import Event from '../models/Event';

function EventSchedule() {
    const event = new Event();
    const [eventFormVisibility, setEventFormVisibility] = useState(true);
    const [eventScheduleVisibility, setEventScheduleVisibility] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleNewEvent = async (event) => {
        event.preventDefault();

        const eventCollectionRef = collection(db, 'events');
        await addDoc(eventCollectionRef, {
            identification: '1',
            date: event.getDate(),
            description: event.getDescription(),
        });
        // console.log(documentRef); -- testing purposes only
    };

    // const handleSignin = async (event) => {
    //     event.preventDefault();
    //     setErrorMessage('');

    //     const userCollectionRef = collection(db, 'users');
    //     const q = query(
    //         userCollectionRef,
    //         where("identification", "==", event.getIdentification()),
    //         where("password", "==", event.getPassword())
    //     );

    //     const querySnapshot = await getDocs(q);
        
    //     if (!querySnapshot.empty) {
    //         console.log("Sign in successful!");
    //     } else {
    //         setErrorMessage('Invalid credentials. Please try again.');
    //     }
    // };

    // const switchForm = async () => {
    //     setSigninVisibility(!signinVisibility);
    //     setSignupVisibility(!signupVisibility);
    //     setErrorMessage('');
    // };

    return (
        <div>
            {eventFormVisibility && (
                <>
                    <h1>Creating a new Event</h1>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <form onSubmit={handleNewEvent}>
                        <div>
                            <label>Date</label>
                            <input type="date" onChange={(e) => event.setDate(e.target.value)} required />
                        </div>
                        <div>
                            <label>Description</label>
                            <input type="text" placeholder="Event description" onChange={(e) => event.setDescription(e.target.value)} required />
                        </div>
                        <div>
                            <button type="submit">Create Event</button>
                        </div>
                    </form>
                    {/* <button onClick={switchForm}>Wanna see the events list?</button> */}
                </>
            )}

            {/* <div>
                {signupVisibility && (
                    <>
                        <h1>Sign up</h1>
                        <form onSubmit={handleSignup}>
                            <div>
                                <label>Identification</label>
                                <input type="number" placeholder="Identification" onChange={(e) => event.setIdentification(e.target.value)} required />
                            </div>
                            <div>
                                <label>Password</label>
                                <input type="password" placeholder="Password" onChange={(e) => event.setPassword(e.target.value)} required />
                            </div>
                            <div>
                                <button type="submit">Sign up</button>
                            </div>
                        </form>
                        <button onClick={switchForm}>Already have an account?</button>
                    </>
                )}
            </div> */}
        </div>
    );
}

export default EventSchedule;
