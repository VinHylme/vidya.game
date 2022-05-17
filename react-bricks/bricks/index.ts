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
import BlogListUnit from './molecules/BlogListUnit';
import VideoHeroUnit from './molecules/VideoHeroUnit';
import SmallHeroUnit from './molecules/SmallHeroUnit';
import IntroUnit from './molecules/IntroUnit';
import ProgramHeroUnit from './molecules/ProgramHeroUnit';
import PricesSectionUnit from './molecules/PricesSectionUnit';
import Promo1HeroUnit from './molecules/Promo1HeroUnit';
import Promo2HeroUnit from './molecules/Promo2HeroUnit';
import SpacerUnit from './molecules/SpacerUnit';
import ProgramListUnit from './molecules/ProgramListUnit';
import GameListUnit from './molecules/GameListUnit';
import TeamListUnit from './molecules/TeamListUnit';
import VRBTeamCard from './atoms/VRBTeamCard';

const bricks: types.Brick<any>[] = [
  // ...website, // React Bricks UI
  CallHeroImage,
  CallHeroColumn,
  SmallHeroUnit,
  BlogListUnit,
  ProgramListUnit,
  GameListUnit,
  TeamListUnit,
  IntroUnit,
  SpacerUnit,
  VideoHeroUnit,
  ProgramHeroUnit,
  PricesSectionUnit,
  Promo1HeroUnit,
  Promo2HeroUnit,
  VRBTeamCard,
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
