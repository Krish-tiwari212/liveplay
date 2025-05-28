import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { useRouter } from 'next/router';
import { createClient } from '@/utils/supabase/client';

const RegistrationModal = ({ isRegistrationModalOpen, setIsRegistrationModalOpen, participantId, eventId, setIsEventPassOpen }) => {
  const [registeredCategories, setRegisteredCategories] = useState([]);
  const [teamDetails, setTeamDetails] = useState(null);
  const [isLeader, setIsLeader] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchCategoriesAndTeamDetails = async () => {
      const { data: participantData, error: participantError } = await supabase
        .from('Participants')
        .select('*')
        .eq('id', participantId)
        .single();

      if (participantError) {
        console.error(participantError);
        return;
      }

      const { data: categoriesData, error: categoriesError } = await supabase
        .from('EventCategories')
        .select('*')
        .eq('event_id', eventId);

      if (categoriesError) {
        console.error(categoriesError);
        return;
      }

      setRegisteredCategories(categoriesData);

      if (participantData.team_id) {
        const { data: teamData, error: teamError } = await supabase
          .from('Teams')
          .select('*')
          .eq('id', participantData.team_id)
          .single();

        if (teamError) {
          console.error(teamError);
          return;
        }

        setTeamDetails(teamData);
        setIsLeader(teamData.participant_ids[0] === participantId); // Assuming the first participant is the leader
      }
    };

    if (isRegistrationModalOpen) {
      fetchCategoriesAndTeamDetails();
    }
  }, [isRegistrationModalOpen, participantId, eventId]);

  const handleWithdrawFromCategory = async (categoryName) => {
    try {
      // Fetch the category ID based on the category name
      const { data: categoryData, error: categoryError } = await supabase
        .from('EventCategories')
        .select('id')
        .eq('category_name', categoryName)
        .single();
  
      if (categoryError) {
        console.error(categoryError);
        return;
      }
  
      const categoryId = categoryData.id;
  
      // Update the participant's record to remove the category
      const { error: updateError } = await supabase
        .from('Participants')
        .update({ category_id: null })
        .eq('id', participantId)
        .eq('category_id', categoryId);
  
      if (updateError) {
        console.error(updateError);
        return;
      }
    } catch (error) {
      console.error('Error withdrawing from category:', error);
    }
  };
  
  const handleRemoveTeamMember = async (memberId) => {
    try {
      // Fetch the current team details
      const { data: teamData, error: teamError } = await supabase
        .from('Teams')
        .select('participant_ids')
        .eq('id', teamDetails.id)
        .single();
  
      if (teamError) {
        console.error(teamError);
        return;
      }
  
      const updatedParticipantIds = teamData.participant_ids.filter(id => id !== memberId);
  
      // Update the team record to remove the specified member
      const { error: updateError } = await supabase
        .from('Teams')
        .update({ participant_ids: updatedParticipantIds })
        .eq('id', teamDetails.id);
  
      if (updateError) {
        console.error(updateError);
        return;
      }

    } catch (error) {
      console.error('Error removing team member:', error);
    }
  };

  return (
    <Dialog open={isRegistrationModalOpen} onOpenChange={setIsRegistrationModalOpen}>
      <DialogTrigger asChild>
        <Button className="hidden">Open</Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] sm:max-w-2xl p-4 flex flex-col justify-between h-auto">
        <DialogHeader>
          <EventDetails />
          <DialogTitle className="text-lg font-semibold flex justify-between">
            <h1>My Registered Categories</h1>
            <Button size="xs" onClick={() => setIsEventPassOpen(true)}>
              Event Pass
            </Button>
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Below are the categories you have registered for this event.
          </DialogDescription>

          <div className="space-y-4">
            {registeredCategories.map((category) => (
              <div className="flex justify-between gap-2" key={category.id}>
                <div className="flex flex-col p-2 border rounded-md shadow-sm w-full">
                  <span className="font-medium">
                    {category.category_name} - Rs. {category.price}
                  </span>
                </div>
                {isLeader && (
                  <Button
                    className="px-3 py-1 text-sm"
                    onClick={() => handleWithdrawFromCategory(category.category_name)}
                  >
                    Withdraw
                  </Button>
                )}
              </div>
            ))}
          </div>

          {teamDetails && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Team Members</h2>
              <div className="space-y-2">
                {teamDetails.participant_ids.map((memberId) => (
                  <div className="flex justify-between gap-2" key={memberId}>
                    <span>{memberId}</span> {/* Replace with actual member name if available */}
                    {isLeader && (
                      <Button
                        className="px-3 py-1 text-sm"
                        onClick={() => handleRemoveTeamMember(memberId)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogHeader>
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setIsRegistrationModalOpen(false)}>
            Close
          </Button>
          <Button className="px-4 py-2 rounded" onClick={() => router.push("/cart")}>
            Register for More Categories
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationModal;