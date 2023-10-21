import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../../api/fetchUsersPage'; 
import styled from 'styled-components';

import UserComponent from './UserComponent'



interface User {
    unxid: string;
    display_name: string;
    user_email: string;
    account_type: string;
    online_status: string;
    _id: { $oid: string };
    first_name: string;
    last_name: string;
    user_name: string;
    profileImageUrl: string;
    profile_tagline: string;
    contact_discord: {
        public: boolean;
        username: string;
    };
    contact_instagram: {
        public: boolean;
        username: string;
    };
    contact_snapchat: {
        public: boolean;
        username: string;
    };
    contact_x: {
        public: boolean;
        username: string;
    };
    contact_website: {
        public: boolean;
        username: string;
    };
    location_city: string;
    location_state: string;
}

const UsersList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const loadUsers = async () => {
            setIsLoading(true);

            try {
                const fetchedUsers = await fetchUsers(page);
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
    }, [page]);

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
        <UsersContainer>
            {users.map(user => (
                <UserComponent key={user.unxid} user={user} />
            ))}
            {isLoading && <LoadingContainer>Loading...</LoadingContainer>}
            {!hasMore && <EndContainer>No more users to fetch.</EndContainer>}
        </UsersContainer>
    );
}

export default UsersList;



const UsersContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-between;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const LoadingContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 1rem 0;
`;

const EndContainer = styled(LoadingContainer)`
    color: ${props => props.theme.color.gray};
`;