import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';

function AlertMessage({ info, variant, open, navigateRoute, id, classname, infobtn, checked }) {
    let navigate = useNavigate();
    const routeChange = () => {
        if (navigateRoute === undefined || navigateRoute === '') {
            return 0;
        } else {
            let path = `/${navigateRoute}`;
            navigate(path);
        }
    };

    return (
        <>
            <Alert
                className={classname}
                key={variant}
                variant={variant}
                style={{ display: open }}
                onClick={routeChange}
                id={id}
            >
                {info}
            </Alert>
        </>
    );
}

export default AlertMessage;
