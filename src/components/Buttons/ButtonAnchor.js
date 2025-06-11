import React from "react";
import './Button.scss';

export default function ButtonAnchor({children}) {
    return (
        <button href = "#" className="anchor-button">{children}</button>
    )
}
