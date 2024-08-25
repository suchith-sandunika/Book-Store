import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState(''); 
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();
  const { enqueSnackbar } = useSnackbar();
  const {id} = useParams();
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
    .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setLoading(false);
    })
    .catch((error) => {
        setLoading(false);
        alert('An error occured. Please Check Console');
        console.log(error);
    });
  }, [])
  const handleEditBook = () => {
    const data = {
        title,
        author,
        publishYear,
    };
    setLoading(true);
    axios
        .put(`http://localhost:5555/books/${id}`, data)
        .then(() => {
            setLoading(false);
            enqueSnackbar("Book Created Successfully!", { variant: 'success' });
            navigate('/');
        })
        .catch((error) => {
            setLoading(false);
            // alert('An error occured. Please Check Console');
            enqueSnackbar("Error!", { variant: 'error' });
            console.log(error);
        });
  };
  return (
    <div className="p-4">
      <BackButton/>
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner/> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Title</label>
            <input type='text' value={title} onchange={(e) => setTitle(e.target.value)} className="border-2 border-gray-500 px-4 w-full py-2"/>
        </div>
        <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Author</label>
            <input type='text' value={author} onchange={(e) => setAuthor(e.target.value)} className="border-2 border-gray-500 px-4 w-full py-2"/>
        </div>
        <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Publish Year</label>
            <input type='text' value={publishYear} onchange={(e) => setPublishYear(e.target.value)} className="border-2 border-gray-500 px-4 w-full py-2"/>
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>Save</button>
      </div>
    </div>
  )
}

export default EditBook