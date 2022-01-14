import React, { useState } from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import './newEntryModal.scss'


export const NewEntryModal = ({ isModalOpen, onClose }) => {


    //return portal to avoid z-index issues when styling

    const [title, setTitle] = useState(null)
    const [author, setAuthor] = useState(null)
    const [content, setContent] = useState(null)
    const [isSubmited, setSubmited] = useState(false)




    async function handleSubmit() {

        const body = { title, author, content }

        try {

            await axios.post('http://localhost:8080/api/entry/new', body)

            setSubmited(true)
            onClose()

        } catch (e) {

            console.log(e)
        }



    }



    return ReactDom.createPortal(
        <div className='newEntryModal'>
            <div className="modal-background" onClick={onClose}></div>

            <form onSubmit={handleSubmit}>

                <div className="form-container">
                    <input placeholder='Title' className='new-title' type="text" name="title" required minLength="1" maxLength="60" id="" onChange={(e) => { setTitle(e.target.value) }} />
                    <input  placeholder='Author' className='new-author' type="text" name="author" required minLength="4" maxLength="50" id="" onChange={(e) => { setAuthor(e.target.value) }} />
                    <textarea placeholder='Content' className='new-content' required minLength="1" maxLength="1500" name="content" id="" cols="30" rows="10" onChange={(e) => { setContent(e.target.value) }}></textarea>

                    <input className='new-submit' type="submit" name="submit" id="" value="Submit" />
                </div>
            </form>

        </div>
        , document.getElementById('portal'))
}
