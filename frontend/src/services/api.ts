import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Upload API
export const uploadAPI = {
  uploadImage: (file: File) => {
    const formData = new FormData()
    formData.append('image', file)
    return api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  uploadImages: (files: File[]) => {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append('images', file)
    })
    return api.post('/upload/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}

// Projects API
export const projectsAPI = {
  getProjects: () => api.get('/projects'),
  getProject: (id: string) => api.get(`/projects/${id}`),
  createProject: (data: any) => api.post('/projects', data),
  updateProject: (id: string, data: any) => api.put(`/projects/${id}`, data),
  deleteProject: (id: string) => api.delete(`/projects/${id}`),
}

// AI API
export const aiAPI = {
  generateVariations: (data: {
    imagePath: string
    modifications: any
    style: string
  }) => api.post('/ai/generate', data),
  getStyles: () => api.get('/ai/styles'),
  getMaterials: () => api.get('/ai/materials'),
}

export default api
