import { getPageUrlByType } from '@/common/helpers';
import { useFetchPages } from 'hooks/useFetchPages';
import React, { useEffect } from 'react';
import { BlogCard } from '../molecules/BlogCard';

export interface IBlogListSectionProps {
  fetchAmount?: number; 
}

export const BlogListSection: React.FC<IBlogListSectionProps> = ({fetchAmount=3}) => {
  const {data, isLoading, error} = useFetchPages({type: 'post', limit: fetchAmount});
  
  if(isLoading) {
    return <div>Loading...</div>
  }

  if(error) {
    return <div>Error...</div>
  }

  return (
    <div className='w-full'>
      <div className='w-full h-full flex flex-wrap gap-x-4 py-12'>
        {(data || []).map((post, index) => {
          return (
            <BlogCard url={getPageUrlByType(post.type, post.slug)} 
            avatar={post.author.avatarUrl} 
            key={index} 
            image={post.meta?.featuredImage} 
            title={post.meta.title} 
            label={post.customValues?.label} 
            subtitle={post.meta.description} 
            footer={post.publishedAt ? `${post.author.firstName} - ${new Date(post.publishedAt).toLocaleTimeString("en-US", {weekday: 'long', year: 'numeric', month: 'long', day:'numeric'})}` : ''} />
          )
        })}
      </div>
    </div>
  )
}