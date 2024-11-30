"use client";

import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { toast } from "@/hooks/use-toast";
import CardCarousel from '@/components/CardCarousel';
import EventPageLeftContnt from '@/components/EventPageLeftContnt';
import EventPageRightContent from '@/components/EventPageRightContent';

interface EventCategory {
  id: number;
  event_id: string;
  category_name: string;
  total_quantity: number;
  max_ticket_quantity: number;
  price: number;
  ticket_description: string;
  discount_code: string;
  category_type: string;
  number_of_discounts: number;
  percentage_input: number;
  from_date: string;
  till_date: string;
  discount_value: number;
  amount_input: number;
  max_age: number;
  min_age: number;
  gender: string;
  has_discount: boolean;
  discount_type: string;
  discount_start_date: string;
  discount_end_date: string;
  age_range_option: string;
}

interface EventDetails {
  id: string;
  event_name: string;
  organizer_contact_number: string;
  organizer_email: string;
  start_date: string;
  end_date: string;
  last_registration_date: string;
  last_withdrawal_date: string;
  venue_name: string;
  street_address: string;
  additional_details: string;
  city: string;
  pincode: string;
  venue_not_decided: boolean;
  map_view: string;
  event_description: string;
  event_usp: string;
  rewards_for_participants: string;
  playing_rules: string;
  desktop_cover_image_url: string;
  mobile_cover_image_url: string;
  start_time: string;
  countdown: boolean;
  enable_fixtures: boolean;
  sport: string;
  venue_link: string;
  selected_plan: string;
  organizer_id: string;
  website_link: string;
  insta_link: string;
  state: string;
  cash_price_pool: string;
  want_tshirts: boolean;
  show_qna: boolean;
  gst_compliance: boolean;
  status: string;
  organizer_name: string;
  categories: EventCategory[];
}

const EventPageLoader = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
);

const EventPage = ({ eventId }: { eventId: string }) => {
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!eventId) {
        setIsLoading(false);
        toast({
          title: "Error",
          description: "No event ID provided",
          variant: "destructive",
        });
        return;
      }

      try {
        const response = await fetch(`/api/event/get_by_id/${eventId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }

        const data = await response.json();

        if (!data || !data.id) {
          console.error('Invalid API response:', data);
          throw new Error('Invalid event data received');
        }

        setEventDetails(data); // Set the data directly
      } catch (error: any) {
        console.error('Error fetching event details:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to load event details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (isLoading) {
    return <EventPageLoader />;
  }

  if (!eventId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Image
          src="/images/error.svg"
          alt="Error"
          width={300}
          height={300}
        />
        <h2 className="text-2xl font-bold mt-4">Invalid Request</h2>
        <p className="text-gray-600 mt-2">No event ID was provided in the URL.</p>
        <Button 
          variant="tertiary"
          className="mt-4"
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </div>
    );
  }

  if (!eventDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Image
          src="/images/not-found.svg"
          alt="Event not found"
          width={300}
          height={300}
        />
        <h2 className="text-2xl font-bold mt-4">Event Not Found</h2>
        <p className="text-gray-600 mt-2">The event you're looking for doesn't exist or has been removed.</p>
        <Button 
          variant="tertiary"
          className="mt-4"
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto p-5">
      <div className="flex flex-col lg:flex-row gap-4">
        <EventPageLeftContnt eventDetails={eventDetails} />
        <EventPageRightContent eventDetails={eventDetails} />
      </div>
      <CardCarousel />
    </div>
  );
};

export default function EventPageWrapper() {
  return (
    <Suspense fallback={<EventPageLoader />}>
      <EventPageContent />
    </Suspense>
  );
}

function EventPageContent() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('event_id');

  return <EventPage eventId={eventId || ''} />;
}
