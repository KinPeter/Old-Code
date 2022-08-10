import React from 'react';

type OptionProps = {
    option: string;
    isHovered: boolean;
    selected: (value: string) => void;
}

const Option = (props: OptionProps): React.ReactElement => {
    const handleClick = (event: any) => {
        props.selected(event.target.innerText);
    };

    const handleMouseEnter = (event: any) => {
        event.target.classList.add('hovered');
    };
    const handleMouseLeave = (event: any) => {
        event.target.classList.remove('hovered');
    };

    return (
        <li 
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={props.isHovered ? 'hovered' : ''} >
            {props.option}
        </li>);
};

export default Option;