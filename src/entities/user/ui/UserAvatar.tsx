"use client"

import { User } from "@/entities/user/types/user"

interface Props {
  user: User;
  size: number;
}

const UserAvatar = ({ user, size }: Props) => {
  return (
    <img src={user.avatar} alt="avatar" style={{ width: size, height: size }} className="rounded-full object-cover" />
  )
}

export default UserAvatar