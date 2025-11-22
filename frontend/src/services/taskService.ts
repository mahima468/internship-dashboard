import axiosInstance from '@/lib/axios';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}

export interface UpdateTaskData extends Partial<CreateTaskData> {}

export interface TaskFilters {
  status?: string;
  search?: string;
}

export const taskService = {
  getTaskStats: async (): Promise<{ total: number; completed: number; inProgress: number }> => {
    const response = await axiosInstance.get('/tasks/stats');
    return response.data.stats;
  },

  getTasks: async (): Promise<Task[]> => {
    const response = await axiosInstance.get('/tasks');
    return response.data.tasks;
  },

  createTask: async (data: CreateTaskData): Promise<Task> => {
    const response = await axiosInstance.post('/tasks', data);
    return response.data.task;
  },

  // Keeping update/delete helpers in case they are used elsewhere
  updateTask: async (id: string, data: UpdateTaskData): Promise<Task> => {
    const response = await axiosInstance.put(`/tasks/${id}`, data);
    return response.data.task ?? response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/tasks/${id}`);
  },
};
