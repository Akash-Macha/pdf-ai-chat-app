import { Button, Grid, Paper, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const buttonStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
};

const questionInputStyles = {
  color: 'white',
};

const paperStyles = {
  backgroundColor: "#ededed",
  padding: '10px',
};

const handleOnQuestionEnter = (event) => {
  if (event.key === "Enter") {
    document.getElementById("enter-button")?.click();
  }
}

const QuestionInput = ({ question, setQuestion, handleQuestion, isLoading }) => {
  return (
    <Paper elevation={3} style={paperStyles}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <TextField
            id="question"
            label="Question"
            variant="standard"
            fullWidth
            style={questionInputStyles}
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={handleOnQuestionEnter}
            disabled={isLoading}
          />
        </Grid>
        <Grid item xs={2} style={buttonStyles}>
          <Button
            id="enter-button"
            variant="outlined"
            size="large"
            onClick={() => handleQuestion(question)}
            fullWidth
            endIcon={<SendIcon />}
            disabled={isLoading}
          >
            Enter
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default QuestionInput;