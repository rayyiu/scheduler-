import React from 'react';
import "components/InterviewerListItem.scss"
export default function InterviewerListItem(props) {
    return (
        <li className="interviewers__item">
            <img
                className="interviewers__item-image"
                src={props.avatar}
                alt={props.name}
            />
  Sylvia Palmer
        </li>
    )

}
