import React from 'react'
// import './checkbox.css'
export const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
        <>
            <div className="checkbox-container">
                <input className='mr-3' type="checkbox" ref={resolvedRef} {...rest} />
            </div>
        </>
    )
})