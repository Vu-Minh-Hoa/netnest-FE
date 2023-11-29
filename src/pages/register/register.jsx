import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/common/button/button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './register.scss';
import { useDispatch } from 'react-redux';
import { getToken } from '../../slice/userSlice';
import { useRouter } from '../../hooks/useRouter';

const schema = yup.object({
  email: yup.string().required('Email is required!').email('Invalid email!'),
  password: yup.string().required('Password is required!'),
  fullname: yup.string().required('Full Name is required!'),
});

const RegisterPage = () => {
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
    dispatch(getToken('Have registered in'));
    localStorage.setItem('token', 'Have registered in');
    pushRoute('/');
  };

  return (
    <div className='register-container'>
      <form className='register-form' onSubmit={handleSubmit(onSubmitForm)}>
        <h2 className='register-title'>WELCOME TO NETNEST </h2>
        <input
          className='register-fullname'
          type='text'
          name='fullname'
          placeholder='Full Name'
          {...register('fullname')}
        />
        <p className='register-errText'>{errors.fullname?.message}</p>
        <input
          className='register-email'
          type='text'
          name='email'
          placeholder='Email'
          {...register('email')}
        />
        <p className='register-errText'>{errors.email?.message}</p>
        <input
          className='register-password'
          rows='10'
          type='password'
          name='password'
          placeholder='Password'
          {...register('password')}
        />
        <p className='register-errText'>{errors.password?.message}</p>
        <Button btnType='submit' text='Register' className='register-button' />
        <a href='/register' className='register-dontHave'>
          Don't have an account?
        </a>
      </form>
    </div>
  );
};

export default RegisterPage;
