import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Quizzes from "./Quizzes";
import Welcome from "./Welcome";
import TopNavigation from "./TopNavigation";
import Continue from "./Continue";
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, auth } from "C:/Users/scott/Documents/med/src/firebase-config";
import UserNameModal from "./UserNameModal";
import Timer from "./Timer";
import Profile from "./Profile";
import Upgrade from "./Upgrade";
import Quiz from "./Quiz";
import Settings from "./Settings";

const Dashboard = () => {
  const [selectedNav, setSelectedNav] = useState("Dashboard");
  const [topics, setTopics] = useState([]);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("Dashboard: User is logged in:", user);
        setUser(user);
        const userRef = doc(db, "users", user.uid);
        try {
          const userSnap = await getDoc(userRef);
          if (userSnap.exists() && userSnap.data().name) {
            console.log("Dashboard: User data:", userSnap.data());
            setUserName(userSnap.data().name);
          } else {
            console.log("Dashboard: No user name found, showing modal");
            setShowModal(true);
          }
        } catch (error) {
          console.error("Dashboard: Error fetching user data:", error);
        }
      } else {
        console.log("Dashboard: User is not logged in");
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const closeModal = (newName) => {
    setShowModal(false);
    setUserName(newName);
  };

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "topics"));
        const topicsArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          totalQuestions: doc.data().totalQuestions || 1,
          correct: 0,
          incorrect: 0,
        }));
        console.log("Dashboard: Topics fetched:", topicsArray);
        setTopics(topicsArray);
      } catch (error) {
        console.error("Dashboard: Error fetching topics:", error);
      }
    };
    fetchTopics();
  }, []);

  const handleNavChange = (newNav) => {
    setSelectedNav(newNav);
  };

  return (
    <div className="flex bg-neutral-100 min-h-screen">
      {showModal && <UserNameModal user={user} onClose={closeModal} />}
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
              <Quiz />
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
