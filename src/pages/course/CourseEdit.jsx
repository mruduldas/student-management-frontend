import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/Instance";

const CourseEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    fk_subject: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseRes = await api.get(`courses/${id}/`);
        setForm({
          title: courseRes.data.data.title,
          description: courseRes.data.data.description,
          duration: courseRes.data.data.duration,
          fk_subject: courseRes.data.data.fk_subject,
        });

        const subjectRes = await api.get("subjects/");
        setSubjects(subjectRes.data.data);
      } catch (error) {
        console.error("Error fetching course/subjects", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleSubjectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedIds = selectedOptions.map((option) =>
      parseInt(option.value)
    );
    setForm({ ...form, fk_subject: selectedIds });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending form:", form);
    try {
      const res = await api.put(`courses/${id}/`, form);
      if (res.status === 200) {
        alert("Course updated successfully!");
        navigate(`/course-detail/${id}`);
      }
    } catch (err) {
      console.error("Update failed", err.response?.data || err);
      alert("Failed to update course");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Title & Update Button */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">Edit Course</h2>
        <button
          type="submit"
          form="courseForm"
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-5 rounded-lg text-lg font-medium transition duration-200"
        >
          Update
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
            className="w-full p-3 border border-gray-300 rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-blue-400"
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

export default CourseEdit;

