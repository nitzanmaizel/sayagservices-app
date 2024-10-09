import { CircularProgress } from '@mui/material';

interface LoaderProps {
  size?: number;
  color?: string;
}

const Loader = ({ color = '#000', size = 20 }: LoaderProps) => {
  return <CircularProgress sx={{ color }} size={size} />;
};

export default Loader;
