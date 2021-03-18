import React from "react";

import "components/Button.scss";

import classnames from "classnames";

export default function Button(props) {
   const buttonClass = classnames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });

   return (
      <button
         className={buttonClass}
         onClick={props.onClick}
         disabled={props.disabled}
      >
         {props.children}
      </button>
   );
}




//STORYBOOK REQUIREMENTS FOR TODAY
//test different states of button component. 
//five stories, base confirm, danger, clickable, disabled
//verify that the styles are applied conditionally for confirm and danger states.
//verify action is logged with clickable state and not logged with disabled state.