import React from 'react';
import { classNames } from '@/common/helpers';
import SIZES from '@/common/static';

export type VItemContainerSize = 'vxxs' | 'vxs' |'vsm' | 'vmd' | 'vlg' | 'vxl' | 'v2xl' | 'full';

export interface ItemContainerProps {
  children?: React.ReactNode;
  widthSize?: VItemContainerSize;
  heightSize?: VItemContainerSize;
  dropShadow?: boolean;
  className?: string;
  showBorder?: boolean;
  showBorderBottom?: boolean;
  showBorderTop?: boolean;
  showBorderLeft?: boolean;
  showBorderRight?: boolean;
  roundedButtom?: boolean;
  roundedTop?: boolean;
  roundedLeft?: boolean;
  roundedRight?: boolean;
}

export const VItemContainer: React.FC<ItemContainerProps> = ({ dropShadow=true, roundedLeft=true, roundedRight=true, roundedTop=true, roundedButtom=true, showBorderBottom=true, showBorderLeft=true, showBorderRight=true, showBorderTop=true, showBorder, children, className, widthSize, heightSize }) => {
  const getSizeClass:any = (size, isHeight) => {
    switch(size) {
      case 'vxxs':
        return {class: isHeight ? 'h-vxxs min-h-vxxs max-h-vxxs' : 'w-vxxs min-w-vxxs max-w-vxxs', px: SIZES['vxxs']};
      case 'vxs':
        return {class: isHeight ? 'h-vxs min-h-vxs max-h-vxs' : 'w-vxs min-w-vxs max-w-vxs', px: SIZES['vxs']};
      case 'vsm':
        return {class: isHeight ? 'h-vsm min-h-vsm max-h-vsm' : 'w-vsm min-w-vsm max-w-vsm', px: SIZES['vsm']};
      case 'vmd':
        return {class: isHeight ? 'h-vmd min-h-vmd max-h-vmd' : 'w-vmd min-w-vmd max-w-vmd', px: SIZES['vmd']};
      case 'vlg':
        return {class: isHeight ? 'h-vlg min-h-vlg max-h-vlg' : 'w-vlg min-w-vlg max-w-vlg', px: SIZES['vlg']};
      case 'vxl':
        return {class: isHeight ? 'h-vxl min-h-vxl max-h-vxl' : 'w-vxl min-w-vxl max-w-vxl', px: SIZES['vxl']};
      case 'v2xl':
        return {class: isHeight ? 'h-vxl min-h-v2xl max-h-v2xl' : 'w-vxl min-w-v2xl max-w-v2xl', px: SIZES['v2xl']};
      case 'full':
        return {class: isHeight ? 'h-full min-h-full max-h-full' : 'w-full min-w-full max-w-full', px: '100%'};
      default:
        return {class: isHeight ? 'h-vsm min-h-vsm max-h-vsm' : 'w-vsm min-w-vsm max-w-vsm', px: SIZES['vsm']};
    }
  }
  
  const DivContainer: React.FC<{children?:any, className?:string}> = ({children, className}) => {
    return (
      <div className={classNames(className)} 
      style={{
        maxHeight: !showBorderTop ? 'h-full' : heightSize === 'full' ? '99.8%' : `${(getSizeClass(heightSize, true).px - 25)}px`
      }}>
        {children}
      </div>
    )
  }

  const borderComponent = ({children}) => (<DivContainer className={
    classNames('flex flex-col space-y-2 justify-start items-start w-full h-full p-2 m-2 rounded-[10px]',
    roundedButtom ? '' : 'rounded-b-none',
    roundedTop ? '' : 'rounded-t-none',
    roundedLeft ? '' : 'rounded-l-none',
    roundedRight ? '' : 'rounded-r-none',
    showBorder ? 'border-[1px] dark:border-true-dark-300 border-true-light-300' : '',
    showBorderBottom ? '' : 'border-b-[0px]',
    showBorderLeft ? '' : 'border-l-[0px]',
    showBorderRight ? '' : 'border-r-[0px]',
    showBorderTop ? '' : 'border-t-[0px] pt-0 -mt-3')}>
    {children}
  </DivContainer>);

  return (
    <div className={classNames('prose flex flex-col justify-center mx-auto items-center', dropShadow ? 'dark:shadow-dark shadow-light' : '',
      getSizeClass(widthSize).class,
      getSizeClass(heightSize, true).class, className)}>
      <div className={classNames('flex justify-center mx-auto items-center rounded-[10px]', 
      roundedButtom ? '' : 'rounded-b-none',
      roundedTop ? '' : 'rounded-t-none',
      roundedLeft ? '' : 'rounded-l-none',
      roundedRight ? '' : 'rounded-r-none',
      'w-full h-full',
          showBorder ? 'border-[2px] dark:border-true-dark-300 border-true-light-300' : 'dark:bg-true-dark-300 bg-true-light-300',
          showBorderBottom ? '' : 'border-b-[0px]',
          showBorderLeft ? '' : 'border-l-[0px]',
          showBorderRight ? '' : 'border-r-[0px]',
          showBorderTop ? '' : 'border-t-[0px]',
        )}>
        {showBorder ? borderComponent({children}): <div className='flex flex-col space-y-2 justify-center items-start w-full h-full rounded-[10px]'>{children}</div>}
        
      </div>
    </div>
  )
}