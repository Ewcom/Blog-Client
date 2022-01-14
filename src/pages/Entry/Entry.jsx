import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './entry.scss'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';



export const Entry = () => {

    const [postData, setPostData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const params = useParams()
    const navigate = useNavigate()


    //get single post data
    async function getPostData() {

        setIsLoading(true)
        try {
            const res = await axios.get(`http://localhost:8080/api/entry/search/${params.id}`)
            setPostData(res.data)
            setIsLoading(false)

        } catch (e) {
            setError(true)
        }
    }

    //load data on first render
    useEffect(() => {

        getPostData()

    }, [])

    //if URL id is bad navigate to home
    if (error) {
        navigate('/')
    }

    return (
        <div className='entry'>

            <header>
                <h1>VILLALBLOG</h1>
            </header>

            <nav>
        
                <KeyboardBackspaceIcon className='return-icon' onClick={()=>{navigate('/')}}/>
            </nav>

            <div className="entry-container">

                <div className="entry-body">

                    {(!isLoading && postData) ?

                        <div className='entry-body-data'>
                            <div className='entry-title'>{postData.title}</div>
                            <div className='entry-author'> By {postData.author}</div>
                            <div className='entry-date'>{new Date(postData.createdAt).toDateString()}</div>
                            <hr />
                            <div className='entry-content'>{postData.content}</div>
                        </div>
                        : <>LOADING DATA</>}
                </div>
            </div>
        </div>
    )
}
