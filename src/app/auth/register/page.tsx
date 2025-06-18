'use client';

import { PATHS } from '@/lib/constants';
import { api } from '@/lib/api';
import { API_ROUTES } from '@/lib/constants';
import { isValidEmail } from '@/lib/validators';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import FormContainer from '@/components/common/FormContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Register = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email } = formData;

    if (!isValidEmail(email)) {
      // Check that user hasn't entered multiple emails.
      setError('Please enter only one email address.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { password, name } = formData;

      const res: { error?: string; message?: string } = await api.post(API_ROUTES.REGISTER, {
        password,
        email,
        name,
      });
      console.log(res);
      if (res.error) {
        toast.error('Registration failed.');
        setError('Error creating account.');
      } else {
        toast.success('Account created. You can now login.');
        router.push(PATHS.LOGIN);
      }
    } catch {
      toast.error('Something went wrong.');
      setError('Unexpected error.');
    }

    setIsLoading(false);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <FormContainer
        title="Register"
        footerContent={
          <p className="text-center text-sm">
            Already have an account?{' '}
            <NextLink
              href={PATHS.LOGIN}
              className="font-semibold text-indigo-600 hover:text-indigo-500">
              Login
            </NextLink>
          </p>
        }>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>
      </FormContainer>
    </div>
  );
};

export default Register;
