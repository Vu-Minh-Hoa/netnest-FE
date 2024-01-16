import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { FadingBalls } from 'react-cssfx-loading';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import Button from '../../components/common/button/button';
import { API_LIST } from '../../contants/common';
import { useAction } from '../../hooks/useAction';
import { useRouter } from '../../hooks/useRouter';
import { post } from '../../services/request';
import { setToken } from '../../slice/userSlice';
import './login.scss';

const schema = yup.object({
  email: yup.string().required('Email is required!').email('Invalid email!'),
  password: yup.string().required('Password is required!'),
});

const LoginPage = () => {
  const { action } = useAction();
  const [errorText, setErrorText] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [autToken, setAutToken] = useState(localStorage.getItem('token') || '');
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();
  const { pushRoute } = useRouter();

  useEffect(() => {
    if (autToken) {
      dispatch(setAutToken(autToken));
      pushRoute('/');
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitForm = async (data) => {
    setIsLoading(true);
    await action({
      action: async () =>
        await post({
          url: API_LIST.login,
          data: { email: data.email, passWord: data.password },
        }),
      onSuccess: async ({ token }) => {
        if (!token) return;
        dispatch(setToken(token));
        localStorage.setItem('token', token);
        pushRoute('/home');
      },
      onError: async () => {
        setErrorText('Username hoặc mật khẩu không đúng');
      },
    });
    setIsLoading(false);
  };

  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={handleSubmit(onSubmitForm)}>
        <h2 className='login-title'>𝓝𝓮𝓽𝓝𝓮𝓼𝓽</h2>
        <input
          className='login-email'
          type='text'
          name='email'
          placeholder='Email'
          {...register('email')}
        />
        <p className='login-errText'>{errors.email?.message}</p>
        <input
          className='login-password'
          rows='10'
          type='password'
          name='password'
          placeholder='Password'
          {...register('password')}
        />
        <p className='login-errText'>{errors.password?.message}</p>
        <Button
          isLoading={isLoading}
          btnType='submit'
          text='Login'
          className='login-button'
        />

        <a href='/register' className='login-dontHave'>
          Don't have an account?
        </a>
      </form>
    </div>
  );
};

export default LoginPage;
