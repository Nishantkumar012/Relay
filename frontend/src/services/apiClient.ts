import axios from 'axios'

// axios.get("http://localhost:3000/api/users")
// instead of above we use below
// apiClient.get("/users")


const apiClient = axios.create({
      
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
})

export default apiClient;