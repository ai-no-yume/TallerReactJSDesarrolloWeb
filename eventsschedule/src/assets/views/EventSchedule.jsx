import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import Event from '../models/Event';

function EventSchedule() {
    const [eventInstance, setEventInstance] = useState(new Event());
    const [eventFormVisibility, setEventFormVisibility] = useState(true);
    const [eventScheduleVisibility, setEventScheduleVisibility] = useState(false);
    const [events, setEvents] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchEvents = async () => {
        try {
            const eventCollectionRef = collection(db, 'events');
            const eventDocs = await getDocs(eventCollectionRef);
            const eventsData = eventDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setEvents(eventsData);
        } catch (error) {
            setErrorMessage('Error fetching events: ' + error.message);
        }
    };

    useEffect(() => {
        if (eventScheduleVisibility) {
            fetchEvents();
        }
    }, [eventScheduleVisibility]);

    const handleNewEvent = async (event) => {
        event.preventDefault();

        const eventCollectionRef = collection(db, 'events');
        await addDoc(eventCollectionRef, {
            identification: '1',
            date: eventInstance.getDate(),
            description: eventInstance.getDescription(),
        });
        setEventInstance(new Event());
    };

    const switchMode = () => {
        setEventFormVisibility(!eventFormVisibility);
        setEventScheduleVisibility(!eventScheduleVisibility);
        setErrorMessage('');
    };

    return (
        <div>
            {eventFormVisibility && (
                <>
                    <h1>Creating a new Event</h1>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <form onSubmit={handleNewEvent}>
                        <div>
                            <label>Date</label>
                            <input
                                type="date"
                                onChange={(e) => {
                                    eventInstance.setDate(e.target.value);
                                    setEventInstance({ ...eventInstance });
                                }}
                                required
                            />
                        </div>
                        <div>
                            <label>Description</label>
                            <input
                                type="text"
                                placeholder="Event description"
                                onChange={(e) => {
                                    eventInstance.setDescription(e.target.value);
                                    setEventInstance({ ...eventInstance });
                                }}
                                required
                            />
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
                    {events.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Identification</th>
                                    <th>Date</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map(event => (
                                    <tr key={event.id}>
                                        <td>{event.identification}</td>
                                        <td>{event.date}</td>
                                        <td>{event.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No events found.</p>
                    )}
                    <button onClick={switchMode}>Wanna add an event?</button>
                </>
            )}
        </div>
    );
}

export default EventSchedule;
