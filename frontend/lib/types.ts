export interface User {
    id: string;
    full_name: string;
    email: string;
    contact_number: string;
    role: 'participant' | 'organizer';
    city: string;
    pincode: string;
}
  
export interface OrganizerDetails {
    user_id: string;
    pan: string;
    aadhar_front: string;
    aadhar_back: string;
    bank_name: string;
    account_number: string;
    ifsc_code: string;
}
  