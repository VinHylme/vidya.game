import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { classNames } from '@/common/helpers'
import { blockNames } from '../blockNames'
import { bgColors } from '../Shared/colors';
import Columns from '../Layout/Columns';
import Section, {Border} from '../Layout/Section';
import { LayoutProp } from '../Shared/LayoutProps';
import { Gap, NumColumns, Padding } from '../Shared/additional';

//=============================
// Local Types
//=============================
type TextPosition = 'left' | 'right'
type TextPositions = 'left' | 'center' | 'right'
type ImageSizes = 'small' | 'medium' | 'large'
type FontFamily = 'sans-serif' | 'serif' | 'mono' | 'thin' | 'Saira SemiCondensed' | 'Nunito' | 'roboto' | 'poppins'

interface CallHeroUnitProps {
  paddingX?: Padding
  paddingY?: Padding
  badgeText?: string
  propName?: string
  className?: string
  fontFamily?: FontFamily
  background?: boolean
  image?: string
  title?: string
  text?: string
  gap: Gap
  bg?: { color: string; className: string }
  columns?: NumColumns
  borderTop?: Border
  borderBottom?: Border
}

const CallHeroColumn: types.Brick<CallHeroUnitProps> = ({ propName, gap, bg, borderTop, borderBottom, paddingX, paddingY, background, className }) => {
  return (
    <Section className={className} bg={bg} borderTop={borderTop} borderBottom={borderBottom}>
       <Repeater propName={propName || 'columns'} renderItemWrapper={(item, index) => {
          return (
            <div style={{zIndex: 100}} key={index}>
              {item}
            </div>
          )
       }} itemProps={{overrideTextColor: background === true}} renderWrapper={(items) => {
          return (
            <Columns gap={gap} cols={items?.props?.children?.length} className={classNames("text-true-light-100 items-start", 's-items-end', background ? 'bg-primary-100 w-full rounded-xl my-auto mx-auto  right-0 left-0 z-0' : '')} paddingX={paddingX} paddingY={paddingY}>
              {/* {background && <div className='bg-primary-100 w-full rounded-xl my-auto mx-auto right-0 left-0 z-0' >{items}</div>} */}
              {items}
            </Columns>
          )
        }}>
      </Repeater>
    </Section>
  )
}

CallHeroColumn.schema = {
  name: blockNames.CallHeroText,
  label: 'Call Hero Columns Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    gap: 'lg',
    paddingX: 'lg',
    paddingY: 'lg',
    columns: [
      {
        items: [
          {
            type: blockNames.Button,
            name: `btn_0`,
            show: true,
            order: 0,
            inline: false,
            itemProp: {},
          }
        ],
        size: 'sm',
        type: 'h2',
      }
    ],
    bg: {
      color: '#',
      className: 'bg-gray-100 dark:bg-true-dark-200 bg-true-light-200',
    },
    borderTop: 'none',
    borderBottom: 'none',
    headerButtons: [
      {
        children: 'Button 1',
      }
    ],
    badgeLabels: [
      {
        label: 'programs',
      }
    ],
    background: false,
  }),
  repeaterItems: [
    {
      name: 'columns',
      itemType: blockNames.Column,
      itemLabel: 'Column',
      min: 1,
      max: 4 
    },
  ],
  sideEditProps: [
    LayoutProp({ colors: [bgColors.none, bgColors.dark, bgColors.light, bgColors.gray] }),
    {
      name: 'background',
      label: 'Background',
      type: types.SideEditPropType.Boolean,
    },
    {
      name: 'gap',
      label: 'Gap',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Select,
        options: [
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
        ]
      }
    },
    {
      name: 'paddingX',
      label: 'Padding X',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Select,
        options: [
          { value: 'xxl', label: 'XX Large Padding'},
          { value: 'xl', label: 'X Large Padding' },
          { value: 'lg', label: 'Big Padding' },
          { value: 'sm', label: 'Small Padding' },
          { value: 'none', label: 'None' },
        ],
      },
    },
    {
      name: 'paddingY',
      label: 'Padding Y',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Select,
        options: [
          { value: 'xxl', label: 'XX Large Padding'},
          { value: 'xlg', label: 'X Large Padding' },
          { value: 'lg', label: 'Big Padding' },
          { value: 'sm', label: 'Small Padding' },
          { value: 'none', label: 'None' },
        ],
      },
    },
  ],
}

export default CallHeroColumn
