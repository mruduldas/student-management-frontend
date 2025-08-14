import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../api/Instance";
import { useNavigate } from "react-router-dom";

const TeacherRegister = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
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
        setLoading(true);
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

        await api.post("/teacher_register/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        
        alert("✅ Teacher registered successfully!");
        navigate("/teacher-list");
      } catch (error) {
        console.error("Registration failed", error.response?.data || error);
        const err = error.response?.data?.errors;
        if (err?.fk_user?.username) {
          alert("❌ " + err.fk_user.username[0]);
        } else if (err?.subjects) {
          alert("❌ " + err.subjects[0]);
        } else {
          alert("❌ Registration failed. Check console for details.");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Teacher Registration</h2>
            <p className="text-gray-600">Fill in the details to register a new teacher</p>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="px-6 py-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Account Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Account Information</h3>
                
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username*</label>
                  <input
                    id="username"
                    name="username"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                  {formik.errors.username && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.username}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.errors.email && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  {formik.errors.password && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
                  )}
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Personal Information</h3>
                
                <div>
                  <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                  <input
                    id="full_name"
                    name="full_name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    onChange={formik.handleChange}
                    value={formik.values.full_name}
                  />
                  {formik.errors.full_name && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.full_name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                  <input
                    id="phone_number"
                    name="phone_number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    onChange={formik.handleChange}
                    value={formik.values.phone_number}
                  />
                  {formik.errors.phone_number && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.phone_number}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender*</label>
                  <select
                    id="gender"
                    name="gender"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    onChange={formik.handleChange}
                    value={formik.values.gender}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {formik.errors.gender && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.gender}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth*</label>
                  <input
                    id="date_of_birth"
                    name="date_of_birth"
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    onChange={formik.handleChange}
                    value={formik.values.date_of_birth}
                  />
                  {formik.errors.date_of_birth && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.date_of_birth}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Professional Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
                  <input
                    id="qualifications"
                    name="qualifications"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    onChange={formik.handleChange}
                    value={formik.values.qualifications}
                  />
                </div>

                <div>
                  <label htmlFor="years_of_experience" className="block text-sm font-medium text-gray-700 mb-1">Years of Experience*</label>
                  <input
                    id="years_of_experience"
                    name="years_of_experience"
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    onChange={formik.handleChange}
                    value={formik.values.years_of_experience}
                  />
                  {formik.errors.years_of_experience && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.years_of_experience}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  id="address"
                  name="address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
              </div>
            </div>

            {/* Subjects */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Subjects</h3>
              <div>
                <label htmlFor="subjects" className="block text-sm font-medium text-gray-700 mb-1">Select Subjects</label>
                <select
                  id="subjects"
                  multiple
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple subjects</p>
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Profile Image</h3>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-gray-700
                    hover:file:bg-blue-100"
                  onChange={(e) => formik.setFieldValue("image", e.currentTarget.files[0])}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600/60 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Register Teacher"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherRegister;





