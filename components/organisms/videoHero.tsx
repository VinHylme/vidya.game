import { classNames } from '@/common/helpers';
import React, { useState } from 'react';
import VRBText from '../../react-bricks/bricks/atoms/VRBText';
import VRBTitle from '../../react-bricks/bricks/atoms/VRBTitle';
import YouTube from "react-youtube";
import { VText } from '../atoms/VText';
import { VTitle } from '../atoms/VTitle';
import { useDetectIsMobileView } from 'hooks/useDetectIsMobileView';

export interface IVideoHeroProps {
  videoId?: string;
  videoTitle?: string;
  videoDesc?: string;
  canEdit?: boolean;
  fetchTitleFromVideo?: boolean;
  hideTitleWhenPlaying?: boolean;
}

export const VideoHero: React.FC<IVideoHeroProps> = ({ hideTitleWhenPlaying, fetchTitleFromVideo, videoId, videoTitle, videoDesc, canEdit}) => {
  const { isMobileView } = useDetectIsMobileView();
  const [title, setVideoTitle] = useState();
  const [hideTitle, setHideTitle] = useState(false);

  const videoConfig = {
    height: '100%',
    width: '100%',
    playerVars: {
      modestbranding: 1,
      autoplay: false,
      cc_load_policy: 0,
      enablejsapo:0,
      disablekb:1,
      controls: 2,
      rel: 0,
    }
  }

  return (
    <div className={classNames('sm:min-h-[700px] min-h-[400px] bg-black h-full flex justify-start items-end prose', canEdit ? 'w-[95%]' : 'w-full')}>
      {hideTitle && hideTitleWhenPlaying ? <></> :  <div className='absolute w-[90%] h-44 mb-12 px-14'>
        <div className='flex flex-col sm:space-y-4 space-y-0'>
          {(canEdit && !fetchTitleFromVideo) || typeof(videoTitle) !== 'string' ? <VRBTitle overrideTextColor={true} type='h1' propName='videoTitle' ></VRBTitle> : <VTitle overrideTextColor={true} type='h2'>{fetchTitleFromVideo ? title : videoTitle}</VTitle>}
          {(canEdit && !fetchTitleFromVideo) || typeof(videoDesc !== 'string') ? <VRBText overrideTextColor={true} size='lg' propName='videoDesc'></VRBText> :<VText overrideTextColor={true} size='lg'>{videoDesc}</VText>}
        </div>
      </div>}
      <YouTube style={{width: '100%', height: isMobileView ? '400px' : '700px'}} loading="lazy" videoId={videoId} opts={videoConfig} 
        onPlay={(s) => setHideTitle(true)} 
        onPause={(s) => setHideTitle(false)} 
        onError={(s) => setHideTitle(false)} 
        onEnd={() => setHideTitle(false)} onReady={(e) => {
        setVideoTitle(e.target.getVideoData().title);
      }}/>
    </div>
  )
}