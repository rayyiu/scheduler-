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