'use client';

import { PATH } from '@/constants/routing';
import { api } from '@/utils/api';
import { API_ROUTES } from '@/utils/constants';
import { Input, Button, Link, addToast } from '@heroui/react';
import { useState } from 'react';

import FormContainer from '@/app/components/FormContainer';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await api.post(API_ROUTES.RESET_PASSWORD, { email });
      setSuccess(true);
      addToast({
        color: 'success',
        description: 'Reset link sent! Check your email.',
      });
    } catch (error: any) {
      addToast({
        color: 'danger',
        description: 'Failed to send reset link.',
      });
      console.error('Reset password error:', error.data?.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer title="Reset Password">
      {!success ? (
        <>
          <p className="text-center text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="bordered"
            fullWidth
            size="lg"
            placeholder="Enter your email"
          />

          {error && <p className="text-sm text-danger">{error}</p>}

          <Button
            color="primary"
            onPress={handleResetPassword}
            className="mt-2"
            fullWidth
            size="lg"
            isLoading={isLoading}>
            Send Reset Link
          </Button>
        </>
      ) : (
        <div className="py-4 text-center">
          <p className="mb-4 text-success">Reset link sent! Check your email.</p>
          <Button as={Link} href={PATH.LOGIN} color="primary" variant="flat">
            Back to Login
          </Button>
        </div>
      )}
    </FormContainer>
  );
};

export default ResetPassword;
