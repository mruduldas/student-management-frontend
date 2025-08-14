import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../api/Instance";

const TeacherDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState({});
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await api.get(`/teachers/${id}/`);
        setTeacher(res.data.data);
      } catch (err) {
        console.error("Error fetching teacher", err);
      }
    };
    fetchTeacher();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        await api.delete(`/teachers/${id}/`);
        alert("✅ Teacher deleted");
        navigate("/teacher-list");
      } catch (err) {
        console.error("Error deleting teacher", err);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (role === "1") {
                  navigate("/student-list");
                } else if (role === "2") {
                  navigate("/teacher-dashboard");
                } else if (role === "3") {
                  navigate("/student-dashboard");
                }
              }}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              {teacher.full_name ? `${teacher.full_name}'s Profile` : 'Teacher Profile'}
            </h1>
          </div>
          
          <div className="flex gap-3">
            <Link 
              to={`/teacher-edit/${teacher.id}`} 
              className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit
            </Link>
            {role === "1" && (
              <button 
                onClick={handleDelete} 
                className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Delete
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-3 gap-8 p-6">
            {/* Teacher Information */}
            <div className="space-y-4">
              <div className="flex flex-col items-center">
                {teacher.image ? (
                  <img
                    src={`http://127.0.0.1:8000${teacher.image}`}
                    alt={teacher.full_name}
                    className="w-40 h-40 object-cover rounded-full border-4 border-gray-100 shadow-md mb-4"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                <h2 className="text-xl font-bold text-gray-800">{teacher.full_name}</h2>
                <p className="text-gray-600">@{teacher.username}</p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h3>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="text-gray-700">{teacher.email || "Not provided"}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span className="text-gray-700">{teacher.phone_number || "Not provided"}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{teacher.date_of_birth || "Not provided"}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{teacher.address || "Not provided"}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Professional Details</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Qualifications</p>
                    <p className="text-gray-700">{teacher.qualifications || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Experience</p>
                    <p className="text-gray-700">
                      {teacher.years_of_experience ? `${teacher.years_of_experience} years` : "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Gender</p>
                    <p className="text-gray-700">{teacher.gender || "Not provided"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Subjects</h3>
                <div className="flex flex-wrap gap-2">
                  {teacher.subject_names?.length > 0 ? (
                    teacher.subject_names.map((subject, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {subject}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No subjects assigned</p>
                  )}
                </div>
              </div>
            </div>

            {/* Assigned Batches */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Assigned Batches</h3>
                <ul className="space-y-2">
                  {teacher.assigned_batches?.length > 0 ? (
                    teacher.assigned_batches.map((batch) => (
                      <li key={batch.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <Link 
                          to={`/batch-detail/${batch.id}`} 
                          className="block hover:text-blue-600 transition-colors"
                        >
                          <p className="font-medium">{batch.course_title}</p>
                          <p className="text-sm text-gray-600">{batch.batch_name}</p>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-500 p-3 bg-gray-50 rounded-lg">No batches assigned</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetail;







