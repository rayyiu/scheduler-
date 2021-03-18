import React from "react";
import classnames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
    const formatSpots = props => {
        let num;
        let unit = 'spot';

        props.spots === 0 ? num = 'no' : num = props.spots;
        if (props.spots !== 1) { unit += 's' };

        return `${num} ${unit} remaining`;
    }

    const dayClass = classnames("day-list__item", {
        "day-list__item--selected": props.selected,
        "day-list__item--full": props.spots === 0,
    });
    return (
        <li className={dayClass} onClick={() => props.setDay(props.name)}>
            <h2 className="text--regular">{props.name}</h2>
            <h3 className="text--light">{formatSpots(props)}</h3>
        </li>
    );
}