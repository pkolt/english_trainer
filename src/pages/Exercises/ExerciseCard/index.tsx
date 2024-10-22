import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';

interface Props {
  title: string;
  icon?: JSX.Element;
  disable?: boolean;
  onClick?: () => void;
}

export const ExerciseCard = ({ title, icon, disable, onClick }: Props) => {
  const content = (
    <CardContent>
      <Stack textAlign="center">
        {icon && <Typography variant="h2">{icon}</Typography>}
        <Typography variant="h6">{title}</Typography>
      </Stack>
    </CardContent>
  );

  return (
    <Card>
      {disable ? (
        <Typography color="textDisabled">{content}</Typography>
      ) : (
        <CardActionArea onClick={onClick}>{content}</CardActionArea>
      )}
    </Card>
  );
};
