'use client';

import { PATH } from '@/constants/routing';
import { signIn } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import FormContainer from '@/app/components/FormContainer';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: credentials.email,
        password: credentials.password,
      });
      if (result?.error) {
        setError('Invalid Password or Email.');
        toast.error('Login failed.');
      } else {
        toast.success('Login successful.');
        router.push(PATH.HOME);
      }
    } catch (error) {
      setError('An unexpected error occurred.');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <FormContainer
        title="Login"
        footerContent={
          <p className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <NextLink
              href={PATH.LOGIN}
              className="font-semibold text-indigo-600 hover:text-indigo-500">
              Sign up
            </NextLink>
          </p>
        }>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </FormContainer>
    </div>
  );
};

export default Login;
