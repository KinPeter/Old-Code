import React from 'react';

type Props = {
    message: string;
}

const ErrorAlert = (props: Props): React.ReactElement => {
    return (
        <div className="alert alert-danger">
            <i className="fas fa-exclamation-circle"></i> {props.message}
        </div>
    );
};

export default ErrorAlert;