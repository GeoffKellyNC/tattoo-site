
export interface UserJobType {
    job_id: string;
    owner_id: string;
    owner_user_name: string;
    job_created_date: Date;
    job_title: string;
    job_desc: string;
    job_photos: string[];  
    job_characteristics: { [key: string]: string | number }; 
    job_location: string;
    job_zipcode: string;
    job_budget: number | null
    artist_preference: string[]; 
    job_status: 'open' | 'in-progress' | 'completed' | 'closed'; 
    selected_artist_id: string | null;
    job_expiry_date: Date | null;
    job_reviews: string[]; 
    is_active: boolean;
    is_deleted: boolean;
    date_deleted: Date | null;
}

export interface UserJobActionType {
    type: string;
    payload: UserJobType;
}

export interface JobBidType {
    job_id: string,
    artist_id: string,
    job_owner_id: string,
    proposed_price: string,
    proposded_date: string | Date,
    timestamp: string | Date,
    artist_comments: string,
    attr1: string,
    attr2: string,
    attr3: string,
    attr4: string,
    attr5: string,
    attr6: string,
    attr7: string,
    attr8: string
}
