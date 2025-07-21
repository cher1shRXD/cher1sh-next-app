import { fetchUser } from '@/entities/user/api/user'
import UserAvatar from '@/entities/user/ui/UserAvatar';
import CustomLink from '@/shared/ui/CustomLink'
import React from 'react'

const Main = async () => {
  const user = await fetchUser();

  if(!user.username) return (
    <div className='w-full flex flex-col gap-2'>
      <CustomLink href='/login' className='text-blue-500'>로그인</CustomLink>
      <CustomLink href='/signup' className='text-blue-500'>회원가입</CustomLink>
    </div>
  )

  return (
    <div>
      <UserAvatar user={user} size={50} />
      <p>{user.username}</p>
    </div>
  )
}

export default Main