import { PageUrl } from '@/constants/urls';
import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  icon?: JSX.Element;
  disable?: boolean;
  pageUrl?: PageUrl;
}

export const TrainerCard = ({ title, icon, disable, pageUrl }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (pageUrl) {
      navigate(pageUrl);
    }
  };

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
        <CardActionArea onClick={handleClick}>{content}</CardActionArea>
      )}
    </Card>
  );
};
