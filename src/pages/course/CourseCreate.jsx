import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/Instance";

const CourseCreate = () => {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    fk_subject: [],
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await api.get("subjects/");
        setSubjects(res.data.data);
      } catch (err) {
        console.error("Failed to load subjects", err);
      }
    };
    fetchSubjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubjectChange = (e) => {
    const selectedIds = Array.from(e.target.selectedOptions).map((opt) =>
      parseInt(opt.value)
    );
    setForm({ ...form, fk_subject: selectedIds });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("courses/", form);
      if (res.status === 201 || res.status === 200) {
        alert("✅ Course created successfully!");
        navigate("/course-list");
      }
    } catch (error) {
      console.error("Error creating course", error);
      const err = error.response?.data?.errors;
      if (err?.title) {
        alert(`❌ ${err.title[0]}`);
      } else {
        alert("❌ Course creation failed. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      
      {/* Title & Create Button */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">Create Course</h2>
        <button
          type="submit"
          form="courseForm" // links button to the form below
          className="bg-gray-600/60 hover:bg-gray-700 text-white py-2 px-5 rounded-lg text-lg font-medium transition duration-200"
        >
          Add Course
        </button>
      </div>

      {/* Form */}
      <form
        id="courseForm"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Left Column */}
        <div>
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="number"
            name="duration"
            placeholder="Duration (days)"
            value={form.duration}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Right Column */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Select Subjects
          </label>
          <select
            multiple
            value={form.fk_subject}
            onChange={handleSubjectChange}
            className="w-full p-3 border border-gray-300 rounded-lg h-48 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default CourseCreate;
