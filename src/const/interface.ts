import axios, { AxiosRequestConfig } from 'axios';
import { RegisterUser } from '../pages/register';
import { UpdatePassword } from '../pages/updatePassword';
import { UserInfo } from '../pages/update_info';
import { message } from 'antd';
import { CreateMeetingRoom } from '../pages/MeetingRoomManage/CreateMeetingRoomModal';
import { UpdateMeetingRoom } from '../pages/MeetingRoomManage/UpdateMeetingRoom';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:3005/',
  timeout: 3000,
});
axiosInstance.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem('access_token');

  if (accessToken) {
    config.headers.authorization = 'Bearer ' + accessToken;
  }
  return config;
});

interface PendingTask {
  config: AxiosRequestConfig;
  resolve: Function;
}
let refreshing = false;
const queue: PendingTask[] = [];
async function refreshToken() {
  const res = await axiosInstance.get('/user/refresh', {
    params: {
      refresh_token: localStorage.getItem('refresh_token'),
    },
  });
  localStorage.setItem('access_token', res.data.access_token || '');
  localStorage.setItem('refresh_token', res.data.refresh_token || '');
  return res;
}
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }
    let { data, config } = error.response;

    if (refreshing) {
      return new Promise((resolve) => {
        queue.push({
          config,
          resolve,
        });
      });
    }

    if (data.code === 401 && !config.url.includes('/user/refresh')) {
      refreshing = true;

      const res = await refreshToken();

      refreshing = false;

      if (res.status === 200) {
        queue.forEach(({ config, resolve }) => {
          resolve(axiosInstance(config));
        });

        return axiosInstance(config);
      } else {
        message.error(res.data);

        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      }
    } else {
      return error.response;
    }
  }
);

export async function login(username: string, password: string) {
  return await axiosInstance.post('/user/login', {
    username,
    password,
  });
}

export async function registerCaptcha(email: string) {
  return await axiosInstance.get('/user/register-captcha', {
    params: {
      address: email,
    },
  });
}

export async function register(registerUser: RegisterUser) {
  return await axiosInstance.post('/user/register', registerUser);
}

export async function updatePasswordCaptcha(email: string) {
  return await axiosInstance.get('/user/update_password/captcha', {
    params: {
      address: email,
    },
  });
}

export async function updatePassword(data: UpdatePassword) {
  return await axiosInstance.post('/user/update_password', data);
}

export async function getUserInfo(userId?: number) {
  return await axiosInstance.get('/user/info', {
    params: {
      userId,
    },
  });
}

export async function updateInfo(data: UserInfo) {
  return await axiosInstance.post('/user/update', data);
}

export async function updateUserInfoCaptcha(email: string) {
  return await axiosInstance.get('/user/update/captcha', {
    params: {
      email,
    },
  });
}

export async function userSearch(
  pageNo: number,
  pageSize: number,
  username?: string,
  nickName?: string,
  email?: string
) {
  return await axiosInstance.get('/user/list', {
    params: {
      username,
      nickName,
      email,
      pageNo,
      pageSize,
    },
  });
}
export async function freeze(id: number) {
  return await axiosInstance.post('/user/freeze', {
    params: {
      id,
    },
  });
}


export async function meetingRoomList(
  name: string, 
  capacity: number, 
  equipment: string, 
  pageNo: number, 
  pageSize: number
) {
  return await axiosInstance.get('/meeting-room/list', {
    params: {
      name,
      capacity,
      equipment,
      pageNo,
      pageSize
    }
  });
}
export async function deleteMeetingRoom(id: number) {
    return await axiosInstance.delete('/meeting-room/' + id);
}
export async function createMeetingRoom(meetingRoom: CreateMeetingRoom) {
    return await axiosInstance.post('/meeting-room/create', meetingRoom);
}

export async function updateMeetingRoom(meetingRoom: UpdateMeetingRoom) {
    return await axiosInstance.put('/meeting-room/update', meetingRoom);
}

export async function findMeetingRoom(id: number) {
    return await axiosInstance.get('/meeting-room/' + id);
}
