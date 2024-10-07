import { SvgIconProps } from '@mui/material';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

export interface IconWrapperProps extends SvgIconProps {
  type: keyof typeof mapTypeToIcon;
  isDark?: boolean;
  isDisabled?: boolean;
}

export const mapTypeToIcon: Record<string, React.FC<SvgIconProps>> = {
  addDoc: (props: SvgIconProps) => <NoteAddIcon {...props} />,
  arrowRight: (props: SvgIconProps) => <EastOutlinedIcon {...props} />,
  analytics: (props: SvgIconProps) => <AnalyticsOutlinedIcon {...props} />,
  dashboard: (props: SvgIconProps) => <DashboardIcon {...props} />,
  doc: (props: SvgIconProps) => <DescriptionIcon {...props} />,
  info: (props: SvgIconProps) => <InfoIcon {...props} />,
  products: (props: SvgIconProps) => <Inventory2OutlinedIcon {...props} />,
  searchDoc: (props: SvgIconProps) => <FindInPageIcon {...props} />,
  logout: (props: SvgIconProps) => <LogoutIcon {...props} />,
  login: (props: SvgIconProps) => <LoginIcon {...props} />,
  orders: (props: SvgIconProps) => <ListAltOutlinedIcon {...props} />,
  home: (props: SvgIconProps) => <HomeIcon {...props} />,
  menu: (props: SvgIconProps) => <MenuIcon {...props} />,
  users: (props: SvgIconProps) => <PeopleOutlineIcon {...props} />,
};
