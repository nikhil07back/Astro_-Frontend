// import React, { useEffect, useState } from "react";
// import { Card, Modal, Button } from "react-bootstrap";
// import { getDynamic } from "../../API/astroProfile";
// import { useLocation } from "react-router-dom";
// import config from "../../config/config";
// import { useNavigate } from "react-router-dom";
// import { getGeneralSetting } from "../../API/GeneralSett/generalSetting";
// import "./Profile.css";

// const ProfilePage = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [userData, setUserData] = useState(null);
//     const [siteName, setSiteName] = useState("");
//     const [imageExists, setImageExists] = useState(true);
//     const [availableBalance, setAvailableBalance] = useState(
//         location.state.availableBalance
//     );
//     const [imageUrl, setImageUrl] = useState(null);
//     const [CallPrice, setCallPrice] = useState("");
//     const [chartPrice, setChartPrice] = useState("");

//     const [showInsufficientBalance, setShowInsufficientBalance] = useState(false);
    

    
//     const [loading, setLoading] = useState(true);
    

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await getGeneralSetting();
//                 setSiteName(response.data?.data[0].siteName);
//                 setLoading(false);
//             } catch (error) {
//                 console.log(error);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);


//     useEffect(() => {
//         if (location.state.image) {
//             setImageUrl(`${config.siteUrl}${location.state.image}`);
//         } else {
//             setImageUrl("");
//         }
//         getAllDynamic();
//     }, [location.state.image]);

//     const getAllDynamic = async () => {
//         const userId = location.state.id;
//         try {
//             const response = await getDynamic(userId);
//             setUserData(response.data?.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         if (location.state.image && imageExists) {
//             checkImageExists(`${config.siteUrl}${location.state.image}`).then(
//                 (exists) => {
//                     setImageExists(exists);
//                 }
//             );
//         }
//     }, [location.state.image, imageExists]);

//     const checkImageExists = (url) => {
//         return new Promise((resolve) => {
//             const img = new Image();
//             img.onload = () => {
//                 resolve(true);
//             };
//             img.onerror = () => {
//                 resolve(false);
//             };
//             img.src = url;
//         });
//     };

//     const StartChat = () => {
//         const access = localStorage.getItem("accessToken");
//         if (!access) {
//             return navigate("/VerifyOtpPage");
//         }
//         const id = location.state.id;
//         const name = location.state.name;
//         if (availableBalance < 700) {
//             setShowInsufficientBalance(true);
//         } else {
//             return navigate("/Chatpage", { state: { id, name } });
//         }
//     };

//     const RechargeNow = () => {
//         navigate("/Add");
//     };

//     const StartCall = () => {
//         const access = localStorage.getItem("accessToken");
//         if (!access) {
//             return navigate("/VerifyOtpPage");
//         }
//         if (availableBalance < 750) {
//             setShowInsufficientBalance(true);
//         } else {
//             return navigate("/Callpage");
//         }
//     };

//     return (
       
       
       
       
       
//         <div
//             style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
//         >
//             {loading ? (
//                 <ProfileSkeleton />
//             ) : (
//                 <ProfileCard
//                     userData={userData}
//                     imageUrl={imageUrl}
//                     siteName={siteName}
//                     availableBalance={availableBalance}
//                     StartChat={StartChat}
//                     StartCall={StartCall}
//                     setShowInsufficientBalance={setShowInsufficientBalance}
//                     navigate={navigate}
//                     config={config}
//                 />
//             )}
//             <Modal
//                 show={showInsufficientBalance}
//                 onHide={() => setShowInsufficientBalance(false)}
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title>Insufficient Balance</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>Please recharge your account to continue.</Modal.Body>
//                 <Modal.Footer>
//                     <Button
//                         variant="outline-secondary"
//                         onClick={() => setShowInsufficientBalance(false)}
//                     >
//                         Close
//                     </Button>
//                     <Button variant="outline-success" onClick={RechargeNow}>
//                         Recharge Now
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// const ProfileSkeleton = () => {
//     return (
//         <Card
//             style={{
//                 width: "90%",
//                 maxWidth: "900px",
//                 boxShadow: "0px 0px 4px 2px rgba(0, 0, 0, 0.1)",
//                 padding: "20px",
//             }}
//         >
//             <div className="row">
//                 <div className="col-md-4">
//                     <div
//                         style={{
//                             textAlign: "center",
//                             height: "228px",
//                             width: "228px",
//                             backgroundColor: "#f0f0f0",
//                             borderRadius: "100%",
//                         }}
//                     ></div>
//                 </div>
//                 <div className="col-md-8">
//                     <div
//                         style={{
//                             height: "1.4rem",
//                             width: "50%",
//                             backgroundColor: "#f0f0f0",
//                             marginBottom: "1rem",
//                         }}
//                     ></div>
//                     <div
//                         style={{
//                             height: "1rem",
//                             width: "100%",
//                             backgroundColor: "#f0f0f0",
//                             marginBottom: "1rem",
//                         }}
//                     ></div>
//                     <div
//                         style={{
//                             height: "1rem",
//                             width: "80%",
//                             backgroundColor: "#f0f0f0",
//                             marginBottom: "1rem",
//                         }}
//                     ></div>
//                     <div
//                         style={{
//                             height: "1rem",
//                             width: "70%",
//                             backgroundColor: "#f0f0f0",
//                             marginBottom: "1rem",
//                         }}
//                     ></div>
//                     <div
//                         style={{
//                             height: "3.3rem",
//                             width: "100%",
//                             backgroundColor: "#f0f0f0",
//                             marginBottom: "1rem",
//                         }}
//                     ></div>
//                     <div
//                         style={{
//                             height: "3.3rem",
//                             width: "100%",
//                             backgroundColor: "#f0f0f0",
//                         }}
//                     ></div>
//                 </div>
//             </div>
//             <div style={{ textAlign: "center", marginTop: "2rem" }}>
//                 <h5
//                     style={{
//                         color: "#454545",
//                         backgroundColor: "#f0f0f0",
//                         width: "50%",
//                         height: "1rem",
//                     }}
//                 ></h5>
//             </div>
//             <p
//                 style={{
//                     padding: "20px",
//                     marginTop: "-2%",
//                     backgroundColor: "#f0f0f0",
//                 }}
//             ></p>
//         </Card>
//     );
// };

// const ProfileCard = ({
//     userData,
//     imageUrl,
//     siteName,
//     availableBalance,
//     StartChat,
//     StartCall,
//     setShowInsufficientBalance,
//     navigate,
//     config,
// }) => {
//     return (
//         <Card
//             style={{
//                 width: "90%",
//                 maxWidth: "900px",
//                 boxShadow: "0px 0px 4px 2px rgba(0, 0, 0, 0.1)",
//                 padding: "20px",
//             }}
//         >
//             <div className="row">
//                 <div className="col-md-4">
//                     <div style={{ textAlign: "center" }}>
//                         {imageUrl && (
//                             <img
//                                 src={
//                                     "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
//                                 }
//                                 alt="frontpage"
//                                 style={{
//                                     borderRadius: "100%",
//                                     width: "228px",
//                                     height: "228px",
//                                     border: "0px",
//                                 }}
//                             />
//                         )}
//                     </div>
//                 </div>
//                 <div className="col-md-8" style={{ textAlign: "left" }}>
//                     <p>
//                         <b style={{ fontSize: "1.4rem" }}>{userData?.name}</b>
//                     </p>
//                     <p>{userData?.expertise}</p>
//                     <p>{userData?.languages}</p>
//                     <p>Exp: {userData?.experience}</p>
//                     <div className="row">
//                         <div className="col-md-6">
//                             <button
//                                 style={{
//                                     height: "3.3rem",
//                                     border: "green",
//                                     background: "#FFFFFF",
//                                     border: "1px solid green",
//                                     borderRadius: "6rem",
//                                     width: "100%",
//                                     margin: "5px 0px",
//                                 }}
//                                 onClick={StartChat}
//                             >
//                                 Start Chat
//                             </button>
//                         </div>
//                         <div className="col-md-6">
//                             <button
//                                 style={{
//                                     height: "3.3rem",
//                                     border: "green",
//                                     background: "#FFFFFF",
//                                     border: "1px solid green",
//                                     borderRadius: "6rem",
//                                     width: "100%",
//                                     margin: "5px 0px",
//                                 }}
//                                 onClick={StartCall}
//                             >
//                                 Start Call
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div>
//                 <div style={{ textAlign: "center", marginTop: "2rem" }}>
//                     <h5>
//                         <b style={{ color: "#454545" }}>About {siteName}</b>
//                     </h5>
//                 </div>
//                 <p style={{ padding: "20px", marginTop: "-2%" }}>
//                     {userData?.aboutAstrologer}
//                 </p>
//             </div>
//         </Card>
//     );
// };

// export default ProfilePage;
