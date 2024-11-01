import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../services/firebase';
import Event from '../models/Event';

function EventSchedule() {
    const eventInstance = new Event();
    const [eventFormVisibility, setEventFormVisibility] = useState(true);
    const [eventScheduleVisibility, setEventScheduleVisibility] = useState(false);
    // const [errorMessage, setErrorMessage] = useState('');

    const handleNewEvent = async (event) => {
        event.preventDefault();

        const eventCollectionRef = collection(db, 'events');
        await addDoc(eventCollectionRef, {
            identification: '1',
            date: eventInstance.getDate(),
            description: eventInstance.getDescription(),
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

    const switchMode = async () => {
        setEventFormVisibility(!eventFormVisibility);
        setEventScheduleVisibility(!eventScheduleVisibility)
        // setErrorMessage('');
    };

    return (
        <div>
            {eventFormVisibility && (
                <>
                    <h1>Creating a new Event</h1>
                    {/* {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} */}
                    <form onSubmit={handleNewEvent}>
                        <div>
                            <label>Date</label>
                            <input type="date" onChange={(e) => eventInstance.setDate(e.target.value)} required />
                        </div>
                        <div>
                            <label>Description</label>
                            <input type="text" placeholder="Event description" onChange={(e) => eventInstance.setDescription(e.target.value)} required />
                        </div>
                        <div>
                            <button type="submit">Create Event</button>
                        </div>
                    </form>
                    <button onClick={switchMode}>Wanna see the events list?</button>
                </>
            )}

            {eventScheduleVisibility && (
                <>
                    <h1>Current Schedule</h1>

                    <button onClick={switchMode}>Wanna add an event?</button>
                </>
            )}

        </div>
    );
}

export default EventSchedule;
