import { useCallback, useState } from "react";
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import './ChatScreen.css';
import { useComments } from "../../hooks/use-query-pdf";

const cardStyles = {
  textAlign: 'left',
  minHeight: '50vh',
  backgroundColor: "#ededed",
};

const ChatScreen = () => {
  const { isLoading, data, isError, error, refetch } = useComments();
  const [question, setQuestion] = useState('');
  const [questionAndAnswers, setQuestionAndAnswers] = useState([{
    key: 1,
    question: 'What are the options available in the Supervisor Menu?',
    answer: `
    1. Test\n
    2. Check
    `,
  }]);
  /**
   * {
   *    question: '',
   *    answer: '',
   * }
   */

  const handleQuestion = useCallback(async () => {
    console.log('[handleQuestion] question:', question)
  }, [question]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Chat with APTRA Advance NDC Superviser Guide
      </Typography>
      {questionAndAnswers.length !== 0 ? questionAndAnswers.map(questionAndAnswer => (
        <Card variant="outlined" key={questionAndAnswer.key} style={cardStyles}>
          <CardContent>
            <Typography variant="subtitle2">
              Question: {questionAndAnswer.question}
            </Typography>
            <Typography variant="subtitle2">
              Answer: {questionAndAnswer.answer}
            </Typography>
            <Divider />
          </CardContent>
        </Card>
      )) : null}
      <input type="text" value={question} onChange={(event) => setQuestion(event.target.value)} />
      <button type="button" onClick={handleQuestion}>Enter</button>
      <TextField
        id="Question"
        label="Question"
        variant="filled"
        fullWidth
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
      />
      <TextField
        id="filled-multiline-flexible"
        label="Multiline"
        multiline
        maxRows={4}
        variant="filled"
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        onClick={handleQuestion}
      >
        Enter
      </Button>
    </>
  );
};

export default ChatScreen;