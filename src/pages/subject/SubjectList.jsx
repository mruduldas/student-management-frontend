import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/Instance";

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  const fetchSubjects = async () => {
    try {
      const res = await api.get("subjects/");
      setSubjects(res.data.data);
    } catch (error) {
      console.error("Error fetching subjects", error);
    }
  };
  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this subject?");
    if (!confirm) return;

    try {
      await api.delete(`subject_detail/${id}/`);
      alert("Subject deleted successfully!");
      fetchSubjects();
    } catch (error) {
      console.error("Error deleting subject", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">All Subjects</h1>
        <Link to="/create-subject">
          <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
            + Add New
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4 border-b">Si.No</th>
              <th className="text-left py-3 px-4 border-b">ID</th>
              <th className="text-left py-3 px-4 border-b">Name</th>
              <th className="text-left py-3 px-4 border-b">Created At</th>
              <th className="text-left py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject,index) => (
              <tr key={subject.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 border-b">{index + 1}</td>
                <td className="py-3 px-4 border-b">{subject.id}</td>
                <td className="py-3 px-4 border-b">{subject.name}</td>
                <td className="py-3 px-4 border-b">
                  {new Date(subject.created_at).toLocaleString()}
                </td>
                <td className="py-3 px-4 border-b space-x-2">
                  <Link to={`/edit_subject/${subject.id}`}>
                    <button className="bg-gray-400/60 hover:bg-gray-600 text-white px-3 py-1 rounded-md">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(subject.id)}
                    className="bg-red-400/80 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {subjects.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No subjects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectList;















// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../../api/Instance";

// const SubjectList = () => {
//   const [subjects, setSubjects] = useState([]);

//   useEffect(() => {
//     const fetchSubjects = async () => {
//       try {
//         const res = await api.get("subjects/");
//         console.log(res.data);
//         setSubjects(res.data.data);
//       } catch (error) {
//         console.error("Error fetching subjects", error);
//       }
//     };
//     fetchSubjects();
//   }, []);

//   return (
//     <div style={{ padding: "0px" }}>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <h1>All Subjects</h1>
//         <Link to="/create-subject">
//           <button
//             style={{
//               padding: "10px 15px",
//               backgroundColor: "#3498db",
//               color: "#fff",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             + Add New
//           </button>
//         </Link>
//       </div>

//       <table
//         style={{
//           width: "100%",
//           marginTop: "20px",
//           borderCollapse: "collapse",
//           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//         }}
//       >
//         <thead style={{ backgroundColor: "#f5f5f5" }}>
//           <tr>
//             <th style={thStyle}>ID</th>
//             <th style={thStyle}>Name</th>
//             <th style={thStyle}>Created At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {subjects.map((subject) => (
//             <tr key={subject.id}>
//               <td style={tdStyle}>{subject.id}</td>
//               <td style={tdStyle}>
//                 <Link
//                   to={`/sub-detail/${subject.id}`}
//                   style={{ color: "#2980b9", textDecoration: "none" }}
//                 >
//                   {subject.name}
//                 </Link>
//               </td>
//               <td style={tdStyle}>
//                 {new Date(subject.created_at).toLocaleString()}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const thStyle = {
//   padding: "12px 15px",
//   borderBottom: "1px solid #ddd",
//   textAlign: "left",
//   fontWeight: "600",
// };

// const tdStyle = {
//   padding: "12px 15px",
//   borderBottom: "1px solid #eee",
// };

// export default SubjectList;

