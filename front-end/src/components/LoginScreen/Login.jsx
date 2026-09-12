import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Center, Paper, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle, IconLogin2 } from '@tabler/icons-react';
import axios from '../../axios-api';
import { setToken } from '../../auth';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Enter a valid email'),
      password: (value) => (value.length > 0 ? null : 'Password is required'),
    },
  });

  const handleSubmit = async (values) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await axios.post('/login', values);
      setToken(response.data.token);
      navigate('/pdf-upload');
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Incorrect email or password.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
    setIsLoading(false);
  };

  return (
    <Center style={{ flex: 1 }}>
      <Paper withBorder shadow="md" p="xl" radius="md" w={380}>
        <Stack gap="md">
          <Stack gap={4} align="center">
            <IconLogin2 size={32} stroke={1.5} />
            <Title order={2} size="h3">
              Welcome back
            </Title>
            <Text size="sm" c="dimmed">
              Sign in to chat with your PDFs
            </Text>
          </Stack>

          {error && (
            <Alert color="red" variant="light" icon={<IconAlertCircle size={18} />}>
              {error}
            </Alert>
          )}

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="sm">
              <TextInput
                label="Email"
                placeholder="you@example.com"
                required
                {...form.getInputProps('email')}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                {...form.getInputProps('password')}
              />
              <Button type="submit" fullWidth mt="sm" loading={isLoading}>
                Sign in
              </Button>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Center>
  );
};

export default Login;
