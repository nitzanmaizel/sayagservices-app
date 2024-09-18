import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
  Avatar,
} from '@mui/material';
import { formatDateTime } from '../utils/date';
import { useDocs } from '../hooks/useDocs';
import { Document } from '../types/doc';
import { useUser } from '../hooks/useUser';

const DocCard = ({ id, name, thumbnailLink, createdTime }: Document) => {
  const { handleDownload, downloading } = useDocs();
  const { userInfo } = useUser();

  const renderAvatar = () => {
    if (userInfo) {
      return <Avatar sx={{ marginRight: 0 }} src={userInfo.picture} alt={userInfo.name} />;
    }
    return null;
  };

  return (
    <Card sx={{ border: '1px solid #000' }}>
      <CardHeader
        // sx={{ direction: 'rtl' }}
        avatar={renderAvatar()}
        title={name}
        subheader={formatDateTime(createdTime)}
      />
      <CardMedia component='img' src={thumbnailLink} sx={{ height: 220 }} title={name} />
      <CardContent>
        <Link target='_blank' to={`https://docs.google.com/document/d/${id}`}>
          <Typography textAlign={'center'} variant='subtitle1'>
            {name}
          </Typography>
          <Typography textAlign={'center'} variant='subtitle2'>
            {formatDateTime(createdTime)}
          </Typography>
        </Link>
        <CardActions>
          <Button color='primary' variant='contained' onClick={() => handleDownload(id, name)}>
            {downloading ? (
              <CircularProgress sx={{ color: '#fff' }} size={20} />
            ) : (
              <Typography sx={{ direction: 'rtl' }}>הורד PDF</Typography>
            )}
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default DocCard;
