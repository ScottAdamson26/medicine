import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Quizzes from "./Quizzes";
import Welcome from "./Welcome";
import TopNavigation from "./TopNavigation";
import Continue from "./Continue";
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, auth } from "../../firebase-config";
import UserNameModal from "./UserNameModal";
import Timer from "./Timer";
import Profile from "./Profile";
import Upgrade from "./Upgrade";
import Quiz from "./Quiz";
import Settings from "./Settings";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../AuthContext';
import MockExams from "./MockExams";

const Dashboard = () => {
  const [selectedNav, setSelectedNav] = useState("Dashboard");
  const [topics, setTopics] = useState([]);
  const [userName, setUserName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { currentUser, hasActiveSubscription } = useAuth();
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    // Redirect if not logged in or no active subscription
    if (!currentUser || !hasActiveSubscription) {
      console.log("Redirecting to sign-in, no active subscription or user is not logged in.");
      navigate("/sign-in");
    } else if (!userName && currentUser) {
      // Fetch user details again only if necessary, i.e., userName is not set
      const userRef = doc(db, "users", currentUser.uid);
      getDoc(userRef).then(userDoc => {
        if (userDoc.exists() && userDoc.data().name) {
          setUserName(userDoc.data().name);
        } else {
          setShowModal(true);
        }
      }).catch(error => {
        console.error("Dashboard: Error fetching user data:", error);
      });
    }
  }, [currentUser, hasActiveSubscription, navigate, userName]);


  // fetch topics on load
  useEffect(() => {
    if (currentUser && hasActiveSubscription) {
      const fetchTopics = async () => {
        const querySnapshot = await getDocs(collection(db, "topics"));
        const topicsArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          totalQuestions: doc.data().totalQuestions || 1,
          correct: 0,
          incorrect: 0,
        }));
        setTopics(topicsArray);
      };
      fetchTopics();
    }
  }, [currentUser, hasActiveSubscription]);

 // fetch mock exams on load
useEffect(() => {
  if (currentUser && hasActiveSubscription) {
    const fetchExams = async () => {
      const querySnapshot = await getDocs(collection(db, "mockexams"));
      const examsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        exam: doc.data().exam, // Assuming 'exam' field contains the exam name
        totalQuestions: 20, // Default to 1 until database update
        correct: 4,
        incorrect: 2
      })).sort((a, b) => {
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
    <div className="flex bg-neutral-100 min-h-screen">
      {showModal && <UserNameModal user={currentUser} onClose={closeModal} />}
      <Sidebar selectedNav={selectedNav} onNavChange={handleNavChange} />
      <div className="flex-1 w-full">
        <TopNavigation
          selectedNav={selectedNav}
          onNavChange={handleNavChange}
        />
        <div className="flex p-4 md:p-8 md:pl-0 text-2xl font-bold flex flex-col xl:flex-row">
          <div className="flex flex-col w-full xl:w-2/3">
            {selectedNav === "Dashboard" && (
              <>
                <div className="mb-4">
                  {" "}
                  {/* Margin bottom for spacing */}
                  <Welcome name={userName} />
                </div>
                <div className="mb-4">
                  {" "}
                  {/* Margin bottom for spacing */}
                  <Continue />
                </div>
                <div className="mb-4">
                  {" "}
                  {/* Margin bottom for spacing, adjust if needed */}
                  <Quizzes topics={topics} isTruncated={true} />
                </div>
              </>
            )}
            {selectedNav === "Quizzes" && (
              <Quizzes topics={topics} isTruncated={false} />
            )}
            {selectedNav === "Mock Exams" && (
              <MockExams exams={exams}  isTruncated={false} />
            )}
            {selectedNav === "Profile" && (
              <>
                <Profile name={userName} />
                <Upgrade />
              </>
            )}
            {selectedNav === "Settings" && (
              <>
              <Settings />
              </>
            )}
            
          </div>

          {/* Column 2 - No specific width classes needed */}
          <div className="flex-1 pl-0 xl:pl-8">
            <Timer />
            {!(selectedNav === "Profile") && (
              <>
                <Profile name={userName} />
                <Upgrade />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
