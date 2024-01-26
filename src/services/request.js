import axiosBase from 'axios';
// import exp from 'constants';

const baseUrl =
  'https://fd98-2405-4803-fd63-7070-d022-889c-f66b-1ec5.ngrok-free.app';
// const baseUrl = '';

const initRequest = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  const axios = axiosBase.create({
    // baseURL: 'http://172.20.10.2:8080',
    baseURL: baseUrl,
    headers,
    // withCredentials: true,
  });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const { status } = error.response || {};
      if (status === 403 || status === undefined) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    },
  );

  return axios;
};

const generateUrl = (url, params) => {
  let genUrl = url;
  if (params) {
    const keys = Object.keys(params);
    if (keys.length > 0) {
      for (const key of keys) {
        genUrl = genUrl.replace(`{${key}}`, params[key]);
      }
    }
  }
  return genUrl;
};

const generateQueryString = (query) => {
  if (!query) return '';
  const keys = Object.keys(query);
  if (keys.length > 0) {
    const qString = [];
    for (const key of keys) {
      qString.push(`${key}=${query[key]}`);
    }
    return `?${qString.join('&')}`;
  }
  return '';
};

const request = async (callback, reqOption) => {
  try {
    const { url, params } = reqOption;
    const genUrl = generateUrl(url, params);
    const axios = initRequest();
    const response = await callback(axios, genUrl);
    return response?.data;
  } catch (error) {
    console.warn('▼Api Error▼', error);
    // return undefined;
  }
};

export const get = async (reqOption) => {
  return await request((axios, genUrl) => {
    return axios.get(
      `${genUrl}${generateQueryString(reqOption.query)}`,
      reqOption.config,
    );
  }, reqOption);
};

export const post = async (reqOption) => {
  return await request((axios, genUrl) => {
    return axios.post(genUrl, reqOption.data, reqOption.config);
  }, reqOption);
};

export const put = async (reqOption) => {
  return await request((axios, genUrl) => {
    return axios.put(genUrl, reqOption.data, reqOption.config);
  }, reqOption);
};

export const deleteMethod = async (reqOption) => {
  console.log(reqOption);
  return await request((axios, genUrl) => {
    return axios.delete(genUrl, reqOption.config);
  }, reqOption);
};

export const upload = async (reqOption) => {
  return await request((axios, genUrl) => {
    return axios.post(genUrl, reqOption.data, {
      ...reqOption.config,
      headers: {
        ...reqOption.config?.headers,
        'Content-type': 'multipart/form-data',
      },
    });
  }, reqOption);
};

export const deleteFormData = async (reqOption) => {
  return await axiosBase.delete(baseUrl + reqOption.url, {
    data: reqOption.data,
    headers: {
      ...reqOption.config?.headers,
      'Content-Type': 'multipart/form-data',
    },
    ...reqOption.config,
  });
};

export const putFormData = async (reqOption) => {
  return await request((axios, genUrl) => {
    return axios.put(genUrl, reqOption.data, {
      ...reqOption.config,
      headers: {
        ...reqOption.config?.headers,
        'Content-type': 'multipart/form-data',
      },
    });
  }, reqOption);
};
