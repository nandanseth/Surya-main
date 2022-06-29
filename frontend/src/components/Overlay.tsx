import React, { CSSProperties, useEffect, useState } from 'react'

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
        display: 'flex',
        flexFlow: 'row wrap',
    } as CSSProperties,
}
const Overlay = ({ show, children, style = {} }) => {
    const [render, setRender] = useState(show)

    useEffect(() => {
        if (show) setRender(true)
    }, [show])

    const onAnimationEnd = () => {
        if (!show) setRender(false)
    }

    const s: React.CSSProperties = {
        ...styles.overlay,
        ...style,
        animation: `${show ? 'fadein' : 'fadeout'} .5s`,
    }
    return (
        render && (
            <div
                className="overlay-block"
                onAnimationEnd={onAnimationEnd}
                style={s}
            >
                {children}
            </div>
        )
    )
}

export default Overlay
