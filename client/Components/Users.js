import React from 'react';

const Users = ({ users }) => {
    return (
        <div>
            <h2>Users ({users.length})</h2>
            <ul>
                {
                    users.map(user => {
                        return (
                            <li key={user.id} >
                                {user.name}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Users;