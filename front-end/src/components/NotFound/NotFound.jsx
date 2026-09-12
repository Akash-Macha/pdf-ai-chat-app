import { Center, Stack, Text, Title } from '@mantine/core';

const NotFound = () => {
  return (
    <Center style={{ flex: 1 }}>
      <Stack align="center" gap={4}>
        <Title order={1}>404</Title>
        <Text c="dimmed">Page not found 😞</Text>
      </Stack>
    </Center>
  );
};

export default NotFound;
