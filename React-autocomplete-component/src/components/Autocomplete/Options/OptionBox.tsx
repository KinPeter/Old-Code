import React, { useEffect, useRef } from 'react';
import Option from './Option'

type OptionBoxProps = {
    options: string[];
    optionIndex: number;
    selected: (value: string) => void;
    clickedOutside: () => void;
    setRef: (ref: any) => void;
}

const OptionBox = (props: OptionBoxProps): React.ReactElement | null => {
    const boxRef = useRef(document.createElement("div"));

    const handleClickOutside = (event: any): void => {
        if (boxRef.current.contains(event.target)) {            
            return; // inside click, nothing to do
        }
        props.clickedOutside();
    };

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClickOutside);
        // return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!props.options.length) {
        return null;
    }

    const options = props.options.map((option, index) => {
        return <Option 
                    key={index} 
                    option={option} 
                    selected={props.selected}
                    isHovered={index === props.optionIndex} />;
    });

    return (
        <div className="option-wrapper" ref={boxRef}>
            <ul className="option-list" ref={props.setRef}>{options}</ul>
        </div>
    );
};

export default OptionBox;