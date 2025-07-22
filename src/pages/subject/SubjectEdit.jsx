import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/Instance';
import SubjectForm from './SubjectForm';

const SubjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '' });
  // const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const res = await api.get(`subject_detail/${id}/`);
        setForm({ name: res.data.data.name });
      } catch (err) {
        setError('Failed to fetch subject');
      }
    };
    fetchSubject();
  }, [id]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
   };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`subject_detail/${id}/`, form);
      alert('Subject updated successfully!');
      navigate('/subject-list');
    } catch (err) {
      setError('Update failed. Maybe subject name already exists.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      {/* {error && (
        <div className="mb-4 text-red-600 bg-red-100 border border-red-300 rounded px-4 py-2 text-center">
          {error}
        </div>
      )} */}
      <SubjectForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEdit={true}
      />
    </div>
  );
};

export default SubjectEdit;











// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import api from '../../api/Instance';

// const SubjectEdit = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: ''
//   });

//   const [error, setError] = useState('');

  
//   useEffect(() => {
//     const fetchSubject = async () => {
//       try {
//         const response = await api.get(`subject_detail/${id}/`);
//         setForm({ name: response.data.data.name });
//       } catch (err) {
//         setError('Failed to fetch subject');
//       }
//     };
//     fetchSubject();
//   }, [id]);

  
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`/subject_detail/${id}/`, form);
//       alert('Subject updated successfully!');
//       navigate('/subject-list'); 
//     } catch (err) {
//       setError('Update failed. Maybe subject name already exists.');
//     }
//   };

//   return (
//     <div style={{ padding: '20px',textAlign: 'center' }}>
//       <h2>Edit Subject</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Subject Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button type="submit" style={{ marginTop: '10px' }}>
//           Update Subject
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SubjectEdit;
