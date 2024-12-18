"use client"

import React, { useState } from 'react';
import { Button } from './ui/button';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
  data: Participant[]; 
  onSelect: (selected: Participant | null) => void;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ open, onClose, data, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<Participant | null>(null);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleSelect = (participant: Participant) => {
    setSelectedItem((prev) => (prev?.id === participant.id ? null : participant));
  };

  const handleSubmit = () => {
    onSelect(selectedItem);
    onClose();
  };

  if (!open) return null;

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
      <div className="bg-white p-4 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
        <h2 className="text-xl mb-4">Search Participants/Teams</h2>

        {selectedItem && (
          <div className="flex items-center gap-2 mb-4">
            <span
              className="px-3 py-1 bg-[#ccdb28] text-gray-800 rounded flex items-center"
            >
              {selectedItem.name} ({selectedItem.contact})
              <button
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={() => handleSelect(selectedItem)}
              >
                &times;
              </button>
            </span>
          </div>
        )}

        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Search by name or number..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="max-h-60 overflow-y-auto mb-4">
          {filteredData.map((item) => (
            <div key={item.id} className="flex items-center">
              <input
                type="radio"
                name="participant"
                checked={selectedItem?.id === item.id}
                onChange={() => handleSelect(item)}
              />
              <span className="ml-2">
                {item.name} ({item.contact})
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button
            className="rounded mr-2"
            onClick={handleSubmit}
            disabled={!selectedItem}
          >
            Select
          </Button>
          <Button variant="outline" className="rounded" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchDialog;

export interface Participant {
  id: string;
  name: string;
  contact: string;
} 