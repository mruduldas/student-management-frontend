import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../api/Instance";

const TeacherEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [teacherRes, subjectsRes] = await Promise.all([
          api.get(`/teachers/${id}/`),
          api.get("/subjects/")
        ]);
        
        const data = teacherRes.data.data;
        setInitialData({
          username: data.username || "",
          email: data.email || "",
          full_name: data.full_name || "",
          phone_number: data.phone_number || "",
          qualifications: data.qualifications || "",
          years_of_experience: data.years_of_experience || "",
          gender: data.gender || "",
          date_of_birth: data.date_of_birth || "",
          address: data.address || "",
          subjects: data.subjects || [],
          image: null,
        });
        
        setSubjects(subjectsRes.data.data);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialData || {
      username: "",
      email: "",
      full_name: "",
      phone_number: "",
      qualifications: "",
      years_of_experience: "",
      gender: "",
      date_of_birth: "",
      address: "",
      subjects: [],
      image: null,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      full_name: Yup.string().required("Full name is required"),
      phone_number: Yup.string().required("Phone number is required"),
      gender: Yup.string().required("Gender is required"),
      date_of_birth: Yup.string().required("Date of birth is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("full_name", values.full_name);
      formData.append("phone_number", values.phone_number);
      formData.append("qualifications", values.qualifications);
      formData.append("years_of_experience", values.years_of_experience);
      formData.append("gender", values.gender);
      formData.append("date_of_birth", values.date_of_birth);
      formData.append("address", values.address);
      if (values.image) { formData.append("image", values.image); }
      values.subjects.forEach((id) => formData.append("subjects", id));

      try {
        await api.put(`/teachers/${id}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Teacher updated successfully!");
        navigate(`/teacher-detail/${id}`);
      } catch (error) {
        console.error("Update failed", error);
        alert("❌ Something went wrong");
      }
    },
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Edit Teacher Profile</h2>
                <p className="text-gray-600">Update teacher information</p>
              </div>
              <button
                onClick={() => navigate(`/teacher-detail/${id}`)}
                className="flex items-center gap-1 text-gray-600 hover:text-blue-800 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Profile
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Personal Information</h3>
                
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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
                  <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
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
                  <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
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
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Professional Information</h3>
                
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
                  <label htmlFor="years_of_experience" className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                  <input
                    id="years_of_experience"
                    name="years_of_experience"
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    onChange={formik.handleChange}
                    value={formik.values.years_of_experience}
                  />
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
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
                  <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
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

            {/* Additional Fields */}
            <div className="mt-6 space-y-4">
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

              <div>
                <label htmlFor="subjects" className="block text-sm font-medium text-gray-700 mb-1">Subjects</label>
                <select
                  id="subjects"
                  multiple
                  name="subjects"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formik.values.subjects}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, (option) => parseInt(option.value));
                    formik.setFieldValue("subjects", selected);
                  }}
                >
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                  ))}
                </select>
                <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple subjects</p>
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
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
            <div className="mt-8">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600/60 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer"
              >
                Update Teacher Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherEdit;


