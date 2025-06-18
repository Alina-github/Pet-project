'use client';

import { PATHS } from '@/lib/constants';
import { api } from '@/lib/api';
import { API_ROUTES } from '@/lib/constants';
import NextLink from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

import FormContainer from '@/components/common/FormContainer';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await api.post(API_ROUTES.RESET_PASSWORD, { email });
      toast.success('Password reset link sent to your email!');
      setSuccess('Password reset link sent to your email!');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      toast.error(err.message || 'An unexpected error occurred.');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <FormContainer title="Reset Password">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
              placeholder="Enter your email address"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Sending Link...' : 'Send Reset Link'}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          <NextLink
            href={PATHS.LOGIN}
            className="font-semibold text-indigo-600 hover:text-indigo-500">
            Back to Login
          </NextLink>
        </div>
      </FormContainer>
    </div>
  );
};

export default ResetPassword;
