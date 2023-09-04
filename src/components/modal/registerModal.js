'use client';

import Heading from '@/components/heading';
import Input from '@/components/inputs/input';
import Modal from '@/components/modal/modal';
import useRegisterModal from '@/hooks/useRegisterModal';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import Button from '../button';

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
        toast.error('Something went wrong!');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input
        id="name"
        label="Name"
        type="text"
        required={true}
        register={register}
        errors={errors}
      />
      <Input
        id="email"
        label="Email"
        type="email"
        required={true}
        register={register}
        errors={errors}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        required={true}
        register={register}
        errors={errors}
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        onClick={() => {}}
        disabled={loading}
        icon={FcGoogle}
      />
      <Button
        label="Continue with github"
        onClick={() => {}}
        outline
        disabled={loading}
        icon={AiFillGithub}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div className="text-neutral-500 cursor-pointer hover:underline"
            onClick={registerModal.onClose}
          >
            Login
          </div>
        </div>
      </div>
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
      footer={footerContent}
    />
  );
};

export default RegisterModal;
