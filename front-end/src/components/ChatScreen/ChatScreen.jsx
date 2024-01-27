import { useCallback, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import './ChatScreen.css';
import { useComments } from "../../hooks/use-query-pdf";

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
      <h3>Chat Screen:</h3>
      {questionAndAnswers.length !== 0 ? questionAndAnswers.map(questionAndAnswer => (
        <Card variant="outlined" className="qAndACard" key={questionAndAnswer.key}>
          <CardContent>
            <Typography variant="subtitle2">
              Question: {questionAndAnswer.question}
            </Typography>
            <Typography variant="subtitle2">
              Answer: {questionAndAnswer.answer}
            </Typography>
          </CardContent>
        </Card>
      )) : null}
      <input type="text" value={question} onChange={(event) => setQuestion(event.target.value)} />
      <button type="button" onClick={handleQuestion}>Enter</button>
    </>
  );
};

export default ChatScreen;