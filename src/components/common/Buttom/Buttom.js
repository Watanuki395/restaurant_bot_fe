import React, { useState } from 'react';
import styles from './buttom.module.css';

const Button = ({ children, onClick, btnColor = 'teal', labelColor, disabled, type, style, ...props }) => {
    const [
        hover,
        setHover
    ] = useState(false);

    const toggleHover = () => {
        setHover(!hover);
    };
    
    const commonStyles = {
        backgroundColor : btnColor,
        color           : labelColor || 'white'
    };
    const outlineStyles = {
        border          : `1px solid ${btnColor}`,
        color           : btnColor,
        backgroundColor : 'white'
    };
    const outlineHoverStyle = {
        color           : labelColor || 'white',
        backgroundColor : btnColor
    };

    const roundedStyle = {
        backgroundColor : btnColor,
        color           : labelColor || 'white',
        borderRadius    : '25px'
    };
    const disabledStyle = {
        cursor          : 'default',
        backgroundColor : btnColor,
        color           : labelColor || 'white',
        opacity         : 0.4
    };
    const blockStyles = {
        width  : '95%',
        height: '85%',
        margin : '0 auto',
        borderRadius    : '25px'
    };
    let btnStyle;
    switch (type) {
        case 'rounded':
            btnStyle = roundedStyle;
            break;
        case 'block':
            btnStyle = blockStyles;
            break;
        case 'outline':
            if (hover) {
                btnStyle = outlineHoverStyle;
            }
            else {
                btnStyle = outlineStyles;
            }
            break;
        default:
            btnStyle = {
                backgroundColor : btnColor,
                color           : labelColor || 'white'
            };
            break;
    }
    return (
        <button
            style={
                    disabled ? { ...commonStyles, ...btnStyle, ...disabledStyle, ...style } :
                    { ...commonStyles, ...btnStyle, ...style }
            }
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            {...props}
            type="button"
            onClick={
                    !disabled ? onClick :
                    () => {}
            }
            className={styles.btn}
        >
            {children || 'button'}
        </button>
    );
};

export default Button;