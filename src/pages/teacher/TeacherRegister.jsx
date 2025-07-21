import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../api/Instance";
import { useNavigate } from "react-router-dom";
import "./TeacherRegister.css";

const TeacherRegister = () => {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await api.get("/subjects/");
        setSubjects(res.data.data);
      } catch (error) {
        console.error("Error fetching subjects", error);
      }
    };
    fetchSubjects();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      full_name: "",
      phone_number: "",
      qualifications: "",
      years_of_experience: "",
      gender: "",
      date_of_birth: "",
      address: "",
      image: null,
      subjects: [],
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email format").required("Email is required"),
      password: Yup.string().required("Password is required"),
      full_name: Yup.string().required("Full name is required"),
      phone_number: Yup.string().required("Phone number is required"),
      gender: Yup.string().required("Gender is required"),
      date_of_birth: Yup.string().required("Date of birth is required"),
      years_of_experience: Yup.number()
        .typeError("Years of experience must be a number")
        .min(0, "Experience cannot be negative")
        .required("Experience is required"),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("fk_user.username", values.username);
        formData.append("fk_user.email", values.email);
        formData.append("fk_user.password", values.password);
        formData.append("full_name", values.full_name);
        formData.append("phone_number", values.phone_number);
        formData.append("qualifications", values.qualifications);
        formData.append("years_of_experience", values.years_of_experience);
        formData.append("gender", values.gender);
        formData.append("date_of_birth", values.date_of_birth);
        formData.append("address", values.address);
        if (values.image) formData.append("image", values.image);
        values.subjects.forEach((id) => formData.append("subjects", id));

        const res = await api.post("/teacher_register/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(" Registered:", res.data);
        
        alert("✅ Teacher registered successfully!");
        navigate("/teacher-list");
      } catch (error) {
        console.error("Registration failed", error.response?.data || error);
        const err = error.response?.data?.errors;
        if (err?.fk_user?.username) {
        alert("❌ " + err.fk_user.username[0]);
      } else if (err?.subjects) {
         alert("❌ " + err.subjects[0]);
      } else{
        alert("❌ Registration failed. Check console for details.");
      }

        
      }
    },
  });

  return (
    <div className="form-container">
      <h2 className="form-title">Teacher Registration</h2>
      <form onSubmit={formik.handleSubmit} className="form">
        <input className="form-input" name="username" onChange={formik.handleChange} value={formik.values.username} placeholder="Username" />
        <input className="form-input" name="email" onChange={formik.handleChange} value={formik.values.email} placeholder="Email" />
        <input type="password" className="form-input" name="password" onChange={formik.handleChange} value={formik.values.password} placeholder="Password" />
        <input className="form-input" name="full_name" onChange={formik.handleChange} value={formik.values.full_name} placeholder="Full Name" />
        <input className="form-input" name="phone_number" onChange={formik.handleChange} value={formik.values.phone_number} placeholder="Phone Number" />
        <input className="form-input" name="qualifications" onChange={formik.handleChange} value={formik.values.qualifications} placeholder="Qualifications" />
        <input type="number" className="form-input" name="years_of_experience" onChange={formik.handleChange} value={formik.values.years_of_experience} placeholder="Years of Experience" />
        <input type="date" className="form-input" name="date_of_birth" onChange={formik.handleChange} value={formik.values.date_of_birth} />
        <input className="form-input" name="address" onChange={formik.handleChange} value={formik.values.address} placeholder="Address" />

        <select className="form-input" name="gender" onChange={formik.handleChange} value={formik.values.gender}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label className="form-label">Select Subjects</label>
        <select
          multiple
          className="form-input"
          name="subjects"
          value={formik.values.subjects}
          onChange={(e) => {
            const selected = Array.from(e.target.selectedOptions, (option) => parseInt(option.value));
            formik.setFieldValue("subjects", selected);
          }}
        >
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>

        <label className="form-label">Upload Image</label>
        <input type="file" className="form-input" name="image" onChange={(e) => formik.setFieldValue("image", e.currentTarget.files[0])} />

        <button type="submit" className="form-button">Register</button>
      </form>
    </div>
  );
};

export default TeacherRegister;











// const TeacherRegister = () => {
//   const [subjects, setSubjects] = useState([]);
//   const navigate = useNavigate();

  
//   useEffect(() => {
//     const fetchSubjects = async () => {
//       try {
//         const res = await api.get("/subjects/");
//         setSubjects(res.data.data);
//       } catch (error) {
//         console.error("Error fetching subjects", error);
//       }
//     };
//     fetchSubjects();
//   }, []);

  
//   const validationSchema = Yup.object({
//     username: Yup.string().required("Username is required"),
//     email: Yup.string().email("Invalid email format"),
//     password1: Yup.string().required("Password is required"),
//     password2: Yup.string().oneOf([Yup.ref("password1"), null], "Passwords must match").required("Confirm password is required"),       
//     full_name: Yup.string().required("Full name is required"),
//     phone_number: Yup.string().required("Phone number is required"),
//     gender: Yup.string().required("Gender is required"),
//     date_of_birth: Yup.string().required("Date of birth is required"),
//   });

  
//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       email: "",
//       password1: "",
//       password2: "",
//       full_name: "",
//       phone_number: "",
//       qualifications: "",
//       years_of_experience: "",
//       gender: "",
//       date_of_birth: "",
//       address: "",
//       image: null,
//       subjects: [],
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         const formData = new FormData();
//         for (let key in values) {
//           if (key === "subjects") {
//             values.subjects.forEach((id) => formData.append("subjects", id));
//           } else if (key === "image" && values.image) {
//             formData.append("image", values.image);
//           } else {
//             formData.append(key, values[key]);
//           }
//         }

//         const res = await api.post("/teacher_register/", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });

//         alert("Teacher registered successfully!");
//         navigate("/teacher-list");
//       } catch (error) {
//         console.error("Registration failed", error.response?.data || error);
//         alert("Registration failed. Check console for details.");
//       }
//     },
//   });

//   return (
//     <div className="form-container">
//       <h2 className="form-title">Teacher Registration</h2>
//       <form onSubmit={formik.handleSubmit} className="form">
//         <input
//           className="form-input"
//           name="username"
//           onChange={formik.handleChange}
//           value={formik.values.username}
//           placeholder="Username"
//         />
//         {formik.errors.username && formik.touched.username && <div className="error-text">{formik.errors.username}</div>}

//         <input
//           className="form-input"
//           name="email"
//           onChange={formik.handleChange}
//           value={formik.values.email}
//           placeholder="Email"
//         />
//         {formik.errors.email && formik.touched.email && <div className="error-text">{formik.errors.email}</div>}

//         <input
//           type="password"
//           className="form-input"
//           name="password1"
//           onChange={formik.handleChange}
//           value={formik.values.password1}
//           placeholder="Password"
//         />
//         {formik.errors.password1 && formik.touched.password1 && <div className="error-text">{formik.errors.password1}</div>}

//         <input
//           type="password"
//           className="form-input"
//           name="password2"
//           onChange={formik.handleChange}
//           value={formik.values.password2}
//           placeholder="Confirm Password"
//         />
//         {formik.errors.password2 && formik.touched.password2 && <div className="error-text">{formik.errors.password2}</div>}

//         <input
//           className="form-input"
//           name="full_name"
//           onChange={formik.handleChange}
//           value={formik.values.full_name  }
//           placeholder="Full Name"
//         />
//         {formik.errors.full_name && formik.touched.full_name && <div className="error-text">{formik.errors.full_name}</div>}

//         <input
//           className="form-input"
//           name="phone_number"
//           onChange={formik.handleChange}
//           value={formik.values.phone_number}
//           placeholder="Phone Number"
//         />
//         {formik.errors.phone_number && formik.touched.phone_number && <div className="error-text">{formik.errors.phone_number}</div>}

//         <input
//           className="form-input"
//           name="qualifications"
//           onChange={formik.handleChange}
//           value={formik.values.qualifications}
//           placeholder="Qualifications"
//         />
         
//         <input
//           type="number"
//           className="form-input"
//           name="years_of_experience"
//           onChange={formik.handleChange}
//           value={formik.values.years_of_experience}
//           placeholder="Years of Experience"
//         />
//         {/* <label className="form-label">Date of Birth</label> */}
//         <input
//           type="date"
//           className="form-input"
//           name="date_of_birth"
//           onChange={formik.handleChange}
//           value={formik.values.date_of_birth}
//           aria-label="Date of Birth"
          
//         />
//         {formik.errors.date_of_birth && formik.touched.date_of_birth && <div className="error-text">{formik.errors.date_of_birth}</div>}

//         <input
//           className="form-input"
//           name="address"
//           onChange={formik.handleChange}
//           value={formik.values.address}
//           placeholder="Address"
//         />

//         <select
//           className="form-input"
//           name="gender"
//           onChange={formik.handleChange}
//           value={formik.values.gender}
//         >
//           <option value="">Select Gender</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>
//         {formik.errors.gender && formik.touched.gender && <div className="error-text">{formik.errors.gender}</div>}

//         <label className="form-label">Select Subjects</label>
//         <select
//           multiple
//           className="form-input"
//           name="subjects"
//           value={formik.values.subjects}
//           onChange={(e) => {
//             const options = e.target.options;
//             const selected = [];
//             for (let i = 0; i < options.length; i++) {
//               if (options[i].selected) {
//                 selected.push(parseInt(options[i].value));
//               }
//             }
//             formik.setFieldValue("subjects", selected);
//           }}
//         >
//           {subjects.map((subject) => (
//             <option key={subject.id} value={subject.id}>
//               {subject.name}
//             </option>
//           ))}
//         </select>

//         <label className="form-label">Upload Image</label>
//         <input
//           type="file"
//           className="form-input"
//           name="image"
//           onChange={(e) => formik.setFieldValue("image", e.currentTarget.files[0])}
//         />

//         <button type="submit" className="form-button">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default TeacherRegister;




