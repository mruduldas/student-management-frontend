import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../api/Instance";
import { useNavigate } from "react-router-dom";

const StudentRegister = () => {
  const navigate = useNavigate();
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await api.get("/batches/");
        setBatches(res.data.data);
      } catch (err) {
        console.error("Error fetching batches:", err);
      }
    };
    fetchBatches();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      full_name: "",
      roll_no: "",
      date_of_birth: "",
      phone_number: "",
      address: "",
      gender: "",
      date_of_admission: "",
      batch: "",
      image: null,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
      full_name: Yup.string().required("Full name is required"),
      phone_number: Yup.string().required("Phone number is required"),
      gender: Yup.string().required("Gender is required"),
      date_of_birth: Yup.string().required("Date of birth is required"),
      date_of_admission: Yup.string().required("Date of admission is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("fk_user.username", values.username);
      formData.append("fk_user.email", values.email);
      formData.append("fk_user.password", values.password);

      formData.append("full_name", values.full_name);
      formData.append("roll_no", values.roll_no);
      formData.append("date_of_birth", values.date_of_birth);
      formData.append("phone_number", values.phone_number);
      formData.append("address", values.address);
      formData.append("gender", values.gender);
      formData.append("date_of_admission", values.date_of_admission);
      if (values.batch) formData.append("batch", values.batch);
      if (values.image) formData.append("image", values.image);

      try {
        await api.post("/student_register/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Student registered successfully!");
        navigate("/student-list");
      } catch (error) {
        console.error("Registration failed:", error);
        alert("❌ Registration failed");
      }
    },
  });

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Student Registration</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">

        <input name="username" placeholder="Username" className="w-full border p-2 rounded" onChange={formik.handleChange} value={formik.values.username} />
        <input name="email" type="email" placeholder="Email" className="w-full border p-2 rounded" onChange={formik.handleChange} value={formik.values.email} />
        <input name="password" type="password" placeholder="Password" className="w-full border p-2 rounded" onChange={formik.handleChange} value={formik.values.password} />
        <input name="full_name" placeholder="Full Name" className="w-full border p-2 rounded" onChange={formik.handleChange} value={formik.values.full_name} />
        <input name="roll_no" placeholder="Roll No" className="w-full border p-2 rounded" onChange={formik.handleChange} value={formik.values.roll_no} />
        <input name="date_of_birth" type="date" className="w-full border p-2 rounded" onChange={formik.handleChange} value={formik.values.date_of_birth} />
        <input name="phone_number" placeholder="Phone Number" className="w-full border p-2 rounded" onChange={formik.handleChange} value={formik.values.phone_number} />
        <input name="address" placeholder="Address" className="w-full border p-2 rounded" onChange={formik.handleChange} value={formik.values.address} />

        <select name="gender" className="w-full border p-2 rounded" onChange={formik.handleChange} value={formik.values.gender}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input name="date_of_admission" type="date" className="w-full border p-2 rounded" onChange={formik.handleChange} value={formik.values.date_of_admission} />

        <select name="batch" className="w-full border p-2 rounded" onChange={formik.handleChange} value={formik.values.batch}>
          <option value="">Select Batch</option>
          {batches.map((batch) => (
            <option key={batch.id} value={batch.id}>
              {batch.course_title} - {batch.batch_name} batch
            </option>
          ))}
        </select>

        <input name="image" type="file" className="w-full" onChange={(e) => formik.setFieldValue("image", e.currentTarget.files[0])} />

        <button type="submit" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
          Register
        </button>
      </form>
    </div>
  );
};

export default StudentRegister;

