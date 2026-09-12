import { ActionIcon, Group, TextInput } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';

const QuestionInput = ({ question, setQuestion, handleQuestion, isLoading }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && question) {
      handleQuestion();
    }
  };

  return (
    <Group gap="sm" align="flex-end">
      <TextInput
        id="question"
        label="Question"
        placeholder="Ask something about your PDF..."
        style={{ flex: 1 }}
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      <ActionIcon
        size="input-sm"
        variant="filled"
        onClick={handleQuestion}
        disabled={!question}
        loading={isLoading}
        aria-label="Send question"
      >
        <IconSend size={18} />
      </ActionIcon>
    </Group>
  );
};

export default QuestionInput;
