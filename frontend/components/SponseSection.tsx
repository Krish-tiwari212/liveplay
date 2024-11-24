"use client"

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Image from "next/image";
import { Loader } from "lucide-react";
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useEventContext } from "@/context/EventDataContext";


const formfields = [
  {
    name: "sponsor_Name",
    type: "text",
    placeholder: "Sponsor Name",
    required: true,
    label: "Sponsor Name",
  },
  {
    name: "sponsor_logo",
    type: "file",
    required: true,
    placeholder: "Sponsor Logo",
    label: "Sponsor Logo",
  },
];

const SponsorSection = () => {
  const { EventData, setEventData,editPage,EventEditData,setEventEditData } = useEventContext();
  const [sponsors, setSponsors] = useState<Record<string, any>[]>([]);
  const [newSponsor, setNewSponsor] = useState<Record<string, any>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const imageRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const handleFileChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Data = reader.result as string;
          setImagePreviews((prev) => {
            const newPreviews = [...prev];
            newPreviews[index] = base64Data;
            return newPreviews;
          });
          setNewSponsor((prevData) => ({
            ...prevData,
            logo: base64Data,
          }));
        };
        reader.readAsDataURL(file);
        setIsImageLoading(false);
        setNewSponsor((prevData) => ({
          ...prevData,
          [`fileName${index}`]: file.name,
        }));
      }
    };

  const handleSponsorChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewSponsor((prevData) => ({ ...prevData, [name]: value }));
  };

  const addSponsor = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (sponsors.length >= 3) {
      setIsDialogOpen(true);
      return;
    }
    setIsAdding(true);
    setTimeout(() => {
      let updatedSponsors;
      if (editIndex !== null) {
        updatedSponsors = [...sponsors];
        updatedSponsors[editIndex] = newSponsor;
        setEditIndex(null);
      } else {
        updatedSponsors = [...sponsors, newSponsor];
      }
      setSponsors(updatedSponsors);
      setEventData((prevData) => ({
        ...prevData,
        sponsors: updatedSponsors,
      }));
      setNewSponsor({});
      setIsAdding(false);
    }, 1000);
  };

  const handleDelete = (index: number) => {
    const updatedSponsors = sponsors.filter((_, i) => i !== index);
    setSponsors(updatedSponsors);
    setEventData((prevData) => ({
      ...prevData,
      sponsors: updatedSponsors,
    }));
    setNewSponsor({});
  };

  useEffect(() => {
    if (sponsors.length === 0) {
      if (editPage === "manageEvent" && EventEditData?.sponsors) {
        setSponsors(EventEditData.sponsors);
      } else if (editPage === "createEvent" && EventData?.sponsors) {
        setSponsors(EventData.sponsors);
      }
    }
  }, [editPage, EventEditData, EventData, sponsors]);

  const areFieldsFilled = () => {
    return formfields.every((field) => {
      if (field.required) {
        if (field.type === "file") {
          return newSponsor[`fileName${formfields.indexOf(field)}`];
        }
        return newSponsor[field.name] && newSponsor[field.name].trim() !== "";
      }
      return true;
    });
  };

  return (
    <div className="sponsor-section mt-8 p-2 bg-gray-100 rounded-lg shadow-md">
      <div className="sponsor-form flex gap-4 mb-2 relative">
        <div className="w-full mx-2 mt-2 flex flex-wrap mb-6">
          <div className="flex justify-between items-center w-full">
            <Label className="font-bold text-lg" htmlFor="registrationdetails">
              Sponsor Details
            </Label>
            <Button
              onClick={addSponsor}
              disabled={isAdding || !areFieldsFilled()}
              className="md:hidden my-2"
              title={!areFieldsFilled() ? "Fill the input field first" : ""}
            >
              {isAdding
                ? "Adding..."
                : editIndex !== null
                ? "Update Sponsor"
                : "Add Sponsor"}
            </Button>
          </div>

          <div className="flex flex-col xl:flex-row w-full gap-3">
            {formfields.map((field, i) =>
              field.type !== "file" ? (
                <div className="w-full flex flex-col" key={i}>
                  <Label className="text-[0.8rem]">{field.label}</Label>
                  <input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    required={field.required}
                    value={newSponsor[field.name] || ""}
                    placeholder={field.placeholder}
                    onChange={handleSponsorChange}
                    className="h-10 p-2 bg-white border rounded-md text-[0.8rem] md:text-sm shadow-2xl text-[#17202A] focus:border-[#17202A] focus:outline-none focus:shadow-lg"
                  />
                </div>
              ) : (
                <div className="flex flex-col w-full" key={field.name}>
                  <Label className="text-[0.8rem]">{field.label}</Label>
                  <div
                    className="flex items-center shadow-md justify-center h-[40px] w-full cursor-pointer gap-3 rounded border-[1px] border-dashed border-gray-600 bg-white"
                    onClick={() => imageRefs.current[i]?.click()}
                  >
                    <Input
                      type="file"
                      className="hidden"
                      ref={(el) => {
                        imageRefs.current[i] = el;
                      }}
                      onChange={handleFileChange(i)}
                    />
                    {!isImageLoading ? (
                      newSponsor[`fileName${i}`] ? (
                        <Image
                          src="/icons/tickMark.svg"
                          alt="file uploaded"
                          width={24}
                          height={24}
                        />
                      ) : (
                        <Image
                          src="/icons/upload-image.svg"
                          alt="upload"
                          width={24}
                          height={24}
                          className="invert"
                        />
                      )
                    ) : (
                      <div className="text-16 flex items-center justify-center font-medium text-gray-700">
                        Uploading
                        <Loader size={20} className="animate-spin ml-2" />
                      </div>
                    )}
                    <div className="flex flex-col items-center gap-1">
                      <h2 className="text-[0.5rem] md:text-10 font-bold text-gray-400">
                        {newSponsor[`fileName${i}`] || "Click to upload"}
                      </h2>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <Button
          onClick={addSponsor}
          disabled={isAdding || !areFieldsFilled()}
          className="hidden md:absolute right-2 top-1"
          title={!areFieldsFilled() ? "Fill the input field first" : ""}
        >
          {isAdding
            ? "Adding..."
            : editIndex !== null
            ? "Update Sponsor"
            : "Add Sponsor"}
        </Button>
      </div>
      <div className="sponsor-preview grid grid-cols-3 gap-6">
        {sponsors.map((sponsor, index) => (
          <div
            key={index}
            className="sponsor-card bg-white p-4 rounded-lg shadow-lg"
          >
            <img
              src={sponsor.logo || imagePreviews[index]}
              alt={`${sponsor.sponsor_Name} logo`}
              className="w-full border h-32 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-bold mb-2">{sponsor.sponsor_Name}</h3>
            <div className="actions flex justify-between">
              <Button
                variant="outline"
                className="text-red-500 hover:underline"
                onClick={() => handleDelete(index)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      {isDialogOpen && (
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent className="w-[90%] rounded">
            <AlertDialogHeader>
              <AlertDialogTitle>Limit Reached</AlertDialogTitle>
              <AlertDialogDescription>
                You can only add up to 3 sponsors. Please remove an existing
                sponsor to add a new one.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
                Close
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default SponsorSection;
