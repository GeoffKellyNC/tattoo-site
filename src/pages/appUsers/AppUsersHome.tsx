import React from 'react'

import UsersList from './UsersList'

const AppUsersHome: React.FC = () => {
  return (
    <div>
        <div className = 'header'>
            <h1>Users</h1>
        </div>
        <UsersList />
    </div>
  )
}

export default AppUsersHome