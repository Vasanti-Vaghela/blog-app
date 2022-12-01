import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [data, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() =>{
        const abortConst = new AbortController()

        setTimeout(() => {
          fetch(url, {signal: abortConst.signal})
          .then(res => {
              if(!res.ok){
                  throw Error('Could not find the the resource')
              }
              return res.json()
          })
          .then(data => {
              
              setBlogs(data)
              setIsPending(false)
              setError(null)
          })
          .catch(err => {
              if(err.name === 'AbortError') {
                console.log('fetch aborted')
              } else {
                setError(err.message)
                setIsPending(false)
              }
              
              
          })
        },1000)

        return () => abortConst.abort()  //cleanup function using abortController
      },[url]) ;

      return { data, isPending, error }
}

export default useFetch;