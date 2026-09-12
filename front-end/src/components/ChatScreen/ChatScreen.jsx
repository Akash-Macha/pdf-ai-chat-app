import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { Alert, Badge, Group, Loader, Paper, ScrollArea, Stack, Text, Title } from "@mantine/core";
import { IconAlertCircle, IconFileTypePdf, IconHelpCircle } from "@tabler/icons-react";
import axios from "../../axios-api";
import QuestionInput from "./QuestionInput";
import { extractData } from "../../utils";
import { useLoadedPdfs } from "../../hooks/use-loaded-pdfs";

const postQueryOnPdf = (query) => axios.post("/query", query).then(extractData);

const ChatScreen = () => {
  const [question, setQuestion] = useState('');
  const [pendingQuestion, setPendingQuestion] = useState(null);
  const containerEndRef = useRef(null);
  const [questionAndAnswers, setQuestionAndAnswers] = useState([]);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { data: loadedPdfs } = useLoadedPdfs();

  const { mutate, isLoading } = useMutation(postQueryOnPdf, {
    onSuccess: (data, variables) => {
      setQuestionAndAnswers(existingQAndA => [...existingQAndA, {
        key: existingQAndA.length + 1,
        question: variables.question,
        answer: data.Response,
      }]);
    },
    onSettled: () => {
      setPendingQuestion(null);
      queryClient.invalidateQueries('query-on-pdf')
    },
  });

  useEffect(() => {
    containerEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [questionAndAnswers, pendingQuestion]);

  const handleQuestion = () => {
    if (!question) return;
    setPendingQuestion(question);
    setQuestion('');
    mutate({ question });
  };

  const hasLoadedPdf = (loadedPdfs?.total_count ?? 0) > 0;

  return (
    <Stack style={{ flex: 1 }} gap="md">
      <Group justify="space-between">
        <Title order={2} size="h3">Chat with your PDF</Title>
        {hasLoadedPdf && (
          <Badge variant="light" color="teal" leftSection={<IconFileTypePdf size={14} />}>
            PDF loaded
          </Badge>
        )}
      </Group>

      {!hasLoadedPdf && (
        <Alert color="yellow" variant="light" icon={<IconAlertCircle size={18} />}>
          No PDF has been uploaded yet.{' '}
          <Text component="span" fw={600} style={{ cursor: 'pointer' }} onClick={() => navigate('/pdf-upload')}>
            Upload one to get started.
          </Text>
        </Alert>
      )}

      <ScrollArea style={{ flex: 1 }} offsetScrollbars>
        <Stack gap="sm">
          {questionAndAnswers.length === 0 && !pendingQuestion && (
            <Text c="dimmed" ta="center" py="xl">
              It&apos;s empty here... Please start asking questions.
            </Text>
          )}
          {questionAndAnswers.map(questionAndAnswer => (
            <Paper key={questionAndAnswer.key} withBorder radius="md" p="md">
              <Group gap="xs" align="flex-start" wrap="nowrap">
                <IconHelpCircle size={20} style={{ flexShrink: 0, marginTop: 2 }} />
                <Text fw={600}>{questionAndAnswer.question}</Text>
              </Group>
              <Text size="sm" c="dimmed" mt={4} ml={28}>
                {questionAndAnswer.answer}
              </Text>
            </Paper>
          ))}
          {pendingQuestion && (
            <Paper withBorder radius="md" p="md">
              <Group gap="xs" align="flex-start" wrap="nowrap">
                <IconHelpCircle size={20} style={{ flexShrink: 0, marginTop: 2 }} />
                <Text fw={600}>{pendingQuestion}</Text>
              </Group>
              <Group gap={8} mt={4} ml={28}>
                <Loader size={14} />
                <Text size="sm" c="dimmed">Thinking...</Text>
              </Group>
            </Paper>
          )}
          <div ref={containerEndRef} />
        </Stack>
      </ScrollArea>

      <QuestionInput
        question={question}
        setQuestion={setQuestion}
        isLoading={isLoading}
        handleQuestion={handleQuestion}
      />
    </Stack>
  );
};

export default ChatScreen;
