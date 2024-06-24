import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./Chat";
import "./stylez.css";
import { useLocation } from "react-router-dom";
import { getAstrologerID, getUserForAstrologer } from "../../API/chatAPI";
//import { ButtonGroup } from "react-bootstrap";
import config from "../../config/config";

const socket = io.connect(config.socketUrl, {
  transports: ["websocket"],
});

const ChatPage = () => {
  
  const [username, setUsername] = useState("govindk");
  const [toUsername, setTOUsername] = useState("govindk");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [toUsers, setToUsers] = useState("");
  const location = useLocation();
  const [userDetails, setUserDetails] = useState("");
  console.log("userDetailssssssssssss", userDetails);

  const astrologerName = localStorage.getItem("astrologerName");
  const astroId = location?.state?.id;
  const availableBalance = location?.state?.availableBalance;
  console.log("what is thisssss", availableBalance);
  const usersId = localStorage.getItem("id");
  const userType = localStorage.getItem("userType");
  console.log("location rajni: ", location);

  const saveAstroId = async (userID, username) => {
    console.log("username", username);
    
    setToUsers(userID);
    try {
      const data = {
        astroId: userID,
        userType: userType,
      };
      const response = await getAstrologerID(data);
      socket.emit("join_room", response.data.data.roomId);
      setRoom(response.data.data.roomId);
      setUsername(username);
      setShowChat(true);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await getUserForAstrologer({});
      setAllUsers(response.data.userDetails);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    const socket = io.connect(config.socketUrl, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Socket connected successfully!");
      console.log(`User Connected: ${socket.id}`);
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });
    socket.on("messageCountUpdate", (data) => {
      const updatedUsers = allUsers.map((user) =>
        user.id === data.userId ? { ...user, messageCount: data.messageCount } : user
      );
      setAllUsers(updatedUsers);
    });


    if (userType === "astrologer") {
      getUserDetails();
      const username = localStorage.getItem("Astroname");
    } else {
      const username = localStorage.getItem("userName");
      const astroName = location?.state?.name;
      console.log("astroName", astroName);
      setTOUsername(astroName);
      saveAstroId(astroId, username);
    }

    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    if (location.state) {
      console.log("location.state govind", location.state);
      const udetails = {
        name: location?.state?.name,
        gender: location?.state?.gender,
        dob: location?.state?.dob,
        tob: location?.state?.tob,
        pob: location?.state?.pob,
      };
      setUserDetails(udetails);
    }
  }, [location.state]);

  return (
    <div className="Appi">
      {userType != "user" ? (
        <div style={{ borderRight: "1px solid #c6c0c0" }}>
          <ol
            style={{
              listStyle: "none",
              width: "25vh",
              textAlign: "start",
              margin: "0px",
              padding: "0px",
            }}
          >
            {allUsers.map((user, index) => (
              <li
                key={index}
                onClick={() => {
                  console.log("this is user", user);
                  setToUsers(user.fromUser);
                  saveAstroId(user.fromUser, localStorage.getItem("Astroname"));
                  setTOUsername(user.Username);
                  setAllUsers(prevUsers => prevUsers.map(prevUser => {
                      if (prevUser === user) {
                      return {...prevUser, clicked: true};
                    }
                    return {...prevUser, clicked: false};  
                  }));
                }}
                style={{
                  // backgroundColor: "lightgray",
                  padding: "15px 10px",
                  // width:"100%",
                  // alignItems:"center",
                  // height:"6vh",
                  borderBottom: "1px solid #dad8d8",
                  position:"relative",
                  backgroundColor: user.clicked ? "#e8e8e8" : "inherit",
                  cursor:"pointer",
                }}
                className="list-item"
              >
                {user.Username}{" "}
                {/* <span style={{position:"absolute", right:"10px"}}>
                  <span
                    style={{ 
                      backgroundColor: "green",
                      borderRadius: "50px",
                      padding: "3px 7px",
                      width: "100%",
                      fontSize: "10px",
                      color: "#ffffff",
                    }}
                  >
                    <b>{user.messageCount}</b>
                  </span>
                </span> */}
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {!showChat ? null : (
        <Chat
          socket={socket}
          username={username}
          room={room}
          astroId={astroId ? astroId : toUsers}
          usersId={usersId}
          toUsername={toUsername}
          // userID={userID}
          userType={userType}
          availableBalance={availableBalance}
          userDetails={userDetails}
        />
      )}
    </div>
  );
};

export default ChatPage;
//
