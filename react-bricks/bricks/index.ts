import { types } from 'react-bricks/frontend'
import website from 'react-bricks-ui/website'
import CallHeroImage from './molecules/CallHeroImage';
import VRBButton from './atoms/VRBButton';
import VRBRichText from './atoms/VRBRichText';
import VRBImage from './atoms/VRBImage';
import VRBText from './atoms/VRBText';
import VRBLabel from './atoms/VRBLabel';
import VRBCustomer from './atoms/VRBCustomer';
import Customers from './molecules/Customers';
import CallHeroColumn from './molecules/CallHeroColumn';
import VRBColumn from './atoms/VRBColumn';
import VRBTitle from './atoms/VRBTitle';
import BlogSection from './molecules/BlogSection';
import VideoHeroUnit from './molecules/VideoHeroUnit';

const bricks: types.Brick<any>[] = [
  // ...website, // React Bricks UI
  CallHeroImage,
  CallHeroColumn,
  BlogSection,
  VideoHeroUnit,
  VRBButton,
  VRBRichText,
  VRBColumn,
  VRBText,
  VRBTitle,
  VRBLabel,
  VRBImage,
  VRBCustomer,
  Customers
]

export default bricks
