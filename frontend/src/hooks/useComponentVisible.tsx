import { useEffect, useRef, useState } from 'react'

const useComponentVisible = (initialIsVisible: boolean) => {
    const [isComponentVisible, setIsComponentVisible] =
        useState(initialIsVisible)
    const ref = useRef(null)

    const handleClickOutside = (event: { target: any }) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    })

    return { ref, isComponentVisible, setIsComponentVisible }
}

export default useComponentVisible

/**
 const App = () => {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(true);
  return (
    <div ref={ref}>
      {isComponentVisible && (
        <span style={{ border: "1px solid black" }}>Going into Hiding</span>
      )}
      {!isComponentVisible && (
        <p onClick={() => setIsComponentVisible(true)}>
          Component hidden: Click me show component again
        </p>
      )}
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

 *
 *
 */
