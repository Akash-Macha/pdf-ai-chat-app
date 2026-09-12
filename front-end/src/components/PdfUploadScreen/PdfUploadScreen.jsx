import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Center, Group, Paper, Stack, Text, Title, rem } from '@mantine/core';
import { Dropzone, PDF_MIME_TYPE } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
import { IconFileTypePdf, IconUpload, IconX } from '@tabler/icons-react';
import axios from '../../axios-api';

const PdfUploadScreen = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDrop = (files) => {
    setFile(files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    // 'file_upload' must match the API endpoint's parameter name
    formData.append('file_upload', file);

    setIsLoading(true);
    try {
      await axios.post('/upload-pdf', formData);
      notifications.show({
        title: 'Upload complete',
        message: `${file.name} is ready to chat with.`,
        color: 'teal',
      });
      navigate('/chat-with-pdf');
    } catch (error) {
      notifications.show({
        title: 'Upload failed',
        message: error.response?.data?.Error || 'Something went wrong while uploading your PDF.',
        color: 'red',
      });
    }
    setIsLoading(false);
  };

  return (
    <Center style={{ flex: 1 }}>
      <Stack gap="lg" w={520}>
        <Stack gap={4} align="center">
          <Title order={2} size="h3">
            Upload a PDF
          </Title>
          <Text size="sm" c="dimmed" ta="center">
            Please don&apos;t upload confidential PDFs — questions are answered using OpenAI&apos;s gpt-3.5-turbo.
          </Text>
        </Stack>

        <Paper withBorder radius="md" p="md">
          <Dropzone
            onDrop={handleDrop}
            accept={PDF_MIME_TYPE}
            maxFiles={1}
            loading={isLoading}
          >
            <Group justify="center" gap="xl" mih={180} style={{ pointerEvents: 'none' }}>
              <Dropzone.Accept>
                <IconUpload style={{ width: rem(52), height: rem(52) }} stroke={1.5} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX style={{ width: rem(52), height: rem(52) }} stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconFileTypePdf style={{ width: rem(52), height: rem(52) }} stroke={1.5} />
              </Dropzone.Idle>

              <Stack gap={4} align="center">
                <Text size="lg">
                  {file ? file.name : 'Drag a PDF here, or click to browse'}
                </Text>
                <Text size="sm" c="dimmed">
                  One PDF at a time
                </Text>
              </Stack>
            </Group>
          </Dropzone>
        </Paper>

        <Button onClick={handleUpload} disabled={!file} loading={isLoading} fullWidth size="md">
          Upload
        </Button>
      </Stack>
    </Center>
  );
};

export default PdfUploadScreen;
