import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import "components/Application.scss";
import { getAppointmentsForDay, getInterviewersForDay } from '../helpers/selectors';
import InterviewerList from "./InterviewerList";
import { getInterview } from "../helpers/selectors";
import useApplicationData from "../hooks/useApplicationData"

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   }
// ];

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];


export default function Application() {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   // you may put the line below, but will have to remove/comment hardcoded appointments variable
  //   appointments: {},
  //   interviewers: {}
  // });
  // const setDay = day => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const interviewers = getInterviewersForDay(state, state.day);

  // function bookInterview(id, interview) {
  //   console.log("bookinterview", id, interview);
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };

  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };

  //   // setState({
  //   //   ...state,
  //   //   appointments
  //   // });

  //   return axios.put(`/api/appointments/${id}`, appointment)
  //     .then(() => {
  //       setState({
  //         ...state,
  //         appointments
  //       });
  //     })
  // // }

  // function cancelInterview(id) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: null
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  //   return axios.delete(`/api/appointments/${id}`)
  //     .then((res) => {
  //       setState({
  //         ...state,
  //         appointments
  //       })
  //     })
  // }

  // useEffect(() => {
  //   Promise.all([
  //     axios.get('/api/days'),
  //     axios.get('/api/appointments'),
  //     axios.get('/api/interviewers')
  //   ]).then((all) => {
  //     console.log(all);
  //     setState(res => ({
  //       ...res,
  //       days: all[0].data,
  //       appointments: all[1].data,
  //       interviewers: all[2].data
  //     }))
  //   })
  // }, [])
  console.log(state.interviewers);
  // const interview = getInterview(state, appointment.interview);
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment => {
          const interview = getInterview(state, appointment.interview);
          return <Appointment
            key={appointment.id}
            {...appointment}
            interviewers={interviewers}
            interview={interview}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
          />
        })}
        <Appointment key="last" time="5pm" />
      </section>

    </main>

  );
}

