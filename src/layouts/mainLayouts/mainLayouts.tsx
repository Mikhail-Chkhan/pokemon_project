import React from 'react';
import {Outlet} from "react-router-dom";

const MainLayouts = () => {
    return (
        <div>

            <div><Outlet/></div>
        </div>
    );
};

export default MainLayouts;