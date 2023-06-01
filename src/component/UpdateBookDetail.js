import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateRequest } from '../Redux/actions';
import './AddNewBook.scss';

function UpdateBookDetail() {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation()
    const { book, imageUrl } = location.state;
    const [error, setError] = useState('')
    const [state, setState] = useState({
        id: book.id,
        bookName: book.bookName,
        author: book.author,
        bookPercent: book.bookPercent,
        bookGener: book.bookGener,
        description: book.description,
        photo: imageUrl || book.photo

    });

    const { bookName, author, bookPercent, bookGener, description, photo } = state;

    const handleImageUpload = (event) => {

        const file = event.target.files[0];
        let form = new FormData()
        form.append('image', file)
        axios.post("https://api.imgbb.com/1/upload?key=63f132ff0a84a4aa99fc986c641c3aef", form)
            .then(d => {
                const imageUrl1 = d.data.data.url;
                console.log(d);
                setState(prevState => ({
                    ...prevState,
                    photo: imageUrl1
                }));
            })
    };

    const handleInput = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!bookName || !author || !bookPercent || !bookGener || !description || !photo) {
            setError('*please fill input field')
            console.log('iff');
        }
        else {
            // console.log('iff--else');
            // axios.put(`http://localhost:4401/posts/${state.id}`, state)
            //     .then(r => console.log(r))
            console.log(state);
            dispatch(updateRequest(state))

            navigate('/')
        }
    }

    return (
        <div className='add-new-book'>
            <div className='add-book-contianer'>
                <div>
                    <h1 className='add-book-heading'> Update Book Detail</h1>
                </div>
                <div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <h3 className='add-book-inputs'>Author : <input style={{ padding: '2px' }} type='text' value={author} name='author' placeholder='Enter author name' onChange={(e) => handleInput(e)} /></h3>
                        {error && <p className='error-show'>{error}</p>}

                        <h3 className='add-book-inputs'>Book Name : <input style={{ padding: '2px' }} type='text' value={bookName} name='bookName' placeholder='Enter book name' onChange={(e) => handleInput(e)} /></h3>
                        {error && <p className='error-show'>{error}</p>}


                        <h3 className='add-book-inputs'>Book Reading Percent : <input style={{ padding: '2px' }} type='text' value={bookPercent} name='bookPercent' placeholder='Enter book reading %' onChange={(e) => handleInput(e)} /></h3>
                        {error && <p className='error-show'>{error}</p>}


                        <h3 className='add-book-inputs'>Book Gener : <input style={{ padding: '2px' }} type='text' value={bookGener} name='bookGener' placeholder='Enter book gener' onChange={(e) => handleInput(e)} /></h3>
                        {error && <p className='error-show'>{error}</p>}


                        <h3 className='add-book-inputs'>Book Image : <input style={{ padding: '2px', width: '28%' }} type='file' name='photo' onChange={(e) => handleImageUpload(e)} /></h3>
                        {error && <p className='error-show'>{error}</p>}


                        <h3 className='add-book-inputs'>Description : <textarea className='text-area' style={{ padding: '2px' }} type='text' value={description} name='description' placeholder='Enter book description' onChange={(e) => handleInput(e)} /></h3>
                        {error && <p className='error-show'>{error}</p>}

                        <button type='submit' style={{ cursor: 'pointer' }} className='submit-button'> Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default UpdateBookDetail;