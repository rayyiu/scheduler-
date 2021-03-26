import React from "react"
import "./styles.scss"
import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import Confirm from 'components/Appointment/Confirm';
import Status from 'components/Appointment/Status';
import useVisualMode from '../../hooks/useVisualMode';
import Form from 'components/Appointment/Form';
import Error from 'components/Appointment/Error';

export default function Appointment(props) {
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    const SAVING = "SAVING";
    const CONFIRM = "CONFIRM";
    const DELETE = "DELETE";
    const EDIT = "EDIT";
    const ERROR_SAVE = "ERROR_SAVE";
    const ERROR_DELETE = "ERROR_DELETE";
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );
    // console.log('name', props.interviewers)
    const save = function (name, interviewer) {
        const interview = {
            student: name,
            interviewer
        };
        transition(SAVING);

        props.bookInterview(props.id, interview)
            .then(() => transition(SHOW))
            .catch(() => transition(ERROR_SAVE, true))
        //YOU HAVE TO ADD HANDLING FOR NOT PICKING AN INTERVIEWER
    }
    const deleteInterview = function () {
        transition(CONFIRM);
    }
    const confirmDeletion = function () {
        transition(DELETE, true);
        // console.log('does this work');
        props.cancelInterview(props.id)
            .then(() => transition(EMPTY))
            .catch(() => transition(ERROR_DELETE, true))
    }
    console.log('propsInterviewersF', props.interview);
    return (
        <article className="appointment" data-testid="appointment">
            <Header time={props.time} />
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === CREATE && <Form
                interviewers={props.interviewers}
                onSave={save}
                onCancel={back} />}
            {mode === SHOW &&
                <Show
                    student={props.interview.student}
                    id={props.id}
                    interviewer={props.interview.interviewer}
                    onDelete={deleteInterview}
                    onEdit={() => transition(EDIT)}
                />
            }
            {mode === SAVING &&
                <Status
                    message={SAVING}
                />
            }

            {mode === EDIT && (
                <Form
                    interviewer={props.interview.interviewer.id}
                    name={props.interview.student}
                    interviewers={props.interviewers}
                    onCancel={back}
                    onSave={save} />
            )}
            {mode === DELETE &&
                <Status
                    message={'Deleting'}
                />}
            {mode === CONFIRM &&
                <Confirm
                    message={'Are you sure you would like to delete'}
                    onConfirm={confirmDeletion}
                    onCancel={back}
                />}
            {mode === ERROR_SAVE && (
                <Error
                    message="We were unable to save your changes"
                    onClose={back} />
            )}
            {mode === ERROR_DELETE && (
                <Error
                    message="We were unable to delete"
                    onClose={back}
                />
            )}
        </article>
    )
}
//Update the onAdd function we pass to our Empty component to transition to the CREATE mode when the user clicks the add appointment button, instead of logging to the console.



/* // /* {props.interview ? */
            //     <Show student={props.interview.student}
            //         interviewer={props.interview.interviewer} />
            //     // : <Empty />} */

//accept student:string, interviewer:Object cf.,stories/index.js, onEdit: Function, onDelete: Function