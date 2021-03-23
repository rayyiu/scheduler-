export function getAppointmentsForDay(state, day) {
    let result = [];
    let appointmentId = [];

    const daysArray = state.days;
    const appointments = state.appointments;

    daysArray.map(stateDay => {
        return stateDay.name === day && appointmentId.push(...stateDay.appointments)
    });

    for (let key in appointments) {
        appointmentId.includes(appointments[key].id) && result.push(appointments[key])
    }

    return result;
};

export function getInterview(state, interview) {
    if (!interview) {
        return null;
    }
    const result = { ...interview };
    result['interviewer'] = state.interviewers[interview.interviewer];
    return result;
}

export function getInterviewersForDay(state, day) {
    let result = [];
    let interviewerId = [];

    const daysArray = state.days;
    const interviewers = state.interviewers;

    daysArray.map(stateDay => {
        return stateDay.name === day && interviewerId.push(...stateDay.interviewers)
    });

    for (let key in interviewers) {
        interviewerId.includes(interviewers[key].id) && result.push(interviewers[key])
    }

    return result;
};
