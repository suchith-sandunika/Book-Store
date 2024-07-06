import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueSnackbar } = useSnackbar();
  const {id} = useParams();
  const handleDeleteBook = () => {
    setLoading(true);
    axios
        .delete(`https://localhost:5555/books/${id}`)
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
  }

  return (
    <div className="p-4">
      <BackButton/>
      <h1 className="text-3xl"></h1>
      {loading ? <Spinner/> : ''}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mix-blend-saturation">
        <h3 className="text-2xl">Are You Sure You Want to delete this book?</h3>
        <button className="p-4 bg-red-600 text-white m-8 w-full" onClick={handleDeleteBook}>Yes, Delete it</button>
        {/* <button className="p-4 bg-red-600 text-white m-8 w-full" navigate('/</div>')>No</button> */}
      </div>
    </div>
  )
}

export default DeleteBook
