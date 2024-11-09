import { PageUrl } from '@/constants/urls';
import { Badge, Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TrainerRouteState } from '../types';

interface Props {
  title: string;
  icon: JSX.Element;
  disable?: boolean;
  pageUrl?: PageUrl;
  pageState?: TrainerRouteState;
  badgeCount?: number;
}

const styles = { height: '100%' };

export const TrainerCard = ({ title, icon, disable, pageUrl, pageState, badgeCount }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (pageUrl) {
      navigate(pageUrl, { state: pageState });
    }
  };

  const content = (
    <CardContent sx={styles}>
      <Stack textAlign="center">
        <Typography variant="h2">
          <Badge badgeContent={badgeCount ? `+${badgeCount}` : 0} color="success" max={10000}>
            {icon}
          </Badge>
        </Typography>
        <Typography variant="h6">{title}</Typography>
      </Stack>
    </CardContent>
  );

  return (
    <Card sx={styles}>
      {disable ? (
        <Typography color="textDisabled" component="div">
          {content}
        </Typography>
      ) : (
        <CardActionArea onClick={handleClick} sx={styles}>
          {content}
        </CardActionArea>
      )}
    </Card>
  );
};
