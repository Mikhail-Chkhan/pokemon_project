import React from 'react';
import {Outlet} from "react-router-dom";

const MainLayouts = () => {
    return (
        <div>
            mainLayouts
            <Outlet/>
        </div>
    );
};

export default MainLayouts;