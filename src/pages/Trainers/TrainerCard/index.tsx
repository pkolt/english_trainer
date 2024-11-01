import { PageUrl } from '@/constants/urls';
import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TrainerRouteState } from '../types';

interface Props {
  title: string;
  icon?: JSX.Element;
  disable?: boolean;
  pageUrl?: PageUrl;
  pageState?: TrainerRouteState;
}

export const TrainerCard = ({ title, icon, disable, pageUrl, pageState }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (pageUrl) {
      navigate(pageUrl, { state: pageState });
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
