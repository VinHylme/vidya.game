import React from 'react'
import { types } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { bgColors } from '../Shared/colors';
import Section, {Border} from '../Layout/Section';
import { LayoutProp } from '../Shared/LayoutProps';
import { Padding } from '../Shared/additional';
import { ProgramListSection } from '@/components/organisms/programListSection';

interface IProgramListUnit {
  maxItems?: number
  bg?: { color: string; className: string }
  borderTop?: Border
  borderBottom?: Border
  paddingX?: Padding
  paddingY?: Padding
}

const ProgramListUnit: types.Brick<IProgramListUnit> = ({ bg, borderTop, borderBottom, maxItems, paddingX, paddingY }) => {
  return (
    <Section bg={bg} borderTop={borderTop} borderBottom={borderBottom} paddingX={paddingX} paddingY={paddingY} className='py-14 flex flex-col space-x-2 space-y-3 flex-wrap justify-center items-center max-w-page'>
      <ProgramListSection limit={maxItems}/>
    </Section>
  )
}

ProgramListUnit.schema = {
  name: blockNames.ProgramListUnit,
  label: 'Program List Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    bg: {
      color: '#',
      className: 'bg-gray-100 dark:bg-dark-200 bg-light-200',
    },
    borderTop: 'none',
    borderBottom: 'none',
    maxItems: 3,
  }),
  sideEditProps: [
    LayoutProp({ colors: [bgColors.none, bgColors.dark, bgColors.light, bgColors.gray] }),
    {
      name: 'maxItems',
      label: 'Max Items',
      type: types.SideEditPropType.Number,
    }
  ],
}

export default ProgramListUnit
