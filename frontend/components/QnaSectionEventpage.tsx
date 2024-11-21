import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { RiQuestionnaireFill } from 'react-icons/ri';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface QA {
  id: number;
  name: string;
  question: string;
  answer: string;
}

const initialQAs: QA[] = [
  {
    id: 1,
    name: 'Messi',
    question: 'What inspired you to join this event?',
    answer: 'I have always wanted to challenge myself and meet new people.',
  },
  {
    id: 2,
    name: 'Kuber',
    question: 'How do you prepare for such competitions?',
    answer: 'I practice regularly and study past events to strategize.',
  },
  {
    id: 3,
    name: 'Pelle',
    question: 'What is your favorite part of the event?',
    answer: 'Interacting with fellow participants and learning from them.',
  },
  {
    id: 4,
    name: 'Krish',
    question: 'Can you share a memorable moment from previous events?',
    answer: 'Winning the last round was unforgettable!',
  },
  {
    id: 5,
    name: 'pell',
    question: 'How do you handle pressure during competitions?',
    answer: 'I stay focused and take deep breaths to maintain calm.',
  },
  {
    id: 6,
    name: 'Mohit',
    question: 'What skills do you hope to improve through this event?',
    answer: 'I aim to enhance my teamwork and problem-solving abilities.',
  },
  {
    id: 7,
    name: 'Rahul',
    question: 'Do you have any tips for new participants?',
    answer: 'Stay curious, ask questions, and don’t be afraid to make mistakes.',
  },
  {
    id: 8,
    name: 'pell',
    question: 'What motivated you to ask this question?',
    answer: 'I believe in sharing knowledge to help others grow.',
  },
  {
    id: 9,
    name: 'pell',
    question: 'How do you balance participation with other commitments?',
    answer: 'Effective time management and prioritizing tasks help me balance both.',
  },
  {
    id: 10,
    name: 'pell',
    question: 'What are your goals for this event?',
    answer: 'To learn new things, connect with peers, and achieve personal growth.',
  },
  {
    id: 11,
    name: 'pell',
    question: 'How do you stay motivated throughout the event?',
    answer: 'Setting small goals and celebrating each achievement keeps me motivated.',
  },
  {
    id: 12,
    name: 'pell',
    question: 'What challenges do you anticipate in this event?',
    answer: 'Managing time effectively and overcoming difficult tasks.',
  },
  {
    id: 13,
    name: 'pell',
    question: 'Can you describe your teamwork approach?',
    answer: 'I believe in open communication and supporting each team member.',
  },
  {
    id: 14,
    name: 'pell',
    question: 'What do you hope to take away from this experience?',
    answer: 'Valuable insights, lasting friendships, and enhanced skills.',
  },
  {
    id: 15,
    name: 'pell',
    question: 'How do you handle feedback and criticism?',
    answer: 'I take it constructively to improve and grow personally.',
  },
];

const QnaSectionEventpage = () => {
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState<QA[]>(initialQAs);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 4;

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() === '') return;
    const newQA: QA = {
      id: questions.length + 1,
      name: 'pell',
      question: question.trim(),
      answer: 'This is a placeholder answer.',
    };
    setQuestions([newQA, ...questions]);
    setQuestion('');
    setCurrentPage(1); // Reset to first page on new submission
  };

  // Calculate pagination
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="qna-section">
      <div className="flex gap-2 items-center text-xl">
        <RiQuestionnaireFill />
        <h1>Ask your question to the organizer!</h1>
      </div>
      <form onSubmit={handleSubmit} className="question-form">
        <div className="my-2 flex gap-2 relative h-24 rounded border border-gray-800 px-2 py-1">
          <Input
            placeholder="Type your reply..."
            className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none"
            value={question}
            onChange={handleChange}
          />
          <div className="flex flex-col gap-4 absolute right-2 bottom-4">
            <Button type="submit">Submit Reply</Button>
          </div>
        </div>
      </form>

      <div className='mb-2'>
        <h1 className="py-2 text-xl font-bold ">
          See What Other Player Have asked?
        </h1>
        <ul className="questions-list">
          {currentQuestions.map((qa) => (
            <li key={qa.id} className="py-2">
              <div className="w-full">
                <h1 className="font-semibold text-xl mb-1 leading-tight">{qa.name}</h1>
                <div className="">
                  <h1 className="font-semibold text-lg leading-tight">{qa.question}</h1>
                  <div className="border-l-4 border-gray-500 px-4 py-1 mt-2">
                    {qa.answer}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={handlePrevious} disabled={currentPage === 1} />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    paginate(i + 1);
                  }}
                  className={currentPage === i + 1 ? 'active' : ''}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={handleNext} disabled={currentPage === totalPages} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default QnaSectionEventpage;
