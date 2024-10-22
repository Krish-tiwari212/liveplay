-- Create 'users' table (shared between participants and organizers)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- Unique ID for each user
  full_name TEXT NOT NULL, -- Full name of the user
  email TEXT UNIQUE NOT NULL, -- Email address (must be unique)
  password_hash TEXT NOT NULL, -- Hashed password for authentication
  contact_number TEXT, -- Contact number of the user
  role TEXT CHECK (role IN ('participant', 'organizer')) NOT NULL, -- Role: 'participant' or 'organizer'
  city TEXT, -- City where the user resides
  pincode TEXT, -- Postal code
  created_at TIMESTAMP DEFAULT NOW(), -- Timestamp when user was created
  updated_at TIMESTAMP DEFAULT NOW() -- Timestamp when user was last updated
);

-- Create 'organizer_details' table (specific to organizers)
CREATE TABLE organizer_details (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, -- Link to 'users' table
  pan TEXT, -- PAN number (for tax purposes)
  aadhar_front TEXT, -- Path to Aadhar front image
  aadhar_back TEXT, -- Path to Aadhar back image
  bank_name TEXT, -- Name of the bank
  account_number TEXT, -- Organizer's bank account number
  ifsc_code TEXT, -- IFSC code of the bank
  created_at TIMESTAMP DEFAULT NOW(), -- Timestamp when record was created
  updated_at TIMESTAMP DEFAULT NOW() -- Timestamp when record was last updated
);

-- Create 'events' table (tracks event details)
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- Unique ID for each event
  organizer_id UUID REFERENCES users(id) ON DELETE SET NULL, -- Organizer ID (must reference 'users' table where role is 'organizer')
  event_name TEXT NOT NULL, -- Name of the event
  event_date DATE NOT NULL, -- Date of the event
  location TEXT, -- Event location
  description TEXT, -- Description of the event
  created_at TIMESTAMP DEFAULT NOW(), -- Timestamp when event was created
  updated_at TIMESTAMP DEFAULT NOW() -- Timestamp when event was last updated
);

-- Create 'event_entries' table (tracks participant registrations for events)
CREATE TABLE event_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- Unique ID for each registration
  event_id UUID REFERENCES events(id) ON DELETE CASCADE, -- Reference to the 'events' table
  participant_id UUID REFERENCES users(id) ON DELETE CASCADE, -- Reference to 'users' table where role is 'participant'
  registration_date TIMESTAMP DEFAULT NOW(), -- Timestamp when participant registered
  status TEXT CHECK (status IN ('registered', 'withdrawn')) NOT NULL DEFAULT 'registered', -- Status of the registration
  created_at TIMESTAMP DEFAULT NOW(), -- Timestamp when the registration was created
  updated_at TIMESTAMP DEFAULT NOW() -- Timestamp when the registration was last updated
);

-- Create 'event_boosters' table (for paid features like Pro and Elite plans)
CREATE TABLE event_boosters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- Unique ID for each booster
  event_id UUID REFERENCES events(id) ON DELETE CASCADE, -- Reference to the 'events' table
  booster_type TEXT CHECK (booster_type IN ('Pro', 'Elite')) NOT NULL, -- Booster type (Pro or Elite)
  featured_listing BOOLEAN DEFAULT FALSE, -- Whether the event has a featured listing
  verified_badge BOOLEAN DEFAULT FALSE, -- Whether the event has a verified badge
  live_match_tracker BOOLEAN DEFAULT FALSE, -- Whether the live match progress tracker is enabled
  date_edits_allowed INT DEFAULT 0, -- Number of date edits allowed
  cancellation_fee DECIMAL(5, 2), -- Cancellation fee (in percentage)
  payout_time TEXT, -- Payout time description (e.g., '3-5 Days' for Pro, '24 Hours' for Elite)
  smart_support BOOLEAN DEFAULT FALSE, -- Whether the event has smart support enabled
  created_at TIMESTAMP DEFAULT NOW(), -- Timestamp when the booster was created
  updated_at TIMESTAMP DEFAULT NOW() -- Timestamp when the booster was last updated
);

-- Create 'event_reports' table (for tracking key event metrics like sales, views)
CREATE TABLE event_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- Unique ID for each report
  event_id UUID REFERENCES events(id) ON DELETE CASCADE, -- Reference to the 'events' table
  total_sales DECIMAL(10, 2), -- Total sales or entry fees collected
  total_entries INT, -- Total number of participants/entries
  interested_count INT, -- Number of people who expressed interest in the event
  page_views INT, -- Number of page views for the event
  withdrawals_count INT, -- Number of participants who withdrew from the event
  created_at TIMESTAMP DEFAULT NOW(), -- Timestamp when the report was created
  updated_at TIMESTAMP DEFAULT NOW() -- Timestamp when the report was last updated
);

-- Create 'payments' table (tracks all payments made by organizers)
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- Unique ID for each payment
  organizer_id UUID REFERENCES users(id) ON DELETE SET NULL, -- Reference to 'users' table (organizer)
  event_id UUID REFERENCES events(id) ON DELETE SET NULL, -- Reference to 'events' table
  amount DECIMAL(10, 2) NOT NULL, -- Payment amount
  currency TEXT DEFAULT 'INR', -- Currency used (default: INR)
  payment_status TEXT CHECK (payment_status IN ('pending', 'completed', 'failed')) NOT NULL DEFAULT 'pending', -- Status of the payment
  payment_method TEXT CHECK (payment_method IN ('credit_card', 'debit_card', 'net_banking', 'upi', 'wallet')) NOT NULL, -- Payment method used
  transaction_id TEXT UNIQUE, -- Unique transaction ID returned by the payment gateway
  payment_date TIMESTAMP DEFAULT NOW(), -- Timestamp when the payment was made
  created_at TIMESTAMP DEFAULT NOW(), -- Timestamp when the payment record was created
  updated_at TIMESTAMP DEFAULT NOW() -- Timestamp when the payment record was last updated
);

-- Create 'payouts' table (tracks payouts made to organizers after event completion)
CREATE TABLE payouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- Unique ID for each payout
  organizer_id UUID REFERENCES users(id) ON DELETE SET NULL, -- Reference to 'users' table (organizer)
  event_id UUID REFERENCES events(id) ON DELETE SET NULL, -- Reference to 'events' table
  payout_amount DECIMAL(10, 2) NOT NULL, -- Payout amount
  payout_status TEXT CHECK (payout_status IN ('pending', 'completed')) NOT NULL DEFAULT 'pending', -- Status of the payout
  payout_date TIMESTAMP, -- Date when payout was made
  created_at TIMESTAMP DEFAULT NOW(), -- Timestamp when the payout record was created
  updated_at TIMESTAMP DEFAULT NOW() -- Timestamp when the payout record was last updated
);
