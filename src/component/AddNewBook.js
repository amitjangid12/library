import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../Redux/actions';
import './AddNewBook.scss'

function AddNewBook() {
    const [error, setError] = useState('')
    const [state, setState] = useState({
        bookName: "",
        author: "",
        description: "",
        photo: "",
        bookPercent: "",
        bookGener: "",

    });

    const { bookName, author, bookPercent, bookGener, description, photo } = state;

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleImageUpload = (event) => {

        const file = event.target.files[0];
        let form = new FormData()
        form.append('image', file)
        fetch("https://api.imgbb.com/1/upload?key=63f132ff0a84a4aa99fc986c641c3aef", {
            method: 'post',
            body: form
        })
            .then(r => r.json())
            .then(d => console.log(d) + setState({
                ...state, photo: d.data.display_url
            })
            )
    };

    const handleInput = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!bookName || !author || !bookGener || !bookPercent || !description || !photo) {
            setError('*please fill input field')
        }
        else {
            // fetch('http://localhost:4401/posts', {
            //     method: 'post',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(state)
            // })
            //     .then(r => r.json())
            //     .then(v => console.log(v))
            dispatch(postRequest(state))


            navigate('/')
        }
    }

    return (
        <div className='add-new-book'>
            <div className='add-book-contianer'>
                <div>
                    <h1 className='add-book-heading'> Add Book</h1>
                </div>
                <div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <h3 className='add-book-inputs'>Author : <input style={{ padding: '2px' }} type='text' value={author} placeholder='Enter author name' name='author'
                            onChange={(e) => handleInput(e)} /></h3>

                        {error && <p className='error-show'>{error}</p>}

                        <h3 className='add-book-inputs'>Book Name : <input style={{ padding: '2px' }} type='text' value={bookName} placeholder='Enter book name' name='bookName'
                            onChange={(e) => handleInput(e)} /></h3>

                        {error && <p className='error-show'>{error}</p>}


                        <h3 className='add-book-inputs'>Book Reading Percent : <input style={{ padding: '2px' }} type='text' value={bookPercent} placeholder='Enter book reading %'
                            name='bookPercent' onChange={(e) => handleInput(e)} /></h3>

                        {error && <p className='error-show'>{error}</p>}


                        <h3 className='add-book-inputs'>Book Gener : <input style={{ padding: '2px' }} type='text' value={bookGener} placeholder='Enter book gener' name='bookGener'
                            onChange={(e) => handleInput(e)} /></h3>

                        {error && <p className='error-show'>{error}</p>}


                        <h3 className='add-book-inputs'>Book Image : <input type='file' style={{ width: '28%' }} accept="image/*" name='photo'
                            onChange={(e) => handleImageUpload(e)} /></h3>

                        {error && <p className='error-show'>{error}</p>}


                        <h3 className='add-book-inputs'>Description : <textarea style={{ padding: '2px' }} className='text-area' type='text' value={description}
                            placeholder='Enter book descriptioin' name='description' onChange={(e) => handleInput(e)} /></h3>

                        {error && <p className='error-show'>{error}</p>}

                        <button type='submit' className='submit-button'> Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNewBook;