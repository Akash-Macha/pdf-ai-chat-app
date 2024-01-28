import { useCallback, useState } from "react";
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import { useComments } from "../../hooks/use-query-pdf";
import QuestionInput from "./QuestionInput";
import "./ChatScreen.css";

const parentQAndACardStyles = {
  textAlign: 'left',
  minHeight: '63vh',
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
    <div className="container">
      <div className="chat-screen-heading">
        <Typography variant="h4" gutterBottom>
          Chat with APTRA Advance NDC Superviser Guide
        </Typography>
      </div>
      <div className="question-and-answer-display">
        {questionAndAnswers.length !== 0 ? questionAndAnswers.map(questionAndAnswer => (
          <Card variant="outlined" key={questionAndAnswer.key} style={parentQAndACardStyles}>
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
      </div>
      <div className="question-input">
        <QuestionInput handleQuestion={handleQuestion} />
      </div>
    </div>
  );
};

export default ChatScreen;