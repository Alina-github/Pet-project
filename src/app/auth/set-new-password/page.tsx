'use client';

import { PATH } from '@/constants/routing';
import { api } from '@/utils/api';
import { API_ROUTES } from '@/utils/constants';
import { addToast, Input, Button, Link } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import FormContainer from '@/app/components/FormContainer';
import type { User } from '@/app/types';

const MIN_PASSWORD_LENGTH = 3; //TODO: update to necessary value. Use 3 now for simplicity in testing.

//TODO: remove example Link after Testing m: 'http://localhost:3000/auth/set-new-password?email=123%40example.com&code=130414' for testing. Provide email and code from Database.

const SetNewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const code = searchParams.get('code');

  const handleSetNewPassword = async () => {
    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response: User = await api.post(API_ROUTES.SET_PASSWORD, { password, email, code });
      if (response.user) {
        setSuccess(true);
        setError('');
        addToast({
          color: 'success',
          description: 'The password was successfully updated.',
        });
        router.push(PATH.HOME);
      }
    } catch (error: any) {
      addToast({
        color: 'danger',
        description: 'Sorry, the password could not be updated',
      });
      console.error('Set new password error:', error?.data?.error || error);
      setError('Failed to update password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer title="Set New Password">
      {!success ? (
        <>
          <p className="text-center text-sm text-gray-600">
            Create a new password for your account.
          </p>

          <Input
            type="password"
            label="New Password"
            value={password}
            minLength={MIN_PASSWORD_LENGTH}
            onChange={(e) => setPassword(e.target.value)}
            variant="bordered"
            fullWidth
            size="lg"
            placeholder="Enter new password"
          />

          <Input
            type="password"
            label="Confirm Password"
            minLength={MIN_PASSWORD_LENGTH}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="bordered"
            fullWidth
            size="lg"
            placeholder="Confirm new password"
          />

          {error && <p className="text-sm text-danger">{error}</p>}

          <Button
            color="primary"
            onPress={handleSetNewPassword}
            className="mt-2"
            fullWidth
            size="lg"
            isLoading={isLoading}>
            Update Password
          </Button>
        </>
      ) : (
        <div className="py-4 text-center">
          <p className="mb-4 text-success">Password updated successfully!</p>
          <Button as={Link} href={PATH.LOGIN} color="primary">
            Go to Login
          </Button>
        </div>
      )}
    </FormContainer>
  );
};

export default SetNewPassword;
