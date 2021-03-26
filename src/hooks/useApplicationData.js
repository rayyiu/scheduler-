import { useEffect, useState } from 'react';
import axios from 'axios';


export default function useApplicationData() {
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        // you may put the line below, but will have to remove/comment hardcoded appointments variable
        appointments: {},
        interviewers: {}
    });

    const setDay = day => setState({ ...state, day });
    //previous updateSpots functionality
    // const updateSpots = function (number, dayName) {
    //     const dayArray = [...state.days];
    //     console.log('dayArray', dayArray);
    //     const updatedDays = dayArray.map((day) => {
    //         if (day.name === dayName && day.spots >= 0) {
    //             return { ...day, spots: day.spots += number }
    //         };
    //         return { ...day };
    //     })
    //     console.log(dayName);
    //     console.log('updatedDay', updatedDays)
    //     return updatedDays;
    // }
    // setState({ ...state, days: updatedDays })
    //bookInterview function, gets id and interview, creates a appointment with the id passed in and the interview, 
    //places this appointment into a appointments array, then returns a promise which carries the functionality through 
    //to index.js for the Appointment component. Also handles for editing interviews and the spots functionality for that.
    function bookInterview(id, interview) {
        console.log("bookinterview", id, interview);
        const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
        };

        const appointments = {
            ...state.appointments,
            [id]: appointment
        };
        //also previous updateSpots functionality
        // const bookingSpot = updateSpots(-1, state.day);
        // setState({ ...state, days: bookingSpot });

        // setState({
        //     ...state,
        //     appointments
        // });
        // const days = state.days.map((day) => {
        //     if (day.appointments.includes(id)) {
        //         // we update spots here, else, we return 
        //         //day as is. 
        //     } else {
        //         return day;
        //     }
        // })
        //create a new promise when we create a new appointment, 
        //promise resolves in index.js, gets data, updates spots,
        //creates interview.
        return new Promise((res, rej) => {
            if (!appointment.interview.interviewer) {
                rej()
                return;
            }
            axios.put(`/api/appointments/${id}`, appointment)
                .then(() => {
                    axios.get(`/api/days`)
                        .then((resTwo) => {
                            setState({
                                ...state,
                                appointments,
                                days: resTwo.data
                            })
                            res();
                        })

                })
                .catch((a, b) => {
                    rej();
                })
        })
    }
    //the same as book interview except here the functionality is to delete from the UI and the database. Promise again resolves in index.js of the Appointment component.
    function cancelInterview(id) {
        const appointment = {
            ...state.appointments[id],
            interview: null
        };
        const appointments = {
            ...state.appointments,
            [id]: appointment
        };

        // const cancelSpot = updateSpots(1, state.day);

        return axios.delete(`/api/appointments/${id}`)
            .then((res) => {
                axios.get(`/api/days`)
                    .then((resTwo) => {
                        setState({
                            ...state,
                            appointments,
                            days: resTwo.data
                        })

                    })
            })
    }
    //useEffect to setStates for main data items to be used in parent component Application.js.
    //Promises get information from API and set the state for Application with them.
    useEffect(() => {
        Promise.all([
            axios.get('/api/days'),
            axios.get('/api/appointments'),
            axios.get('/api/interviewers')
        ]).then((all) => {
            console.log('all', all);
            setState(res => ({
                ...res,
                days: all[0].data,
                appointments: all[1].data,
                interviewers: all[2].data
            }))
        })
    }, [])

    return { state, setDay, bookInterview, cancelInterview }
}