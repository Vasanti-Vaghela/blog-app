import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const { id } = useParams()
    const { data: blogs, error, isPending } = useFetch('http://localhost:8000/blogs/' + id)
    const history = useHistory()

    const handleClick = () => {
        fetch('http://localhost:8000/blogs/' + blogs.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/')
        })

    }

    return ( 
        <div className="blog-details">
            { isPending && <div> Loading ...</div>}
            { error && <div> { error }</div>}
            { blogs && (
                <article>
                    <h2>{ blogs.title }</h2>
                    <p>Written by { blogs.author }</p>
                    <div>{ blogs.body }</div>
                    <button onClick={handleClick}>delete</button>
                </article>
            )}
        </div>
     );
}
 
export default BlogDetails;