import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface Props {
  stepNumber: number;
  stepCount: number;
  finished?: boolean;
}

export const StepProgress = ({ stepNumber, stepCount, finished }: Props) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        value={Math.floor((stepNumber / stepCount) * 100)}
        size={55}
        color={finished ? 'success' : undefined}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Typography variant="h6" component="div" color="textPrimary">{`${stepNumber}/${stepCount}`}</Typography>
      </Box>
    </Box>
  );
};
