'use client';

import { PATH } from '@/constants/routing';
import { api } from '@/utils/api';
import { API_ROUTES } from '@/utils/constants';
import { Button } from '@heroui/react';
import { Input, Link } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import FormContainer from '@/app/components/FormContainer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await api.post(API_ROUTES.LOGIN, { email, password });

      if (response.user) {
        router.push(PATH.HOME);
      }
    } catch (error) {
      console.error('login error:', error);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer title="Login">
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

      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="bordered"
        fullWidth
        size="lg"
        placeholder="Enter your password"
      />

      {error && <p className="text-sm text-danger">{error}</p>}

      <Button color="danger" onPress={handleLogin} fullWidth size="lg" isLoading={isLoading}>
        Login
      </Button>

      <div className="mt-2 flex justify-center">
        <Link href={PATH.RESET_PASSWORD} className="text-sm">
          Forgot password?
        </Link>
      </div>
    </FormContainer>
  );
};

export default Login;
