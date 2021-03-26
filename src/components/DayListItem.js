import React from "react";
import classnames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
    //displays how many spots are left in a day
    const formatSpots = props => {
        let num;
        let unit = 'spot';

        props.spots === 0 ? num = 'no' : num = props.spots;
        if (props.spots !== 1) { unit += 's' };
        return `${num} ${unit} remaining`;
    }

    // function formatSpots(spots) {
    //     if (spots === 0) {
    //         return "no spots remaining";
    //     } else if (spots === 1) {
    //         return "1 spot remaining";
    //     } else {
    //         return `${spots} spots remaining`;
    //     }
    // }


    const dayClass = classnames("day-list__item", {
        "day-list__item--selected": props.selected,
        "day-list__item--full": props.spots === 0,
    });
    return (
        <li className={dayClass} data-testid="day" onClick={() => props.setDay(props.name)}>
            <h2 className="text--regular">{props.name}</h2>
            <h3 className="text--light">{formatSpots(props)}</h3>
        </li>
    );
}