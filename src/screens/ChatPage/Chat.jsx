import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { chatDetails, getAllMessages } from "../../API/chatAPI";
import { v4 as uuidv4 } from "uuid";
import {
  SendOutlined,
  AudioOutlined,
  LinkOutlined,
  CameraOutlined,
  MehOutlined,
} from "@ant-design/icons";
// import img from "../../img/social-networks-dating-apps-vector-seamless-pattern_341076-469.avif";
import { MdMoreVert } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { getAstroPrice } from "../../API/EditPrice.Api";
import { getUser } from "../../API/useRegistrationAPI";
const Chat = ({
  socket,
  username,
  room,
  astroId,
  usersId,
  toUsername,
  userType,
  availableBalance,
  userDetails,
}) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [canSendMessage, setCanSendMessage] = useState(true);
  const [getStatus, setStatus] = useState(true);
  

  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [getReply, setReply] = useState(null);
  const [getAvailableBalance, setAvailableBalance] = useState(availableBalance);
  const [chartPrice, setChartPrice] = useState("");
  
  // const [chatId, setChatId] = useState(null);
  // const generateChatId = () => {
  //   const userId = getUserId();
  //   const timestamp = Date.now();
  //   const uniqueId = `${userId}_${timestamp}`;
  //   setChatId(uniqueId);
  // };
  const getUserId = () => {
    return uuidv4();
  };

  const getPrice = async () => {
    try {
      const userId = localStorage.getItem("id");
      const userResponse = await getUser(userId);

      console.log("userResponse --- ",userResponse?.data?.data?.wailet);
      setAvailableBalance(userResponse?.data?.data?.wailet);
      const response = await getAstroPrice();
      setChartPrice(response.data?.data?.chatPrice);  
    } catch (error) {
      console.error(error);
    }
  };

  // const handleChatStart = () => {
  //   generateChatId();
  // };

  const toggleMenu = (index) => {
    setOpenMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const userID = localStorage.getItem("id");

  const sendMessage = async () => {
    // if (availableBalance < "10") {
    //   setCanSendMessage(false);
    //   return;
    // }
    console.log("currentMessage ggg", currentMessage);
    if (currentMessage !== "") {
      const userId = getUserId();
      const timestamp = Date.now();
      const uniqueId = `${userId}_${timestamp}`;
      // setChatId(uniqueId);
      console.log("chatId qqqqqqqqq", uniqueId);

      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        messageFromUser: usersId,
        messageToUser: astroId,
        userID: userID,
        userType: userType,
        msgType: "manual",
        chatId: uniqueId,
        reply: getReply ? getReply : "",
        seen: false
      };

      const g = await socket.emit("send_message", messageData);
      await socket.emit("seen", { messageId: messageData.chatId });
      if (g.connected) {
        console.log("messagessssData", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
        setReply("");

        const response = await chatDetails(messageData);
        //console.log(response);
        console.log(response?.data.status);
        if (response?.data.status === 0) {
        }

        setAvailableBalance(response?.data.availableBalnce);
      } else {
      }
    } else {
      console.log("Empty msg");
    }
  };
  useEffect(() => {
    // handleChatStart();
    // console.log("amerrriiiiiacaaaaaaaaaaayyyyyaaaaaa",astrosName);
    getPrice();
    socket.on("receive_message", (data) => {
      console.log("receive_message", data);
      setMessageList((list) => [...list, data]);
    });

    // Listen for 'messageSeen' event from the server
    //  socket.on('messageSeen', (data) => {
    //   // Update the messages array with 'seen' status for the message with the corresponding ID
    //   console.log("messageSeen",data);
    //   setMessageList(messageList.map(msg => {
    //     console.log("msg",msg);
    //     if (msg.chatId === data.messageId) {

    //       return { ...msg, seen: true };
    //     }
    //     return msg;
    //   }));
    // });
    console.log("usernameeeeeeeeeeeeewwwwwwwwwwww", astroId);

    setTimeout(() => {
      setStatus(false);
    }, 4000);
    getAllMsg();
    return () => {
      socket.off("newMessage");
      socket.off("messageSeen");
    };
  }, [room]);
  const getAllMsg = async () => {
    try {
      const response = await getAllMessages(room);
      console.log("here", response.data);
      if (response.data.data.length > 0) {
        setMessageList(response.data.data);
      } else {
        if (userType === "user") {
          console.log(" userDetails go: ", userDetails);
          const userDetailz = userDetails.dob;
          const parsedDate = new Date(userDetailz);
          const formattedDate = parsedDate.toISOString().split("T")[0];
          const parts = formattedDate.split("-");
          const formattedDate1 = parts[2] + "-" + parts[1] + "-" + parts[0];
          console.log("formattedDateeeee", formattedDate1);

          const oneTimemsg = `<p><b>Below are my details:</b></p>
        <p>Name: ${userDetails.name}</p>
        <p>Gender: ${userDetails.gender}</p>
        <p>DOB: ${formattedDate1}</p>
        <p>TOB: ${userDetails.tob}</p>
        <p>POB: ${userDetails.pob}</p>
        `;
          console.log("oneTimemsgggggg", oneTimemsg);
          const automail = `<p>This is automated message</p>`;

          setTimeout(() => {
            oneTimeSendMsg(oneTimemsg);
          }, 2000);

          setTimeout(() => {
            oneTimeSendMsg(automail);
          }, 3000);
        }
        setMessageList([]);
      }
    } catch (error) {
      console.log("errorrr", error);
    }
  };

  const oneTimeSendMsg = async (currentMessage) => {
    const messageData = {
      room: room,
      author: username,
      message: currentMessage,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
      messageFromUser: usersId,
      messageToUser: astroId,
      userID: userID,
      userType: userType,
      msgType: "auto",
    };

    const g = await socket.emit("send_message", messageData);
    if (g.connected) {
      console.log("messagessssData", messageData);

      const response = await chatDetails(messageData);
      console.log(response);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    } else {
    }
  };

  const onReply = (msg) => {
    const msgg = msg.slice(0, 20);
    console.log(msgg + "....");
    setReply(msgg + "....");
    setOpenMenuIndex("0");
  };

  return (
    <>
      <div className="chat-window">
        <div className="chat-header">
          <div
            style={{
              // height: "2.5rem",
              // width: "3%",
              // background: "gray",
              // borderRadius: "2rem",
            }}
          ></div>
          <div style={{ width: "100%", textAlign: "left" }}>
            <p>{toUsername}</p>
          </div>
          {userType === "user" && (
          <div style={{ width: "100%", textAlign: "right" }}>
            <p>Available Balance - {getAvailableBalance}</p>
          </div>
          )}
        </div>

        {/* <div className="chat-body" style={{backgroundImage:URL(img)}}> */}
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent, index) => {
              const isMenuOpen = openMenuIndex === index;
              return (
                <div
                  key={index}
                  className="message"
                  id={
                    usersId === messageContent.messageFromUser ? "other" : "you"
                  }
                >
                  <div>
                    <div
                      style={{
                        // background: "white",
                        display: "flex",
                        justifyContent: "flex-end",
                        float: "right",
                        padding: "2px 5px",
                        color: "white",
                        position: "relative",
                      }}
                    >
                      {usersId != messageContent.messageFromUser &&
                      messageContent.reply ? (
                        <div
                          onClick={() => toggleMenu(index)}
                          style={{
                            position: "absolute",
                            top: messageContent.reply ? "25px" : "0",
                          }}
                        >
                          <MdMoreVert size={20} />
                        </div>
                      ) : userType !== "user" ? (
                        <div
                          onClick={() => toggleMenu(index)}
                          style={{
                            position: "absolute",
                            top: messageContent.reply ? "25px" : "0",
                            cursor:"pointer"
                          }}
                        >
                          <MdMoreVert size={20} />
                        </div>
                      ) : null}

                      {isMenuOpen && (
                        <div className="parentMenu">
                          <div className="childMenu">
                            <div
                              style={{ borderBottom: "1px solid #07070740", cursor:"pointer" }}
                              onClick={() => onReply(messageContent.message)}
                            >
                              <a>Reply</a>
                            </div>
                            {/* <div>
                              <a>Delete</a>
                            </div> */}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      {messageContent.reply ? (
                        <div className="replyBody">
                          <div>{messageContent.reply}</div>
                        </div>
                      ) : null}
                      <div
                        className="message-content"
                        dangerouslySetInnerHTML={{
                          __html: messageContent.message,
                        }}
                      ></div>
                      {/* {messageContent.seen? <span>{messageContent.seen} : Seen</span>:<span>{messageContent.seen}: Sent</span>} */}
                    </div>

                    <div className="message-meta">
                      <p id="time">{messageContent.time}</p>
                      <p id="author">
                        {messageContent.msgType != "auto"
                          ? messageContent.author
                          : null}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>

        {getReply ? (
          <div className="chatReply">
            <div className="cross" onClick={() => setReply("")}>
              <AiOutlineClose />
            </div>
            <p className="replyContent">{getReply}</p>
          </div>
        ) : null}

        {getAvailableBalance >= chartPrice || userType != "user" || getReply ? (
          <div className="chat-footer">
            <textarea
              style={{ resize: "none" }}
              value={currentMessage}
              placeholder="Write Something..."
              autoFocus
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              // onKeyPress={(event) => {
              //   event.key === "Enter" && sendMessage();
              // }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              id="ChatTextarea"
            />
            <div style={{ marginTop: ".3rem" }}>
              <SendOutlined
                style={{
                  backgroundColor: "royalblue",
                  padding: ".5rem .8rem .5rem 1.2rem",
                  borderRadius: "2rem",
                  color: "#FFFFFF",
                  marginLeft: "-12vh",
                  marginTop: ".2rem",
                }}
                onClick={sendMessage}
              />
            </div>
            {!canSendMessage && (
              <p style={{ color: "red", marginTop: ".5rem" }}>
                You cannot send messages. Available balance is less than 10
                rupees.
              </p>
            )}
          </div>
        ) : (
          <div className="chat-footer">
            <p
              style={{
                color: "red",
                marginTop: "auto",
                textAlign: "center",
                width: "100%",
              }}
            >
              You cannot send messages. Insufficient balance in your wallet.
            </p>
          </div>
        )}
      </div>

      {getStatus ? (
        <div
          style={{
            position: "fixed",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            background: "#ccbdbded",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignSelf: "center",
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              fontSize: "18px",
              fontWeight: 600,
              fontFamily: "emoji",
            }}
          >
            Please Wait.....
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Chat;
