import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/Instance';

const BatchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); 

  const [batch, setBatch] = useState({});
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');

  const fetchBatch = async () => {
    try {
      const res = await api.get(`/batches/${id}/`);
      setBatch(res.data.data || res.data);
    } catch (error) {
      console.error("Error fetching batch:", error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await api.get(`/filtered-teachers-to-batch/${id}/`);
      setTeachers(res.data.data || res.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  useEffect(() => {
    fetchBatch();
    fetchTeachers();
  }, [id]);

  const handleSelectTeacherChange = (e) => {
    setSelectedTeacher(e.target.value);
  };

  const handleAssignTeacher = async () => {
    if (!selectedTeacher) return alert("Please select a teacher");
    try {
      const res = await api.post(`/add-teacher-to-batches/${id}/`, {
        teacher_id: selectedTeacher,
      });
      alert(res.data.message || "Teacher assigned successfully!");
      setSelectedTeacher('');
      fetchBatch();
    } catch (error) {
      console.error("Error assigning teacher:", error);
      alert("Failed to assign teacher.");
    }
  };

  const handleDeleteBatch = async () => {
    if (!window.confirm("Are you sure you want to delete this batch?")) return;
    
    try {
      await api.delete(`/batches/${id}/`);
      alert("✅ Batch deleted successfully.");
      navigate("/batch-list");
    } catch (err) {
      console.error("Delete failed", err);
      alert("❌ Failed to delete batch.");
    }
  };

  const handleRemoveTeacher = async (teacherId) => {
    try {
      await api.post(`/remove-teacher-in-batch/${id}/${teacherId}/`);
      alert("Teacher removed from batch");
      fetchBatch();
    } catch (err) {
      console.error(err);
      alert("Failed to remove teacher");
    }
  };

  const handleRemoveStudent = async (studentId) => {
    try {
      await api.post(`/remove-student-in-batch/${studentId}/`);
      alert("Student removed from batch");
      fetchBatch();
    } catch (err) {
      console.error(err);
      alert("Failed to remove student");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => {
            if (role === "1") navigate("/batch-list");          
            else if (role === "2") navigate("/teacher-dashboard");     
            else if (role === "3") navigate("/student-dashboard");     
          }}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        {role === "1" && (
          <div className="flex space-x-3">
            <button
              onClick={() => navigate(`/batch-edit/${id}/`)}
              className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            <button
              onClick={handleDeleteBatch}
              className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-1">
          {batch.course_title} - {batch.batch_name}
        </h2>
        <div className="flex flex-wrap items-center text-gray-600 space-x-4">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Code: {batch.batch_code}
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {batch.start_date} to {batch.end_date}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Subjects</h3>
          <ul className="space-y-2">
            {batch.subject_list?.length > 0 ? (
              batch.subject_list.map((sub) => (
                <li key={sub.id} className="flex items-center py-2 px-3 bg-white rounded-md shadow-sm">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {sub.name}
                </li>
              ))
            ) : (
              <li className="text-gray-500 py-2">No subjects found</li>
            )}
          </ul>
        </div>

        {role === "1" && (
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Assigned Teachers</h3>
            {batch.teacher_list?.length > 0 ? (
              <ul className="space-y-3">
                {batch.teacher_list.map((teacher) => (
                  <li key={teacher.id} className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <span>{teacher.full_name}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/teacher-detail/${teacher.id}/`)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors"
                        title="View"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleRemoveTeacher(teacher.id)}
                        className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
                        title="Remove"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 py-2">No teachers assigned yet.</p>
            )}

            <div className="mt-6">
              <h4 className="font-medium text-gray-700 mb-2">Assign New Teacher</h4>
              <div className="flex gap-3">
                <select
                  value={selectedTeacher}
                  onChange={handleSelectTeacherChange}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.full_name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAssignTeacher}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Assign
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Students in this Batch</h3>
        {batch.student_list?.length > 0 ? (
          <ul className="space-y-3">
            {batch.student_list.map((student) => (
              <li key={student.id} className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span>{student.full_name}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/student-detail/${student.id}/`)}
                    className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors"
                    title="View"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  {role === "1" && (
                    <button
                      onClick={() => handleRemoveStudent(student.id)}
                      className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
                      title="Remove"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 py-2">No students in this batch.</p>
        )}
      </div>
    </div>
  );
};

export default BatchDetail;

















