import React from "react";

type ToggleProps = {
    isToggled: boolean;
    clicked: () => void;
};

const ToggleButton = (props: ToggleProps): React.ReactElement => {
    const handleClick = () => {
        props.clicked();
    };

    const toggleBoxClasses = props.isToggled ? 'toggle-box toggle-on' : 'toggle-box toggle-off';
    const toggleText = !props.isToggled ? 'Enable autocomplete' : 'Disable autocomplete';

    return (
        <div className="toggle-wrapper" onClick={handleClick}>
            <div className={toggleBoxClasses}>
                <div className="toggle-info">{toggleText}</div>
            </div>
        </div>
    );
};

export default ToggleButton;