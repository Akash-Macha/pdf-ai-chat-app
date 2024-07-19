import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardContent, Paper, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import axios from "../../axios-api";
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import QuestionInput from "./QuestionInput";
import Loader from "../Loader/Loader";
import { extractData } from '../../utils'
import "./ChatScreen.css";
import Footer from "../Footer/Footer";

const parentQAndACardStyles = {
  textAlign: 'left',
  minHeight: '65vh',
  backgroundColor: "#ededed",
  overflowY: 'auto',
  height: '63vh',
  width: "100%"
};

const postQueryOnPdf = (query) => axios.post("/query", query).then(extractData);

const ChatScreen = () => {
  const [question, setQuestion] = useState('');
  const containerEndRef = useRef(null);
  const [questionAndAnswers, setQuestionAndAnswers] = useState([]);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(postQueryOnPdf, {
    onSuccess: data => {
      console.log(data);

      setQuestionAndAnswers(existingQAndA => [...existingQAndA, {
        key: existingQAndA.length + 1,
        question,
        answer: data.Response,
      }]);
      setQuestion('');
    },
    onError: () => {
      throw new Error("There was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries('query-on-pdf')
    },
  });

  useEffect(() => {
    containerEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [questionAndAnswers]);

  const handleQuestion = useCallback(async () => {
    mutate({ question });
  }, [question]);

  return (
    <>
      <div className="container">
        <div className="chat-screen-heading">
          <Typography variant="h4">
            Chat with your PDF
          </Typography>
        </div>
        <div className="question-and-answer-display">
          <Card variant="outlined" style={parentQAndACardStyles}>
            {questionAndAnswers.length !== 0 ? questionAndAnswers.map(questionAndAnswer => (
              <React.Fragment key={questionAndAnswer.key}>
                <Paper elevation={3} style={{ margin: '5px', padding: '0px', textAlign: 'left' }} >
                  <CardContent>
                    <Typography variant="subtitle1" style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                    }}>
                      <HelpRoundedIcon color="primary" style={{ margin: '0 5px 0 0' }} />
                      {questionAndAnswer.question}
                    </Typography>
                    <Typography variant="subtitle2">
                      Answer: {questionAndAnswer.answer}
                    </Typography>
                  </CardContent>
                </Paper>
              </React.Fragment>
            )) : <Typography variant="subtitle1">It's empty here... Please start asking questions.</Typography>}
            <div style={{ float: "left", clear: "both" }} ref={containerEndRef}></div>
          </Card>
          {isLoading ? <Loader type="RingLoader" size={85} cssOverride={{
            display: 'block',
            position: 'absolute',
            left: "45%",
            top: "40%",
          }} /> : null}
        </div>
        <div className="question-input">
          <QuestionInput
            question={question}
            setQuestion={setQuestion}
            isLoading={isLoading}
            handleQuestion={handleQuestion}
          />
        </div>
        <span className="footer">
          <Footer />
        </span>
      </div>
    </>
  );
};

export default ChatScreen;