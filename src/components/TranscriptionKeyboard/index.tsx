import { Chip, Stack, Grid2 as Grid, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { CONSONANTS, VOWELS } from './constants';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardRoundedIcon from '@mui/icons-material/KeyboardRounded';

const TRANSCRIPTION_LIST = [...CONSONANTS, ...VOWELS];

interface Props {
  onClick: (value: string) => void;
}

export const TranscriptionKeyboard = ({ onClick }: Props) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack direction="row" spacing={1}>
          <KeyboardRoundedIcon />
          <div>Клавиатура транскрипции</div>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={0.5}>
          {TRANSCRIPTION_LIST.map((value, i) => (
            <Grid key={i}>
              <Chip
                variant="outlined"
                color={VOWELS.includes(value) ? 'error' : 'info'}
                label={<Typography variant="h6">{value}</Typography>}
                onClick={() => onClick(value)}
              />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
