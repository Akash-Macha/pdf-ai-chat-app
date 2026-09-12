import { ActionIcon, Group, Text, Tooltip, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconFileText, IconLogout2, IconMoon, IconSun } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { clearToken, isAuthenticated } from '../../auth';

const Header = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    clearToken();
    navigate('/');
  };

  return (
    <Group justify="space-between" px="md" py="sm" wrap="nowrap">
      <Group gap="xs" wrap="nowrap">
        <IconFileText size={26} stroke={1.75} />
        <Text fw={700} size="lg">
          Chat with your PDFs
        </Text>
      </Group>
      <Group gap="xs" wrap="nowrap">
        <Tooltip label={computedColorScheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
          <ActionIcon
            variant="default"
            size="lg"
            radius="md"
            onClick={toggleColorScheme}
            aria-label="Toggle color scheme"
          >
            {computedColorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
          </ActionIcon>
        </Tooltip>
        {authenticated && (
          <Tooltip label="Log out">
            <ActionIcon variant="default" size="lg" radius="md" onClick={handleLogout} aria-label="Log out">
              <IconLogout2 size={18} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
    </Group>
  );
};

export default Header;
