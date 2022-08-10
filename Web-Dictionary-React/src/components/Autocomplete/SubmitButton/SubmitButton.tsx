import React from "react";

type ButtonProps = {
    buttonText: string;
    clicked: () => void;
};

const SubmitButton = (props: ButtonProps): React.ReactElement => {
    const handleClick = (event: any) => {
        props.clicked();
        event.target.blur();
    };

    return <button onClick={handleClick}>{props.buttonText}</button>;
};

export default SubmitButton;
