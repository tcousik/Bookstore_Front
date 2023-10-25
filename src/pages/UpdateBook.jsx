import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack'

const UpdateBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedYear, setPublishedYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`https://bookstore-back-pa7f.onrender.com/books/${id}`)
            .then((response) => {
                setTitle(response.data.title)
                setAuthor(response.data.author)
                setPublishedYear(response.data.publishedYear)
                setLoading(false)

            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            })
    }, [])

    const handleUpdateBook = () => {
        const data = {
            title,
            author,
            publishedYear,
        };
        setLoading(true);
        axios
            .put(`https://bookstore-back-pa7f.onrender.com/books/${id}`, data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar("Book updated!");
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar("Error!");
                console.log(error);
            });
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Edit Book</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Title</label>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Author</label>
                    <input
                        type='text'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Year Published</label>
                    <input
                        type='number'
                        value={publishedYear}
                        onChange={(e) => setPublishedYear(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleUpdateBook}>Save</button>
            </div>
        </div>
    )
}

export default UpdateBook