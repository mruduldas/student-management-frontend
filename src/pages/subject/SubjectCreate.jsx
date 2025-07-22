import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/Instance";
import SubjectForm from "./SubjectForm";

const SubjectCreate = () => {
  const [form, setForm] = useState({ name: "" });
  const navigate = useNavigate();

  const handleChange = (event) => {
    // const { name, value } = event.target;
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await api.post("subjects/", form);
      if (res.status === 201) {
        alert("Subject created successfully!");
        navigate("/subject-list");
      }
    } catch (error) {
      console.error("Error creating subject", error);
      // alert("Subject creation failed.");
      const err = error.response?.data?.errors;
      
      if (err?.name) {
        alert("❌ " + err.name[0]);
      } else {
        alert("❌ Subject creation failed. Please try again.");
      }
    }
  };

  return (
    <SubjectForm
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isEdit={false}
    />
  );
};

export default SubjectCreate;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../api/Instance';

// const SubjectCreate = () => {
//   const [form, setForm] = useState({
//     name: ''
//   });

//   const navigate = useNavigate();

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const res = await api.post('subjects/', form);
//       if (res.status === 201 || res.status === 200) {
//         alert("Subject created successfully!");
//         navigate("/subject-list");
//       }
//     } catch (error) {
//       console.error("Error creating subject", error);
//       alert("Subject creation failed.");
//     }
//   };

//   return (
//     <div style={{
//       maxWidth: '500px',
//       margin: '50px auto',
//       padding: '20px',
//       border: '2px solid #ccc',
//       backgroundColor: '#f4f4f4',
//       borderRadius: '8px',
//       boxShadow: '0 0 10px rgba(0,0,0,0.1)'
//     }}>
//       <form onSubmit={handleSubmit}>
//         <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Subject</h2>
//         <hr />
//         <input
//           type="text"
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="Subject Name"
//           required
//           style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
//         />
//         <button type="submit" style={{
//           padding: '10px 20px',
//           backgroundColor: '#007bff',
//           color: '#fff',
//           border: 'none',
//           borderRadius: '4px',
//           cursor: 'pointer'
//         }}>Create</button>
//       </form>
//     </div>
//   );
// };

// export default SubjectCreate;
