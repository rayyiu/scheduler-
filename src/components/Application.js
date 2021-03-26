import React from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import "components/Application.scss";
import { getAppointmentsForDay, getInterviewersForDay } from '../helpers/selectors';
import { getInterview } from "../helpers/selectors";
import useApplicationData from "../hooks/useApplicationData"


export default function Application() {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const interviewers = getInterviewersForDay(state, state.day);

  console.log(state.interviewers);
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

