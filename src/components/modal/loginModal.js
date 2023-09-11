'use client';

import { signIn } from 'next-auth/react';
import Heading from '@/components/heading';
import Input from '@/components/inputs/input';
import Modal from '@/components/modal/modal';
import useLoginModal from '@/hooks/useLoginModal';
import axios from 'axios';
import { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import Button from '../button';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    setLoading(true);
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((res) => {
      setLoading(false);

      if (res?.ok) {
        toast.success('Logged in successfully!');
        router.refresh();
        loginModal.onClose();
      }
      if (res?.error) {
        toast.error(res.error);
      }
    });
  };
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
        type="email"
        required={true}
        register={register}
        errors={errors}
        disabled={loading}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        required={true}
        register={register}
        errors={errors}
        disabled={loading}
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        onClick={() => signIn('google')}
        disabled={loading}
        icon={FcGoogle}
      />
      <Button
        label="Continue with github"
        onClick={() => signIn('github')}
        outline
        disabled={loading}
        icon={AiFillGithub}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div
            className="text-neutral-500 cursor-pointer hover:underline"
            onClick={loginModal.onClose}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Login"
      actionLabel="Continue"
      body={bodyContent}
      footer={footerContent}
      disabled={loading}
    />
  );
};

export default LoginModal;
