// 'use client'

// import { useAuth, useUser } from "@clerk/clerk-react";
// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button"
// import axios from "axios";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Link from 'next/link'
// import { FiTrash } from "react-icons/fi"; // Importing a trash icon from react-icons

// export default function History() {
//   const [userAudios, setUserAudios] = useState([]);
//   const { isSignedIn, userId } = useAuth();
//   const [Userdata, setUserData] = useState([]);

//   const { user } = useUser();
//   const email = user?.primaryEmailAddress?.emailAddress;
//   const TruncatedText = ({ text }) => {
//     const [isExpanded, setIsExpanded] = useState(false);

//     return (
//       <div>
//         <p
//           className={`text-sm text-gray-600 font-medium break-words font-sans ${
//             !isExpanded ? "line-clamp-2" : ""
//           }`}
//         >
//           {text}
//         </p>
//         {text.split(" ").length > 10 && ( // Show "Read More" if text is long
//           <button
//             className="text-white mt-1 text-sm"
//             style={{ backgroundColor: "#9b5de5" }}
//             onClick={() => setIsExpanded(!isExpanded)}
//           >
//             {isExpanded ? "Read Less" : "Read More"}
//           </button>
//         )}
//       </div>
//     );
//   };
//   const fetchUserAudios = async () => {
//     try {
//       const { data } = await axios.get(
//         `/api/getUserData?email=${encodeURIComponent(email)}`
        
//       );
//       setUserData(data.UserSavedData);
//     } catch (error) {
//       console.error("Error fetching audio URLs:", error);
//     }
//   };
//   const deleteAudio = async (id) => {
//     try {
      
//       await axios.delete(`/api/delete?id=${id}`);

//       fetchUserAudios();
//     } catch (error) {
//       console.error("Error deleting audio:", error);
//     }
//   };

//   useEffect(() => {
//     if (isSignedIn) {
//       fetchUserAudios();
//     }
//   }, [isSignedIn]);

//   return (
//     <div className="min-h-screen bg-white text-black p-4">
//       <Link href="/">
//         <Button className="p-4 text-xl" style={{ backgroundColor: "#9b5de5" }}>
//           Back
//         </Button>
//       </Link>
//       <h1 className="text-2xl font-bold mb-6">Your Audio History</h1>
//       {Userdata.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
//           {Userdata.map((audio) => (
//             <Card key={audio._id} className="w-full">
//               <CardHeader className="flex justify-between items-center">
//                 <CardTitle className="text-lg">Audio</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <TruncatedText text={audio.text} />
//                 <div className="flex justify-between items-center">
//                   {" "}
//                   <audio controls className="w-80 mb-4 mt-2">
//                     <source src={audio.audioUrl} type="audio/mpeg" />
//                     Your browser does not support the audio element.
//                   </audio>
//                   <button
//                     onClick={() => deleteAudio(audio._id)}
//                     className="text-black hover:text-gray-300 h-12 bg-red-500 rounded-md"
//                   >
//                     <FiTrash size={40} />
//                   </button>
//                 </div>
//               </CardContent>
//               {/* Delete Icon */}
//             </Card>
//           ))}
//         </div>
//       ) : (
//         <Card>
//           <CardContent className="text-center p-6">
//             <p>No audio saved yet.</p>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }
'use client'

import { useAuth, useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { FiTrash } from "react-icons/fi"; // Importing a trash icon from react-icons
import Swal from "sweetalert2"; // Import SweetAlert2

// Create a SweetAlert2 instance

export default function History() {
  const [userAudios, setUserAudios] = useState([]);
  const { isSignedIn, userId } = useAuth();
  const [Userdata, setUserData] = useState([]);
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  const TruncatedText = ({ text }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <div>
        <p
          className={`text-sm text-gray-600 font-medium break-words font-sans ${
            !isExpanded ? "line-clamp-2" : ""
          }`}
        >
          {text}
        </p>
        {text.split(" ").length > 10 && ( // Show "Read More" if text is long
          <button
            className="text-white mt-1 text-sm"
            style={{ backgroundColor: "#9b5de5" }}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
    );
  };

  const fetchUserAudios = async () => {
    try {
      // Show the Swal loader
      Swal.fire({
        title: "Fetching your saved audios...",
        text: "Please wait.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); // Show loading spinner
        },
      });

      const { data } = await axios.get(
        `/api/getUserData?email=${encodeURIComponent(email)}`
      );
      setUserData(data.UserSavedData);

      // Close the Swal loader after fetching
      Swal.close();
    } catch (error) {
      console.error("Error fetching audio URLs:", error);

      // Close the Swal loader and show an error message
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to fetch your saved audios. Please try again later.",
      });
    }
  };

  const deleteAudio = async (id) => {
    try {
      await axios.delete(`/api/delete?id=${id}`);
      fetchUserAudios(); // Refresh the list after deleting
    } catch (error) {
      console.error("Error deleting audio:", error);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchUserAudios();
    }
  }, [isSignedIn]);

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <Link href="/">
        <Button className="p-4 text-xl" style={{ backgroundColor: "#9b5de5" }}>
          Back
        </Button>
      </Link>
      <h1 className="text-2xl font-bold mb-6">Your Audio History</h1>
      {Userdata.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {Userdata.map((audio) => (
            <Card key={audio._id} className="w-full">
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-lg">Audio</CardTitle>
              </CardHeader>
              <CardContent>
                <TruncatedText text={audio.text} />
                <div className="flex justify-between items-center">
                  <audio controls className="w-80 mb-4 mt-2">
                    <source src={audio.audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  <button
                    onClick={() => deleteAudio(audio._id)}
                    className="text-black hover:text-gray-300 h-12 bg-red-500 rounded-md"
                  >
                    <FiTrash size={40} />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center p-6">
            <p>No audio saved yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
