import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
    Dialog, 
    DialogTrigger, 
    DialogContent,
    DialogTitle, 
    DialogDescription, 
    DialogHeader,
    DialogFooter, 
    DialogClose
 } from './ui/dialog';
 import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IoEnterOutline } from 'react-icons/io5';

const JoinTeamDialog = ({ userId }) => {
  const [teamCode, setTeamCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/event/join_team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ team_code: teamCode, user_id: userId }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Successfully joined the team!');
        window.location.reload(); // Reload the page on success
      } else {
        setError(data.error || 'Failed to join the team');
      }
    } catch (err) {
      setError('Failed to join the team');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="tertiary" size="xs" className="text-sm sm:text-md">
          Enter Pair / Team Code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md h-auto">
        <AlertDialogHeader>
          <DialogTitle>Enter Code</DialogTitle>
          <DialogDescription>
            Please Enter Team Code to Join the Team
          </DialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="team_code" className="sr-only">
              Enter Code
            </Label>
            <Input
              id="team_code"
              value={teamCode}
              onChange={(e) => setTeamCode(e.target.value)}
            />
          </div>
          <Button type="button" size="sm" className="px-3" onClick={handleSubmit}>
            <span className="sr-only">Proceed</span>
            <IoEnterOutline />
          </Button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JoinTeamDialog;