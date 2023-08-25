'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';
import useRegisterModal from '@/hooks/useRegisterModal';
import Modal from '@/components/modal/modal';
import Button from '@/components/button';
import Heading from '@/components/heading';
import Input from '@/components/inputs/input';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    setLoading(true);
    axios
      .post('/api/register', data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input />
    </div>
  );
  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Register"
      actionLabel="Continue"
      body={bodyContent}
    />
  );
};

export default RegisterModal;
