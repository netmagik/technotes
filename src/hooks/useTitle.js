import { useEffect } from 'react'

const useTitle = (title) => {
    
    useEffect(() => {
        // get old page title from the DOM
        const prevTitle = document.title
        // set the DOM title to the new title
        document.title = title

        // cleanup function sets the title back to whatever it was 
        // when component unmounts
        return () => document.title = prevTitle
    }, [title])
}

export default useTitle