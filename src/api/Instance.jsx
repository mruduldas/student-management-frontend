import axios from "axios";
import Swal from 'sweetalert2';


const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
});

api.interceptors.request.use(function (config) {
    
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
}, function (error) {
    
    return Promise.reject(error);
});


api.interceptors.response.use(function (response) {
    if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('username', response.data.username);
        
        // localStorage.setItem("user_id", response.data.user_id);
        if (response.data.student_id) {
          localStorage.setItem("student_id", response.data.student_id);
        }
        if (response.data.teacher_id) {
          localStorage.setItem("teacher_id", response.data.teacher_id);
        }
        
    }
    return response;
}, function (error) {

    if (error.response && error.response.status === 401) {
        Swal.fire("Unauthorized access - redirecting to login");
       
    } else {
        console.error("api Error:", error);
    }

    if (error.response && error.response.status === 404) {
        Swal.fire('Page not found')
    }
    return Promise.reject(error);

});



export default api;
