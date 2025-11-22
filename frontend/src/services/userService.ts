import axiosInstance from '@/lib/axios';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
}

export interface UpdateProfileData {
  name?: string;
  bio?: string;
  avatar?: string;
}

export const userService = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await axiosInstance.get('/user/profile');
    return response.data;
  },

  updateProfile: async (data: UpdateProfileData): Promise<UserProfile> => {
    const response = await axiosInstance.put('/user/profile', data);
    // Update local storage
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (currentUser) {
      const updatedUser = { ...currentUser, ...data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    return response.data;
  },
};
