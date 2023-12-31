import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../../api/fetchUsersPage'; 
import { UserFullProfile } from '../../store/user/types/userStateTypes';
import { connect } from 'react-redux';
import { RootState } from '../../store/root.reducer';

import UserComponent from './UserComponent'
import styled from 'styled-components';

interface Props {
    userCurrentCords: {
        lat: number,
        lng: number
    }
}

const UsersList: React.FC<Props> = ({
    userCurrentCords
}) => {
    const [users, setUsers] = useState<UserFullProfile[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const loadUsers = async () => {
            setIsLoading(true);

            try {
                const fetchedUsers = await fetchUsers(page, 10, userCurrentCords);
                console.log('fetchedUsers: ', fetchedUsers) //!REMOVE
                setUsers(prevUsers => [...prevUsers, ...fetchedUsers]);

                // If no users are returned, set hasMore to false
                if (fetchedUsers.length === 0) {
                    setHasMore(false);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }

            setIsLoading(false);
        };

        loadUsers();
    }, [page, userCurrentCords]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 500) {
                if (!isLoading && hasMore) {
                    setPage(prevPage => prevPage + 1);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isLoading, hasMore]);

    return (
        <UserContainer>
            {users.map(user => (
              <UserComponent key={user.unxid} user={user} />
            ))}
            {isLoading && <div>Loading...</div>}
            {!hasMore && <div>No more users in your current location </div>}
        </UserContainer>
    );
}

const mapStateToProps = (state: RootState) => ({
    userCurrentCords: state.userCurrentCords
})

const ConnectedUserList = connect(mapStateToProps, null)(UsersList)

export default ConnectedUserList;


const UserContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr); // default to 4 profiles in a row
    gap: 1rem;
    padding: 1rem;
    width: 100%; 
    border-bottom: 1px solid ${pr => pr.theme.color.lightGray};

    @media (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr); // 3 profiles in a row for screens smaller than 1200px
    }

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr); // 2 profiles in a row for screens smaller than 900px
    }

    @media (max-width: 600px) {
        grid-template-columns: repeat(1, 1fr); // 1 profile in a row (i.e., a column) for screens smaller than 600px
    }
`;
