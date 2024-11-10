import { IconButton, List, ListItem, ListItemIcon, ListItemText, Stack, Typography, Divider } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { SimpleSpeakButton } from '@/components/SimpleSpeakButton';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useDialogs } from '@toolpad/core';
import WordFormDialog from '@/components/WordFormDialog';
import { Fragment } from 'react/jsx-runtime';
import { Question } from '@/services/words/types';
import { renderWordTypes } from '@/services/words/utils';

interface Props {
  data: Question[];
}

export const FinalReport = ({ data }: Props) => {
  const dialogs = useDialogs();
  return (
    <List>
      {data.map(({ question: word, userAnswer }, index) => {
        const isSuccess = userAnswer?.id === word.id;
        const wordTypesAsStr = renderWordTypes(word.types);
        return (
          <Fragment key={word.id}>
            <ListItem>
              <ListItemIcon>
                {isSuccess ? <CheckCircleRoundedIcon color="success" /> : <CancelRoundedIcon color="error" />}
              </ListItemIcon>

              <ListItemText
                primary={
                  <Stack direction="row" alignItems="flex-start">
                    <SimpleSpeakButton text={word.word} />
                    <Stack direction="column">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="h6">{word.word}</Typography>
                        {word.transcription && (
                          <Typography variant="body1" color="textDisabled">
                            [{word.transcription}]
                          </Typography>
                        )}

                        <IconButton onClick={() => dialogs.open(WordFormDialog, word.id)}>
                          <EditRoundedIcon color="primary" fontSize="small" />
                        </IconButton>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body1" color="textSecondary">
                          {word.translate}
                        </Typography>
                        {wordTypesAsStr && (
                          <Typography variant="caption" color="success">
                            ({wordTypesAsStr})
                          </Typography>
                        )}
                      </Stack>
                    </Stack>
                  </Stack>
                }
              />
            </ListItem>
            {index !== data.length - 1 && <Divider />}
          </Fragment>
        );
      })}
    </List>
  );
};
