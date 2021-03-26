//maps over an array of Days, returns an array with the appointments on any given day. 
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
//The same as getAppointmentsForDay, returns an array of Interviewers available for a day.
export function getInterviewersForDay(state, day) {
    let result = [];
    let interviewerId = [];
    const daysArray = state.days;
    const interviewers = state.interviewers;

    daysArray.forEach(stateDay => {
        if (stateDay.name === day) {
            interviewerId.push(...stateDay.interviewers)
        }
    });
    for (let key in interviewers) {
        interviewerId.includes(interviewers[key].id) && result.push(interviewers[key])
    }
    return result;
};
