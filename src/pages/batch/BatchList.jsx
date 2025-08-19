import React, { useEffect, useState } from 'react';
import api from '../../api/Instance';
import { Link } from 'react-router-dom';

const BatchList = () => {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await api.get('batches/');
        setBatches(res.data.data);
      } catch (error) {
        console.error("Error fetching batches", error);
      }
    };
    fetchBatches();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-600 to-blue-900 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Batch Management</h2>
          <Link to="/batch-create" className="flex items-center bg-white text-black-600 hover:bg-blue-50 px-4 py-2 rounded-lg shadow-sm transition">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 6v12M6 12h12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Create New Batch
          </Link>
        </div>

        {/* Batch List */}
        <div className="p-6">
          {batches.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <svg className="mx-auto h-12 w-12 mb-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-lg font-medium">No batches found</p>
              <p className="mb-4">Get started by creating a new batch.</p>
              <Link to="/batch-create" className="inline-flex items-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 6v12M6 12h12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                New Batch
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {batches.map(batch => (
                <Link key={batch.id} to={`/batch-detail/${batch.id}`} className="group bg-white border rounded-lg shadow-sm hover:shadow-md transition p-6 relative">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-md">
                      <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
                        {batch.course_title} - {batch.batch_name}
                      </h3>
                      <p className="text-sm text-gray-500">Batch ID: {batch.batch_code}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {batch.start_date} → {batch.end_date}
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 px-6 py-3 bg-gray-50 border-t border-gray-200 text-sm text-right">
                    <span className="text-black-600/20 font-medium hover:text-blue-500 flex items-center justify-end">
                      View details
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchList;























