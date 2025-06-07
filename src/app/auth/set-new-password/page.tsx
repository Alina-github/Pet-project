'use client';

import { PATH } from '@/constants/routing';
import { api } from '@/utils/api';
import { API_ROUTES } from '@/utils/constants';
import NextLink from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import FormContainer from '@/components/common/FormContainer';
import { User } from '@/app/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const MIN_PASSWORD_LENGTH = 3; //TODO: update to necessary value. Use 3 now for simplicity in testing.

//TODO: remove example Link after Testing m: 'http://localhost:3000/auth/set-new-password?email=test%40example.com&code=675970' for testing. Provide email and code from Database.

const SetNewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const code = searchParams.get('code');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response: User = await api.post(API_ROUTES.SET_PASSWORD, { password, email, code });

      if (password.length < MIN_PASSWORD_LENGTH) {
        setError('Password must be at least 8 characters long');
        return;
      }
      if (response.user) {
        toast.success('Password has been reset successfully!');
        setSuccess('Password has been reset successfully! You can now login.');
        setTimeout(() => router.push(PATH.LOGIN), 3000); // Optional redirect
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      toast.error('Failed to update password. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <FormContainer title="Set New Password">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
              placeholder="Enter your new password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              required
              placeholder="Confirm your new password"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Resetting Password...' : 'Set New Password'}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          <NextLink
            href={PATH.LOGIN}
            className="font-semibold text-indigo-600 hover:text-indigo-500">
            Back to Login
          </NextLink>
        </div>
      </FormContainer>
    </div>
  );
};

export default SetNewPassword;
