import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/Instance";

const BatchEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const [form, setForm] = useState({
    batch_name: "",
    batch_code: "",
    fk_course: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const batchRes = await api.get(`/batches/${id}/`);
        const courseRes = await api.get("/courses/");
        // const batch = batchRes.data.data;

        setForm({
          batch_name: batchRes.data.data.batch_name,
          batch_code: batchRes.data.data.batch_code,
          fk_course: batchRes.data.data.fk_course,
          start_date: batchRes.data.data.start_date,
          end_date: batchRes.data.data.end_date,
        });

        setCourses(courseRes.data.data);
      } catch (err) {
        console.error("Failed to load batch or courses", err);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/batches/${id}/`, form);
      if (res.status === 200) {
        alert("✅ Batch updated successfully!");
        navigate(`/batch-detail/${id}`);
      }
    } catch (error) {
      console.error("Update failed", error);
      const err = error.response?.data?.errors;
      if (err?.batch_name) {
        alert(`❌ ${err.batch_name[0]}`);
      } else if (err?.batch_code) {
        alert(`❌ ${err.batch_code[0]}`);
      } else {
        alert("❌ Update failed. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-100 mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
        Edit Batch
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-600">Select Course</label>
          <select
            name="fk_course"
            value={form.fk_course}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">-- Select Course --</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-600">Batch Name</label>
          <input
            type="text"
            name="batch_name"
            placeholder="Batch Name"
            value={form.batch_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-600">Batch Code</label>
          <input
            type="text"
            name="batch_code"
            placeholder="Batch Code"
            value={form.batch_code}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-600">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-600">End Date</label>
            <input
              type="date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 py-2 px-4 bg-gradient-to-r from-gray-600 to-blue-900 hover:from-gray-700 hover:to-blue-950 text-white text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Update Batch
        </button>
      </form>
    </div>
  );
};

export default BatchEdit;














