import React from 'react';

type InputProps = {
    changed: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    value: string;
    onEnter: () => void;
    onEscape: () => void;
    onDownKey: () => void;
    onUpKey: () => void;
}

const InputField = (props: InputProps): React.ReactElement => {

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Escape") {
            props.onEscape();
        }
        else if (event.key === "ArrowDown") {
            props.onDownKey();
        }
        else if (event.key === "ArrowUp") {
            props.onUpKey();
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            props.onEnter();
        }        
    };

    return (
        <div className="input-wrapper">
            <input
                type="text"
                className="input-field form-control"
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.changed}
                onKeyDown={handleKeyDown}
                onKeyPress={handleKeyPress}
            />
        </div>
    );
}

export default InputField;