import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Quizzes from "./Quizzes";
import Welcome from "./Welcome";
import TopNavigation from "./TopNavigation";
import Continue from "./Continue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import UserNameModal from "./UserNameModal";
import Timer from "./Timer";
import Profile from "./Profile";
import Upgrade from "./Upgrade";
import Settings from "./Settings";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import MockExams from "./MockExams";
import Quiz from "./Quiz";

const Dashboard = () => {
  const [selectedNav, setSelectedNav] = useState("Dashboard");
  const [topics, setTopics] = useState([]);
  const [userName, setUserName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { currentUser, hasActiveSubscription, name } = useAuth();
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentTopicIds, setCurrentTopicIds] = useState([]);

  useEffect(() => {
    if (!currentUser || !hasActiveSubscription) {
      console.log(
        "Redirecting to sign-in, no active subscription or user is not logged in."
      );
      navigate("/sign-in");
    } else if (!name && currentUser) {
      // Show modal to set user name if name is null
      setShowModal(true);
    }
  }, [currentUser, hasActiveSubscription, navigate, name]);

  useEffect(() => {
    const fetchTopics = async () => {
      const localTopics = localStorage.getItem('topics');
      if (localTopics) {
        setTopics(JSON.parse(localTopics)); // Load topics from local storage if available
        console.log("fetched from cache")
      } else {
        const querySnapshot = await getDocs(collection(db, "topics"));
        const topicsArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          totalQuestions: doc.data().numQuestions || 0,
          correct: 0, // Assuming these are placeholders for a UI display
          incorrect: 0, // Assuming these are placeholders for a UI display
        }));
        localStorage.setItem('topics', JSON.stringify(topicsArray)); // Cache topics in local storage
        setTopics(topicsArray);
      }
    };
  
    if (currentUser && hasActiveSubscription) {
      fetchTopics();
    }
  }, [currentUser, hasActiveSubscription]);
  
  // fetch mock exams on load
  useEffect(() => {
    if (currentUser && hasActiveSubscription) {
      const fetchExams = async () => {
        const querySnapshot = await getDocs(collection(db, "mockexams"));
        const examsArray = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            exam: doc.data().exam, // Assuming 'exam' field contains the exam name
            totalQuestions: 20, // Default to 1 until database update
            correct: 4,
            incorrect: 2,
          }))
          .sort((a, b) => {
            const numA = parseInt(a.exam.match(/\d+/)[0], 10);
            const numB = parseInt(b.exam.match(/\d+/)[0], 10);
            return numA - numB;
          });
        setExams(examsArray);
      };

      fetchExams();
    }
  }, [currentUser, hasActiveSubscription]);

  const handleNavChange = (newNav) => {
    setSelectedNav(newNav);
  };

  const closeModal = (newName) => {
    setShowModal(false);
    setUserName(newName);
  };

  return (
    <div className="flex bg-neutral-100 min-h-screen overflow-x-hidden">
      {showModal && <UserNameModal user={currentUser} onClose={closeModal} />}
      <Sidebar selectedNav={selectedNav} onNavChange={handleNavChange} />
      <div className="flex-1 w-full">
        <TopNavigation
          selectedNav={selectedNav}
          onNavChange={handleNavChange}
        />
        <div className="flex p-4 md:p-8 md:pl-0 text-2xl font-bold flex flex-col xl:flex-row w-full">
          <div className="flex flex-col w-full xl:w-3/5 2xl:w-2/3">
            {selectedNav === "Dashboard" && !showQuiz && (
              <>
                <div className="mb-4">
                  {" "}
                  {/* Margin bottom for spacing */}
                  <Welcome />
                </div>
                <div className="mb-4">
                  {" "}
                  {/* Margin bottom for spacing */}
                  <Continue />
                </div>
                <div className="mb-4">
                  {" "}
                  {/* Margin bottom for spacing, adjust if needed */}
                  <Quizzes topics={topics} isTruncated={true} setShowQuiz={setShowQuiz} setCurrentTopicIds={setCurrentTopicIds}/>

                </div>
              </>
            )}
            { showQuiz && (
              <Quiz currentTopicIds={currentTopicIds}  />
            )
            }
            {selectedNav === "Quizzes" && !showQuiz && (
              <div className="mb-4">
                <Quizzes topics={topics} isTruncated={false} setShowQuiz={setShowQuiz} setCurrentTopicIds={setCurrentTopicIds}/>

              </div>
            )}
            {selectedNav === "Mock Exams" && !showQuiz &&  (
              <MockExams exams={exams} isTruncated={false} />
            )}
            {selectedNav === "Profile" && !showQuiz && (
              <>
                <Profile />
                <Upgrade />
              </>
            )}
            {selectedNav === "Settings" && !showQuiz && (
              <>
                <Settings />
              </>
            )}
          </div>

          {/* Column 2 - No specific width classes needed */}
          <div className="flex-1 pl-0 xl:pl-8 xl:w-2/5 2xl:w-1/3">
            <Timer />
            {!(selectedNav === "Profile") && (
              <>
                <Profile name={userName} />
                <Upgrade setSelectedNav={setSelectedNav} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
