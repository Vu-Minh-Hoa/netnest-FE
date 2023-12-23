import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/common/button/button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './login.scss';
import { useDispatch } from 'react-redux';
import { getToken } from '../../slice/userSlice';
import { useRouter } from '../../hooks/useRouter';

const schema = yup.object({
  email: yup.string().required('Email is required!').email('Invalid email!'),
  password: yup.string().required('Password is required!'),
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const { pushRoute } = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    dispatch(getToken(token));
    if (token) {
      pushRoute('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitForm = (data) => {
    dispatch(getToken('have logged in'));
    localStorage.setItem('token', 'have logged in');
    pushRoute('/');
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
        <Button btnType='submit' text='Login' className='login-button' />
        <a href='/register' className='login-dontHave'>
          Don't have an account?
        </a>
      </form>
    </div>
  );
};

export default LoginPage;
