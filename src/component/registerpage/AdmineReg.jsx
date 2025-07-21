import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import api from '../../api/Instance';

const AdminRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await api.get("admin-exists/");
        if (res.data.data?.admin_exists) {
          navigate("/login");
        } else {
          setLoading(false);
        }
      } catch (err) {
        Swal.fire("Error", "Failed to check admin status", "error");
      }
    };

    checkAdmin();
  }, [navigate]);

  const validationSchema = Yup.object({

    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')

  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await api.post('admin-register/', values);
        Swal.fire("Admin registered successfully");
        navigate("/login");
      } catch (error) {
        if (error.response && error.response.status === 403) {
          Swal.fire("Admin already exists!");
          navigate("/");
        } else {
          Swal.fire("Something went wrong!");
        }
      }
    }
  });

  if (loading) {
    return <h3 style={{ textAlign: 'center', marginTop: '100px' }}>Loading...</h3>;
  }

  return (
    <div style={{
      maxWidth: '600px',
      margin: '50px auto',
      padding: '30px',
      backgroundColor: '#f8f8f8',
      borderRadius: '8px',
      border: '1px solid #ccc'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Registration</h2>
      <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ width: '120px' }}>Username:</label>
          <input
            name="username"
            placeholder="Enter username"
            onChange={formik.handleChange}
            value={formik.values.username}
            style={{ flex: 1, padding: '8px' }}
          />
        </div>
        {formik.errors.username && <div style={{ color: 'red' }}>{formik.errors.username}</div>}

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ width: '120px' }}>Email:</label>
          <input
            name="email"
            placeholder="Enter email"
            onChange={formik.handleChange}
            value={formik.values.email}
            style={{ flex: 1, padding: '8px' }}
          />
        </div>
        {formik.errors.email && <div style={{ color: 'red' }}>{formik.errors.email}</div>}

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ width: '120px' }}>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={formik.handleChange}
            value={formik.values.password}
            style={{ flex: 1, padding: '8px' }}
          />
        </div>
        {formik.errors.password && <div style={{ color: 'red' }}>{formik.errors.password}</div>}

        <button type="submit" style={{ padding: '10px', marginTop: '10px' }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default AdminRegister;





// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// import api from '../../api/Instance';

// const AdminRegister = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);


// useEffect(() => {
//         const checkAdmin = async () => {
//             try {
//                 const res = await API.get("check-admin/");
//                 if (res.data.data?.admin_exists) {
//                     navigate("/login"); // ✅ Correct redirection
//                 } else {
//                     setLoading(false); // ✅ Show the form
//                 }
//             } catch (err) {
//                 Swal.fire("Error", "Failed to check admin status", "error");
//             }
//         };

//         checkAdmin();
//     }, [navigate]);
  

//   const validationSchema = Yup.object({
//     username: Yup.string().required('Username is required'),
//     email: Yup.string().email('Invalid email').required('Email is required'),
//     password: Yup.string().required('Password is required')
//   });

//   const formik = useFormik({
//     initialValues: {
//       username: '',
//       email: '',
//       password: ''
//     },
//     validationSchema,
//     onSubmit: async (values) => {

//       try {
//         const res = await api.post('admin_register/', values);
//         Swal.fire("Success", "Admin registered successfully", "success");
//         navigate("/");

//       } catch (error) {

//         if (error.response && error.response.status === 403) {
//           Swal.fire("Error", "Admin already exists!", "error");
//           navigate("/");

//         } else {
//           Swal.fire("Error", "Something went wrong!", "error");
//         }
//       }
//     }
//   });

//   return (
//     <div style={{ maxWidth: '500px', margin: '50px auto', padding: '30px', backgroundColor: '#f8f8f8', borderRadius: '8px', border: '1px solid #ccc' }}>
//       <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Registration</h2>
//       <form onSubmit={formik.handleSubmit}>
//         <input name="username" placeholder="Username" onChange={formik.handleChange} value={formik.values.username} />
//         {formik.errors.username && <div style={{ color: 'red' }}>{formik.errors.username}</div>}
//         <br /><br />
//         <input name="email" placeholder="Email" onChange={formik.handleChange} value={formik.values.email} />
//         {formik.errors.email && <div style={{ color: 'red' }}>{formik.errors.email}</div>}
//         <br /><br />
//         <input type="password" name="password" placeholder="Password" onChange={formik.handleChange} value={formik.values.password} />
//         {formik.errors.password && <div style={{ color: 'red' }}>{formik.errors.password}</div>}
//         <br /><br />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default AdminRegister;
