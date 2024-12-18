import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { RiQuestionnaireFill } from 'react-icons/ri';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog';
import { FaSmile } from 'react-icons/fa';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

interface QA {
  id: number;
  question_text: string;
  created_at: string;
  answers: {
    id: number;
    answer_text: string;
    created_at: string;
  }[];
}

interface QnaSectionEventpageProps {
  isright: boolean;
  eventId: string;
}

const QnaSectionEventpage = ({ isright, eventId }: QnaSectionEventpageProps) => {
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState<QA[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const questionsPerPage = 4;
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const { toast } = useToast();
  const supabase = createClient();
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    checkAuth();
    fetchQuestions();
  }, [eventId]);

  const checkAuth = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      
      setIsAuthenticated(!!session);
      setUserId(session?.user?.id || null);
    } catch (error) {
      console.error('Auth check error:', error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`/api/event/fetch-qna/${eventId}`);
      if (!response.ok) throw new Error('Failed to fetch questions');
      const data = await response.json();
      setQuestions(data.questions || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load questions",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit a question",
        variant: "destructive",
      });
      return;
    }

    if (question.trim() === "") return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/event/questions/${eventId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          questionText: question.trim()
        })
      });

      if (!response.ok) throw new Error('Failed to submit question');
      
      setIsThankYouOpen(true);
      setQuestion("");
      fetchQuestions(); 
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit question",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`qna-section ${isright ? "lg:hidden" : "hidden lg:block"}`}>
      <div className="flex gap-2 items-center text-xl">
        <RiQuestionnaireFill />
        <h1>Ask your question to the organizer!</h1>
      </div>

      {!isAuthenticated ? (
        <div className="my-4 p-4 bg-gray-100 rounded-lg text-center">
          <p className="mb-2">Please log in to ask questions</p>
          <Link 
            href="/auth/login" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Login here
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="question-form">
          <div className="my-2 flex gap-2 relative h-24 rounded border border-gray-800 px-2 py-1">
            <Input
              placeholder="Type your question..."
              className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={isLoading}
            />
            <div className="flex flex-col gap-4 absolute right-2 bottom-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </form>
      )}

      <div className="mb-2">
        <h1 className="py-2 text-xl font-bold">
          See What Others Have Asked
        </h1>
        <ul className="questions-list">
          {currentQuestions.map((qa) => (
            <li key={qa.id} className="py-2">
              <div className="w-full">
                <div className="mb-2">
                  <h2 className="font-semibold text-lg leading-tight">
                    {qa.question_text}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {new Date(qa.created_at).toLocaleDateString()}
                  </p>
                </div>
                {qa.answers?.map((answer) => (
                  <div key={answer.id} className="border-l-4 border-gray-500 px-4 py-1 mt-2">
                    <p>{answer.answer_text}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(answer.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      paginate(i + 1);
                    }}
                    className={currentPage === i + 1 ? "active" : ""}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

      {/* Pagination and Dialog components remain the same */}
      {isThankYouOpen && (
        <Dialog open={isThankYouOpen} onOpenChange={setIsThankYouOpen}>
          <DialogContent className="w-[90%] sm:max-w-md p-6 flex flex-col items-center h-auto">
            <FaSmile className="text-4xl mb-4" />
            <DialogTitle className="text-2xl mb-2">Thank You!</DialogTitle>
            <DialogDescription className="text-center text-gray-700">
              Organizers normally reply 
              <span className="italic ml-1">within 24-28 hours</span>. Your Question
              & their answer shall be visible below once they reply.
            </DialogDescription>
            <Button
              variant="default"
              className="mt-6"
              onClick={() => setIsThankYouOpen(false)}
            >
              Close
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default QnaSectionEventpage;