import React from "react";
import Button from "components/Button.js"

export default function Confirm(props) {
    return (
        <main className="appointment__card appointment__card--confirm">
            <h1 className="text--semi-bold">{props.message}</h1>
            <section className="appointment__actions">
                <Button dangeronClick={props.OnCancel}>Cancel</Button>
                <Button dangerOnClick={props.OnConfirm}>Confirm</Button>
            </section>
        </main>
    )
}