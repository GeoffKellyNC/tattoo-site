export interface ContactDetailFull {
    public: boolean;
    value: string | null;
}



export interface UserFullProfile {
    _id: string;
    unxid: string;
    first_name: string;
    last_name: string;
    user_name: string;
    display_name: string;
    user_email: string;
    password: string;
    googleId: string | null;
    created_date: string;
    account_type: string;
    isAdmin: boolean;
    isMod: boolean;
    isArtist: boolean;
    isClient: boolean;
    session_token: string;
    account_status: string;
    online_status: string;
    attr1: string | null;
    attr2: string | null;
    attr3: string | null;
    attr4: string | null;
    attr5: string | null;
    attr6: string | null;
    attr7: string | null;
    attr8: string | null;
    user_unxid: string;
    location_city: string;
    location_state: string;
    location_zip: string;
    profile_tagline: string;
    profile_description: string;
    number_of_tattoos: string;
    tattoo_style_preferences: string | null;
    preferred_size_range: string | null;
    allergies_or_skin_conditions: string | null;
    personal_tattoo_story: string;
    contact_phone: ContactDetailFull;
    contact_instagram: ContactDetailFull;
    contact_snapchat: ContactDetailFull;
    contact_x: ContactDetailFull;
    contact_discord: ContactDetailFull;
    contact_website: ContactDetailFull;
    other_1: ContactDetailFull;
    other_2: ContactDetailFull;
    profileImageUrl: string;
}

export interface UserFullProfileAction {
    type: string;
    payload: UserFullProfile;
}
