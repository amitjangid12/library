import React, { useEffect, useState } from 'react';
import './HandleBook.scss';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FaRegPlayCircle } from 'react-icons/fa';
import { CgDarkMode } from 'react-icons/cg';
import { MdDelete, MdSearch, MdOutlineEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import ModalView from './ModalView';
import Loader from './Loader';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRequest, fetchRequest } from '../Redux/actions';

function HandleBook() {

    // const [data, setData] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [mode, setMode] = useState('Dark Mode');
    const [isSearch, setIsSearch] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [filter, setFilter] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [currentValue, setCurrentValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentData = useSelector((d) => d.reducer)

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('darkMode', newMode);
        isDarkMode === true ? setMode('Dark Mode') : setMode('Light Mode')
    };

    // const handleData = () => {

    //     fetch('http://localhost:4401/posts')
    //         .then(r => r.json())
    //         .then(d => setData(d))
    // }

    const handleSearch = (e) => {
        setIsSearch(true)
        let searhVal = e.target.value
        setSearchValue(searhVal)

        const filtered = currentData.filter((item) =>
            item.bookName.toUpperCase().includes(searhVal.toUpperCase())
        )
        setFilter(filtered)
    }

    // const handleDelete = async(id) => {
    //     await axios.delete(`http://localhost:4401/posts/${id}`)
    //     window.location.reload();
    // }

    const handleUpdate = (id) => {
        const bookToUpdate = currentData.find(item => item.id === id);
        navigate('/updateData', { state: { book: bookToUpdate, imageUrl: bookToUpdate.photo } });
    };
    let interval;

    useEffect(() => {

        clearTimeout(interval)

        interval = setTimeout(() => {
            dispatch(fetchRequest())

        }, 500)

        setTimeout(() => {
            setIsLoading(false)
        }, 1500);
        const storedMode = localStorage.getItem('darkMode');
        if (storedMode === 'true') {
            console.log('dark mode');
            toggleDarkMode()
            setIsDarkMode(storedMode === 'true');
        }
        // handleData()
        // dispatch(fetchRequest())
    }, [])

    return (
        <>
            {isLoading ?
                <Loader /> : (

                    <div className={`handle-book ${isDarkMode ? "dark" : "light"}`}>
                        <div className='left-panel'>
                            <h2>Library</h2>
                            <div className='my-book'>
                                <h3><span style={{ marginRight: '20px', fontSize: '18px' }}><FaRegPlayCircle /></span>My Books <span style={{ marginLeft: '30px' }}>{currentData.length}</span></h3>
                            </div>
                            <div className='add-book-button' style={{ position: 'relative', padding: '30px 0' }}>
                                <span style={{ marginRight: '20px' }}><IoMdAddCircleOutline /></span><button className='add-button' onClick={() => navigate('/addBook')}>Add new Book</button>
                            </div>

                            <h3 style={{ margin: '20px 0' }}>Settings</h3>
                            <div className='' style={{ padding: '30px 0', fontSize: '18px', display: 'flex', alignItems: 'center' }}><span style={{ marginRight: '20px' }}><CgDarkMode /></span>
                                <button className='dark-mode-button' onClick={(e) => toggleDarkMode(e)} >{mode}</button>
                            </div>
                        </div>
                        <div className='right-panel'>

                            <div style={{ borderBottom: '1px solid #a9a9a9', display: 'flex', alignItems: 'center' }}><h1 style={{ margin: '10px', width: '90%' }}>Book Library </h1>
                                <span className='search-icon'><MdSearch /><input type='search' placeholder='search book...' className='search-bar' value={searchValue} onChange={(e) => handleSearch(e)} /></span>

                            </div>

                            <div className='display-books'>

                                {
                                    filter.length > 0 ? (
                                        filter && filter.length > 0 && filter.map(val =>
                                            <div className='book-container-details' key={val.id} style={{ position: 'relative', paddingTop: '20px', margin: '0 25px 0 0' }} >

                                                <span className='edit-button' onClick={(e) => handleUpdate(val.id)} ><MdOutlineEdit /></span>

                                                <span className='delete-button' onClick={(e) => dispatch(deleteRequest(val.id))} ><MdDelete /></span>
                                                <div className='opan-modal-img' onClick={() => {
                                                    setCurrentValue(val)
                                                    setIsOpenModal(true)
                                                }}>
                                                    <img className='book-img' alt='' src={val.photo} />
                                                    <span className='book-percent'>{val.bookPercent}%</span>
                                                    <span className='book-gener'>{val.bookGener}</span>

                                                </div>
                                                <h3 style={{ fontSize: '22px' }}>{val.bookName}</h3>
                                                <span>{val.author}</span>

                                            </div>
                                        )
                                    ) : (

                                        isSearch ? (!filter.length && <p style={{ position: 'absolute', textAlign: 'center', width: '70%', fontSize: '25px', fontWeight: 'bold' }}> 
                                        ' {searchValue} ' Result not Found </p>) : (
                                            currentData && currentData.length > 0 && currentData.map(d => (
                                                <div className='book-container-details' key={d.id} style={{ position: 'relative', paddingTop: '20px', margin: '0 25px 0 0', height: '' }} >
                                                    <span className='edit-button' onClick={(e) => handleUpdate(d.id)} ><MdOutlineEdit /></span>
                                                    <span className='delete-button' onClick={(e) => dispatch(deleteRequest(d.id))} ><MdDelete /></span>
                                                    <div className='opan-modal-img' onClick={() => {
                                                        setCurrentValue(d)
                                                        setIsOpenModal(true)

                                                    }}>
                                                        <img className='book-img' alt='' src={d.photo} />
                                                        <span className='book-percent'>{d.bookPercent}%</span>
                                                        <span className='book-gener'>{d.bookGener}</span>

                                                    </div>
                                                    <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>{d.bookName}</h3>
                                                    <span>{d.author}</span>

                                                </div>
                                            ))
                                        )
                                    )
                                }
                            </div>
                        </div>
                        <div className='modal'>{
                            isOpenModal && <ModalView closeModal={setIsOpenModal} currentValue={currentValue} />
                        }
                        </div>
                    </div>
                )}
        </>
    );
}

export default HandleBook;