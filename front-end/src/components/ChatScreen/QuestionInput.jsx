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

const QuestionInput = ({ handleQuestion }) => {
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
          />
        </Grid>
        <Grid item xs={2} style={buttonStyles}>
          <Button
            variant="contained"
            size="large"
            onClick={handleQuestion}
            fullWidth
            endIcon={<SendIcon />}
          >
            Enter
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default QuestionInput;