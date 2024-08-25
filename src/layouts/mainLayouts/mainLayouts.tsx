import React from 'react';
import {Outlet} from "react-router-dom";
import SearchBarComponent from "../../components/SearchBarComponents/SearchBarComponent";
import styles from "./mainLayouts.module.css"

const MainLayouts = () => {
    return (
        <div>

            <div className={styles.Content}><Outlet/></div>
        </div>
    );
};

export default MainLayouts;