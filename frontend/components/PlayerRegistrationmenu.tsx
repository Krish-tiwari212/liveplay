import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BsSearch } from 'react-icons/bs';
import { TiArrowUnsorted } from 'react-icons/ti';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from 'next/navigation';


const players: Player[] = [
  { id: 1, name: "Om Prakash - Akshay" },
  { id: 2, name: "Player 2" },
  { id: 3, name: "Player 3" },
  { id: 4, name: "Player 4" },
  { id: 5, name: "Player 5" },
  { id: 6, name: "Player 6" },
  { id: 7, name: "Player 7" },
  { id: 8, name: "Player 8" },
  { id: 9, name: "Player 9" },
  { id: 10, name: "Player 10" },
  { id: 11, name: "Player 11" },
  { id: 12, name: "Player 12" },
  { id: 13, name: "Player 13" },
  { id: 14, name: "Player 14" },
  { id: 15, name: "Player 15" },
  { id: 16, name: "Player 16" },
  { id: 17, name: "Player 17" },
  { id: 18, name: "Player 18" },
  { id: 19, name: "Player 19" },
  { id: 20, name: "Player 20" },
  { id: 21, name: "Player 21" },
  { id: 22, name: "Player 22" },
  { id: 23, name: "Player 23" },
  { id: 24, name: "Player 24" },
  { id: 25, name: "Player 25" },
  { id: 26, name: "Player 26" },
  { id: 27, name: "Player 27" },
  { id: 28, name: "Player 28" },
  { id: 29, name: "Player 29" },
  { id: 30, name: "Player 30" },
];

const participantsdemo = [
  {
    id: "1",
    user_id: "101",
    name: "Alice Johnson",
    status: "confirmed",
    registration_date: "2024-12-01",
    user: {
      id: "101",
      full_name: "Alice Johnson",
      email: "alice.johnson@example.com",
      gender: "female",
      date_of_birth: "1990-05-15",
    },
  },
  {
    id: "2",
    user_id: "102",
    name: "Bob Smith",
    status: "pending",
    registration_date: "2024-12-02",
    user: {
      id: "102",
      full_name: "Bob Smith",
      email: "bob.smith@example.com",
      gender: "male",
      date_of_birth: "1988-03-22",
    },
  },
  {
    id: "3",
    user_id: "103",
    name: "Charlie Brown",
    status: "declined",
    registration_date: "2024-12-03",
    user: {
      id: "103",
      full_name: "Charlie Brown",
      email: "charlie.brown@example.com",
      gender: "male",
      date_of_birth: "1995-07-19",
    },
  },
  {
    id: "4",
    user_id: "104",
    name: "Diana Prince",
    status: "confirmed",
    registration_date: "2024-12-04",
    user: {
      id: "104",
      full_name: "Diana Prince",
      email: "diana.prince@example.com",
      gender: "female",
      date_of_birth: "1992-11-11",
    },
  },
  {
    id: "5",
    user_id: "105",
    name: "Evan Thomas",
    status: "pending",
    registration_date: "2024-12-05",
    user: {
      id: "105",
      full_name: "Evan Thomas",
      email: "evan.thomas@example.com",
      gender: "male",
      date_of_birth: "1997-09-04",
    },
  },
  {
    id: "6",
    user_id: "106",
    name: "Fiona Davis",
    status: "confirmed",
    registration_date: "2024-12-06",
    user: {
      id: "106",
      full_name: "Fiona Davis",
      email: "fiona.davis@example.com",
      gender: "female",
      date_of_birth: "1985-12-25",
    },
  },
  {
    id: "7",
    user_id: "107",
    name: "George Miller",
    status: "declined",
    registration_date: "2024-12-07",
    user: {
      id: "107",
      full_name: "George Miller",
      email: "george.miller@example.com",
      gender: "male",
      date_of_birth: "1993-04-10",
    },
  },
  {
    id: "8",
    user_id: "108",
    name: "Hannah Lee",
    status: "confirmed",
    registration_date: "2024-12-08",
    user: {
      id: "108",
      full_name: "Hannah Lee",
      email: "hannah.lee@example.com",
      gender: "female",
      date_of_birth: "1991-06-18",
    },
  },
  {
    id: "9",
    user_id: "109",
    name: "Ian Collins",
    status: "pending",
    registration_date: "2024-12-09",
    user: {
      id: "109",
      full_name: "Ian Collins",
      email: "ian.collins@example.com",
      gender: "male",
      date_of_birth: "1990-02-28",
    },
  },
  {
    id: "10",
    user_id: "110",
    name: "Julia Adams",
    status: "confirmed",
    registration_date: "2024-12-10",
    user: {
      id: "110",
      full_name: "Julia Adams",
      email: "julia.adams@example.com",
      gender: "female",
      date_of_birth: "1989-08-30",
    },
  },
];



interface Participant {
  id: string;
  user_id: string;
  name: string;
  status: string;
  registration_date: string;
  user: {
    id: string;
    full_name: string;
    email: string;
    gender: string;
    date_of_birth: string;
  };
}

interface PlayerRegistrationmenuProps {
  participants:Participant[]
}

const PlayerRegistrationmenu = ({ participants }: PlayerRegistrationmenuProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPlayers, setFilteredPlayers] =
    useState<Participant[]>(participants);
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 14;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Reset to first page on search
    setCurrentPage(1);
    const filtered = participants.filter((player) =>
      player.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPlayers(filtered);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);

  // Get current players
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = filteredPlayers.slice(
    indexOfFirstPlayer,
    indexOfLastPlayer
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div className="w-full h-full border rounded-lg">
      <div className="w-full p-6 bg-[#141f29] flex flex-wrap gap-4 rounded-t-lg">
        <div className="relative w-full md:w-1/3">
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-2 border-[#ccdb28]"
            onClick={() => setIsModalOpen(true)}
          />
          <BsSearch className="absolute right-2 top-3" />
        </div>

        <Select>
          <SelectTrigger className="w-full md:max-w-[250px] border-2 border-[#ccdb28]">
            <SelectValue placeholder="Men’s Double (35 entries)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-[#141f29] pl-6 py-2 border-none">
        <div className="flex justify-start items-center text-[#ccdb28]">
          <h1>Name</h1>
          <TiArrowUnsorted />
        </div>
        <div className="hidden sm:flex justify-start items-center text-[#ccdb28]">
          <h1>Name</h1>
          <TiArrowUnsorted />
        </div>
        <div className="hidden lg:flex justify-start items-center text-[#ccdb28]">
          <h1>Name</h1>
          <TiArrowUnsorted />
        </div>
      </div>
      <div className="w-full">
        {currentPlayers.map((player, index) => (
          <div
            key={player.id}
            className={`grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pl-6 py-2 ${
              index % 2 === 0 ? "bg-white" : "bg-[#e6eac5]"
            }`}
          >
            <div className="flex justify-start items-center">
              <span>{player.name}</span>
            </div>
            <div className="hidden sm:flex justify-start items-center">
              <span>{player.name}</span>
            </div>
            <div className="hidden lg:flex justify-start items-center">
              <span>{player.name}</span>
            </div>
          </div>
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  paginate(index + 1);
                }}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                currentPage < totalPages && paginate(currentPage + 1)
              }
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PlayerRegistrationmenu;

interface Player {
  id: number;
  name: string;
}
