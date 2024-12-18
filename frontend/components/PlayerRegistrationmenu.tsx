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
import { useEventContext } from '@/context/EventDataContext';

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

interface Category {
  id?: number;
  category_name?: string;
  total_quantity?: string;
  max_ticket_quantity?: string;
  price?: number;
  ticket_description?: string;
  discount_code?: string;
  discount?: boolean;
  category_type?: string;
  discountType?: string;
  number_of_discounts?: string;
  from_date?: string;
  till_date?: string;
  discount_value: number;
  percentage_input?: string;
  amount_input?: string;
  gender?: string;
  age_from?: string;
  age_to?: string;
  ageRangeOption?: string;
  max_teams_size?: number;
  sport?: string;
  teamName?: string;
  pairname?: string;
}

interface PlayerRegistrationmenuProps {
  participants: Participant[];
  dialog: boolean;
  setDialog: React.Dispatch<React.SetStateAction<boolean>>;
  dialogdata: Participant;
  setdialogdata: React.Dispatch<React.SetStateAction<Participant>>;
  categories:Category[]
}

const PlayerRegistrationmenu = ({
  participants,
  dialog,
  setDialog,
  dialogdata,
  setdialogdata,
  categories,
}: PlayerRegistrationmenuProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(participants);
  const [filteredPlayers, setFilteredPlayers] =
    useState<Participant[]>(participants.participants);
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 14;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
    const filtered = participants.filter((player) =>
      player.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPlayers(filtered);
  };

  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = filteredPlayers.slice(
    indexOfFirstPlayer,
    indexOfLastPlayer
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const gridColumns = 3;
  const gridRows = Math.ceil(currentPlayers.length / gridColumns);
  const getPlayerForCell = (row: number, col: number) => {
    const index = row * gridColumns + col;
    return currentPlayers[index];
  };

  const handlePlayerClick = (player: Participant) => {
    setdialogdata(player);
    setDialog(true);
  };
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
            <SelectValue placeholder="Select The Category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((e, i) => (
              <SelectItem
                key={i}
                value={e.category_name}
                className="flex items-center space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <span>{e.category_name}</span>
                </div>
              </SelectItem>
            ))}
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
        {Array.from({ length: gridRows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pl-6 py-2 ${
              rowIndex % 2 === 0 ? "bg-white" : "bg-[#e6eac5]"
            }`}
          >
            {Array.from({ length: gridColumns }).map((_, colIndex) => {
              const player = getPlayerForCell(rowIndex, colIndex);
              return player ? (
                <div
                  key={colIndex}
                  className="flex justify-start items-center cursor-pointer"
                  onClick={() => handlePlayerClick(player)}
                >
                  <span>{player.name}</span>
                </div>
              ) : (
                <div key={colIndex}></div>
              );
            })}
          </div>
        ))}
      </div>
      {/* <div className="w-full">
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
      </div> */}
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
