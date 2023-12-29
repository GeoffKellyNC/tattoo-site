import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/root.reducer';
import { UserJobType, JobBidType } from '../../store/jobs/ts-types/jobTypes';
import { fetchJobs } from '../../api/fetchJobsPage';
import ArtistJobListTitle from './components/ArtistJobListTitle';
import ActiveJobListing from './ActiveJobListing';
// import * as jobActions from '../../store/jobs/jobs.actions'
import styled from 'styled-components'

interface Props {
  // allActiveJobs: UserJobType[];
  // getAllActiveJobs: () => Promise<void>;
  artistCurrentBids: JobBidType[];
  accountType: string;
  userCurrentCords: { lat: number; lng: number };
}

const ArtistViewActiveJob: React.FC<Props> = ({
  artistCurrentBids,
  accountType,
  userCurrentCords,
}) => {
  const [jobs, setJobs] = useState<UserJobType[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchType, setSearchType] = useState('distance');
  // const [textSearchValue, setTextSearchValue] = useState('');
  const [searchRadius, setSearchRadius] = useState('25'); // This is in miles
  

  useEffect(() => {
    const loadJobs = async () => {
      console.log('Loading jobs...') //! REMOVE
      setIsLoading(true);
      try {
        const { lat, lng } = userCurrentCords;
        const fetchedJobs = await fetchJobs(page, 10, lat, lng, searchRadius);
        const uniqueJobs = fetchedJobs.filter(job => !jobs.some(j => j.job_id === job.job_id));
        setJobs(prevJobs => [...prevJobs, ...uniqueJobs]);
        console.log('Unique jobs: ', uniqueJobs); //! REMOVE
        console.log('Jobs: ', jobs); //! REMOVE

        if (fetchedJobs.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching jobs: ', error);
      }

      setIsLoading(false);
    };

    loadJobs();
  }, [page, searchRadius, userCurrentCords]);

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
  }, [hasMore, isLoading]);

  useEffect(() => {
    const loadJobsOnRadiusChange = async () => {
      setPage(1);
      setJobs([]);
      setIsLoading(true);

      try {
        const { lat, lng } = userCurrentCords;
        const fetchedJobs = await fetchJobs(1, 10, lat, lng, searchRadius);
        setJobs(fetchedJobs);
        setHasMore(fetchedJobs.length > 0);
      } catch (error) {
        console.error('Error fetching jobs on radius change: ', error);
      }

      setIsLoading(false);
    };

    loadJobsOnRadiusChange();
  }, [searchRadius, userCurrentCords]);


  return (
    <StyledActiveJobs>
      <ArtistJobListTitle />

      <SearchContainer>
        <select 
          value={searchType}
          onChange={e => setSearchType(e.target.value)}
        >
          <option value='distance'>Distance</option>
        </select>
        {searchType === 'distance' && (
          <select 
            value={searchRadius}
            onChange={e => setSearchRadius(e.target.value)}
          >
            <option value='10'>10 miles</option>
            <option value='25'>25 miles</option>
            <option value='50'>50 miles</option>
            <option value='100'>100 miles</option>
            <option value = '250'> 250 miles </option>
            <option value= '5000'> All Jobs </option>
          </select>
        )}
      </SearchContainer>

      <JobsContainer>
        {jobs.map((job, idx) => (
          <ActiveJobListing 
            key={idx} 
            job={job} 
            artistCurrentBids={artistCurrentBids} 
            accountType={accountType} 
          />
        ))}
        {isLoading && <div>Loading...</div>}
        {!isLoading && jobs.length === 0 && <div>No jobs found</div>}
      </JobsContainer>
      {!hasMore && (
        <span className='no-more-jobs'>No more jobs to load</span>
      )}
    </StyledActiveJobs>
  );
};

const mapStateToProps = (st: RootState) => ({
  // allActiveJobs: st.allActiveJobs,
  artistCurrentBids: st.artistCurrentBids,
  accountType: st.accountType,
  userCurrentCords: st.userCurrentCords,
});

const ConnectedArtistViewActiveJob = connect(mapStateToProps, {
  // getAllActiveJobs: jobActions.getAllActiveJobs
})(ArtistViewActiveJob);

export default ConnectedArtistViewActiveJob;


const StyledActiveJobs = styled.div`
  color: white;

  .no-more-jobs {
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
    font-family: ${pr => pr.theme.font.family.secondary};
    margin: 2rem auto; // Adjusted for better centering
    position: relative;
    left: 36%;
  }
`;

const JobsContainer = styled.div`
  width: 80%;
  margin: 2rem auto; // Adjusted margin
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem; 

  @media (min-width: 1025px) { 
    flex-direction: row; // Row direction for larger screens
    justify-content: flex-start; // Space out items on larger screens
    gap: 3rem; // Adjusted gap
    flex-wrap: wrap; // Wrap items on larger screens
  }
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 3rem; // Adjusted gap
  margin-left: 12rem; // Adjusted margin

  select {
    font-size: 1rem; // Adjusted font size
    border: none;
    border-radius: 5px;
    padding: 0.5rem;
    background-color: #f55963;
    width: 10rem; // Adjusted width
    color: white;
  }

  @media (max-width: 1025px) { 
    flex-direction: row; // Row direction for larger screens
    justify-content: space-around; // Space out elements on larger screens
    margin-left: 0; // Adjusted margin
  }
`;

