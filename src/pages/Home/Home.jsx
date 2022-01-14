import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './home.scss'
import { useNavigate } from 'react-router-dom';
import { NewEntryModal } from '../../components/NewEntryModal/NewEntryModal';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';


export const Home = () => {

    const [postsData, setPostsData] = useState(null)
    const [originalPostData, setOriginalPostData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [filterOption, setFilterOption] = useState('title')
    const [filterWord, setFilterWord] = useState(null)

    //new entry modal
    const [isModalOpen, setIsModalOpen] = useState(false)

    let navigate = useNavigate()


    //get all the posts data
    async function getPostsData() {

        setIsLoading(true)
        const res = await axios.get('http://localhost:8080/api/entry')
        setPostsData(res.data)
        setOriginalPostData(res.data)
        setIsLoading(false)

    }

    //search filter
    function filterPost() {

        let filteredData = null;

        if (filterOption === 'title') {
            filteredData = originalPostData.filter((post) => (post.title.includes(filterWord)))
        } else if (filterOption === 'author') {
            filteredData = originalPostData.filter((post) => (post.author.includes(filterWord)))
        } else if (filterOption === 'content') {
            filteredData = originalPostData.filter((post) => (post.content.includes(filterWord)))

        }

        setIsLoading(true)
        setPostsData(filteredData)

    }

    //stop loading after updating postData
    useEffect(() => {

        setIsLoading(false)

    }, [postsData]);


    //load preview post on first render
    useEffect(() => {

        getPostsData()

    }, []);



    //onclick navigate to entry full page
    function onPostClickHandler(id) {

        navigate(`/entry/${id}`)

    }


    return (
        <div className='home'>

            <header>
                <h1>VILLALBLOG</h1>
            </header>

            <nav>
                <div className='new-entry-modal'>
                    {/* <button onClick={() => setIsModalOpen(true)}>new</button> */}
                    <AddIcon onClick={() => setIsModalOpen(true)} className='new-button'/>
                    {isModalOpen && <NewEntryModal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
                </div>
                <div className='filter'>
                    <div className='filter-search-container' >
                        <input className='filter-search' type="text" placeholder='search' onChange={(e) => { setFilterWord(e.target.value) }} />
                        <SearchIcon className='search-icon'  onClick={filterPost} />

                    </div>
                    <div className='filter-radio' onChange={(e) => { setFilterOption(e.target.value) }}>
                        <input type="radio" value="title" defaultChecked name="filter" /> <span>Title</span>
                        <input type="radio" value="author" name="filter" /> <span>Author</span>
                        <input type="radio" value="content" name="filter" /> <span>Content</span>
                    </div>
                </div>
            </nav>


            <div className='posts-container'>
                <div className='posts'>
                    {!isLoading ?


                        postsData && postsData.map((post) => {
                            return (
                                <div className='post-preview' key={post._id} onClick={() => { onPostClickHandler(post._id) }}>
                                    <div className='preview-title'>{post.title}</div>
                                    <div className='preview-contet'> {post.content.substring(0, 70) + "..."} </div>
                                    <div className='preview-date-author-container'>
                                        <div className='preview-author'>{post.author}  </div>
                                        <div className='preview-date'>{new Date(post.createdAt).toDateString()}</div>
                                    </div>
                                </div>)
                        })

                        : <>LOADING DATA</>}
                </div>
            </div>

            <footer>

                © 2021 Emiliano Villalpando
            </footer>
        </div>
    )
}
