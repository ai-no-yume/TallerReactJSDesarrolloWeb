import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function EventSchedule() {
    const [isEventFormVisible, setIsEventFormVisible] = useState(true);
    const [isEventScheduleVisible, setIsEventScheduleVisible] = useState(false);
    const [events, setEvents] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [eventDate, setEventDate] = useState('');
    const [eventDescription, setEventDescription] = useState('');

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
        if (isEventScheduleVisible) {
            fetchEvents();
        }
    }, [isEventScheduleVisible]);

    const handleNewEvent = async (e) => {
        e.preventDefault();

        try {
            const eventCollectionRef = collection(db, 'events');
            await addDoc(eventCollectionRef, {
                identification: '1',
                date: eventDate,
                description: eventDescription,
            });
            setEventDate('');
            setEventDescription('');
            fetchEvents();
        } catch (error) {
            setErrorMessage('Error adding event: ' + error.message);
        }
    };

    const switchMode = () => {
        setIsEventFormVisible(!isEventFormVisible);
        setIsEventScheduleVisible(!isEventScheduleVisible);
        setErrorMessage('');
    };

    const filteredEvents = events.filter(event => {
        return new Date(event.date).toDateString() === selectedDate.toDateString();
    });

    return (
        <div>
            {isEventFormVisible && (
                <>
                    <h1>Creating a new Event</h1>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <form onSubmit={handleNewEvent}>
                        <div>
                            <label>Date</label>
                            <input
                                type="date"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Description</label>
                            <input
                                type="text"
                                placeholder="Event description"
                                value={eventDescription}
                                onChange={(e) => setEventDescription(e.target.value)}
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

            {isEventScheduleVisible && (
                <>
                    <h1>Current Schedule</h1>
                    <Calendar
                        onChange={setSelectedDate}
                        value={selectedDate}
                    />
                    <h2>Events on {selectedDate.toDateString()}:</h2>
                    {filteredEvents.length > 0 ? (
                        <ul>
                            {filteredEvents.map(event => (
                                <li key={event.id}>
                                    <strong>{event.description}</strong> on {new Date(event.date).toLocaleDateString()}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No events found for this date.</p>
                    )}
                    <button onClick={switchMode}>Wanna add an event?</button>
                </>
            )}
        </div>
    );
}

export default EventSchedule;
