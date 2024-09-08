import { SvgIconProps } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

export interface IconWrapperProps extends SvgIconProps {
  type: keyof typeof mapTypeToIcon;
  isDark?: boolean;
  isDisabled?: boolean;
}

export const mapTypeToIcon: Record<string, React.FC<SvgIconProps>> = {
  addDoc: (props: SvgIconProps) => <NoteAddIcon {...props} />,
  dashboard: (props: SvgIconProps) => <DashboardIcon {...props} />,
  doc: (props: SvgIconProps) => <DescriptionIcon {...props} />,
  info: (props: SvgIconProps) => <InfoIcon {...props} />,
  searchDoc: (props: SvgIconProps) => <FindInPageIcon {...props} />,
  logout: (props: SvgIconProps) => <LogoutIcon {...props} />,
  login: (props: SvgIconProps) => <LoginIcon {...props} />,
  home: (props: SvgIconProps) => <HomeIcon {...props} />,
  menu: (props: SvgIconProps) => <MenuIcon {...props} />,
};
