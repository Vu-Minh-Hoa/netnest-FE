import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import Button from '../../components/common/button/button';
import { API_LIST } from '../../contants/common';
import { useAction } from '../../hooks/useAction';
import { useRouter } from '../../hooks/useRouter';
import { post } from '../../services/request';
import { setToken } from '../../slice/userSlice';
import './register.scss';

const schema = yup.object({
  email: yup.string().required('Email is required!').email('Invalid email!'),
  username: yup.string().required('User Name is required!'),
  fullname: yup.string().required('Full Name is required!'),
  password: yup
    .string()
    .required('Password is required!')
    .min(8, 'Password must be at least 8 characters.')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain special character.',
    ),
});

const RegisterPage = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const { pushRoute } = useRouter();
  const { action } = useAction();
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const allValue = watch();

  useEffect(() => {
    if (errorText) {
      setErrorText('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allValue]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    dispatch(setToken(token));
    if (token) {
      pushRoute('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitForm = async (data) => {
    setIsLoading(true);

    await action({
      action: async () =>
        await post({
          url: API_LIST.register,
          data: {
            fullName: data.fullname,
            userName: data.username,
            email: data.email,
            passWord: data.password,
          },
        }),
      onSuccess: async (data) => {
        if (data === 'đã add user thành công') {
          pushRoute('/login');
        } else if (data === 'email đã tồn tại') {
          setErrorText('Email exited');
        } else if (data === 'user_name đã tồn tại') {
          setErrorText('Username exited');
        } else if (data === 'full_name đã tồn tại') {
          setErrorText('Fullname exited');
        }
      },
      onError: async () => {
        setErrorText('Something gone wrong');
      },
    });
    setIsLoading(false);
  };

  return (
    <div className='register-container'>
      <form className='register-form' onSubmit={handleSubmit(onSubmitForm)}>
        <h2 className='register-title'>𝓝𝓮𝓽𝓝𝓮𝓼𝓽</h2>
        <input
          className='register-fullname'
          type='text'
          name='fullname'
          placeholder='Fullname'
          {...register('fullname')}
        />
        {errors.fullname?.message && (
          <p className='register-errText'>{errors.fullname?.message}</p>
        )}
        <input
          className='register-username'
          type='text'
          name='username'
          placeholder='Username'
          {...register('username')}
        />
        {errors.username?.message && (
          <p className='register-errText'>{errors.username?.message}</p>
        )}
        <input
          className='register-email'
          type='text'
          name='email'
          placeholder='Email'
          {...register('email')}
        />
        {errors.email?.message && (
          <p className='register-errText'>{errors.email?.message}</p>
        )}
        <input
          className='register-password'
          rows='10'
          type='password'
          name='password'
          placeholder='Password'
          {...register('password')}
        />
        {errors.password?.message && (
          <p className='register-errText'>{errors.password?.message}</p>
        )}
        {errorText && <p className='register-errText'>{errorText}</p>}
        <Button
          btnType='submit'
          text='Register'
          className='register-button'
          isLoading={isLoading}
        />
        <a href='/login' className='register-dontHave'>
          Already have an account
        </a>
      </form>
    </div>
  );
};

export default RegisterPage;
