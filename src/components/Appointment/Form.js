import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList"

export default function Form(props) {
    console.log("form", props)
    const [name, setName] = useState(props.name || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);
    const [error, setError] = useState("");
    console.log("interviewer", interviewer);
    //reset the form values
    const reset = () => {
        setName("");
        setInterviewer(null)
    }

    //allows cancellation of form
    const cancel = () => {
        props.onCancel()
        reset();
    }
    //validates whether or not the user has inputted into necessary field
    const validate = function () {
        if (name === "") {
            setError("Student name cannot be blank");
            return;
        }
        setError("")
        props.onSave(name, interviewer);
    }

    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form autoComplete="off" onSubmit={event => event.preventDefault()}>
                    <input
                        className="appointment__create-input text--semi-bold"
                        name="name"
                        type="text"
                        placeholder="Enter Student Name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                        /*
                          This must be a controlled component
                        */
                        data-testid="student-name-input"
                    />
                </form>
                {console.log("interviewerstuff", interviewer)}
                <section className="appointment__validation">{error}</section>
                <InterviewerList
                    interviewers={props.interviewers}
                    interviewer={interviewer}
                    setInterviewer={setInterviewer} />
                {/* <InterviewerListItem
                key={interviewer.id}
                name={interviewer.name}
                avatar={interviewer.avatar}
                selected={props.interviewer === interviewer.id}
                setInterviewer={(event) => props.onChange(interviewer.id)}
            /> */}
                {/* <InterviewerList
                    // interviewers={props.interviewers}
                    value={interviewer}
                    onChange={setInterviewer} /> */}
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button danger onClick={cancel}>Cancel</Button>
                    <Button confirm onClick={validate}>Save</Button>
                </section>
            </section>
        </main>

    )
}