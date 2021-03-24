import { useEffect, useState } from 'react';
import axios from 'axios';

// //the maximum appointments for a day.
// // const totalSpots = day.appointments.length;
// let availableSpots = 0;
// days.appointment.forEach(day => {
//     if (day.interview === null) {
//         availableSpots += 1;
//     }
// })
// return availableSpots
// //perform check,

// //spots is used in daylistitems
// //loop through the days.appointments, 
// //for each id, check if interview === null.
// //
// //return the number of availableSpots (the ones that are null in a day)

export default function useApplicationData() {
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        // you may put the line below, but will have to remove/comment hardcoded appointments variable
        appointments: {},
        interviewers: {}
    });

    const setDay = day => setState({ ...state, day });

    const updateSpots = function (number, dayName) {
        const dayArray = [...state.days];
        console.log('dayArray', dayArray);
        const updatedDays = dayArray.map((day) => {
            if (day.name === dayName && day.spots >= 0) {
                day.spots += number
            };
        })
        console.log(dayName);
        console.log('updatedDay', updatedDays)
        setState({ ...state, updatedDays })
    }



    //so when a day is set, we know that a spot has been taken.
    //if we get a new appointment id, then we have to take a spot.
    //if we get rid of an id, then we get back a spot.
    //this function is going to a.) store spots,
    //b.) be called to update in book interview
    // and in cancel interview. So, whenever we set a day,
    //we need to update a spot. 


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

        updateSpots(-1, state.day);

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

        return axios.put(`/api/appointments/${id}`, appointment)
            .then(() => {
                setState({
                    ...state,
                    appointments
                });
            })
    }

    function cancelInterview(id) {
        const appointment = {
            ...state.appointments[id],
            interview: null
        };
        const appointments = {
            ...state.appointments,
            [id]: appointment
        };

        updateSpots(1, state.day);

        return axios.delete(`/api/appointments/${id}`)
            .then((res) => {
                setState({
                    ...state,
                    appointments
                })
            })
    }

    useEffect(() => {
        Promise.all([
            axios.get('/api/days'),
            axios.get('/api/appointments'),
            axios.get('/api/interviewers')
        ]).then((all) => {
            console.log(all);
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