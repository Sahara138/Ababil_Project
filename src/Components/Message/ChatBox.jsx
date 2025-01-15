// import { useState } from "react";
// import {
//   Box,
//   Container,
//   Paper,
//   TextField,
//   IconButton,
//   Typography,
//   Avatar,
//   Grid
// } from "@mui/material";
// import { styled } from "@mui/system";
// import { IoSend } from "react-icons/io5";

// const ChatContainer = styled(Box)(({ theme }) => ({
//   height: "90vh",
//   display: "flex",
//   flexDirection: "column",
//   backgroundColor: "#f5f5f5",
//   borderRadius: theme.spacing(2),
//   overflow: "hidden"
// }));

// const MessagesContainer = styled(Box)({
//   flex: 1,
//   overflowY: "auto",
//   padding: "20px",
//   "&::-webkit-scrollbar": {
//     width: "8px"
//   },
//   "&::-webkit-scrollbar-track": {
//     background: "#f1f1f1"
//   },
//   "&::-webkit-scrollbar-thumb": {
//     background: "#888",
//     borderRadius: "4px"
//   }
// });

// const MessageBubble = styled(Paper)(({ isOwner }) => ({
//   padding: "10px 15px",
//   maxWidth: "70%",
//   marginBottom: "10px",
//   backgroundColor: isOwner ? "#1976d2" : "#fff",
//   color: isOwner ? "#fff" : "#000",
//   alignSelf: isOwner ? "flex-end" : "flex-start"
// }));

// const InputContainer = styled(Box)({
//   padding: "20px",
//   backgroundColor: "#fff",
//   borderTop: "1px solid #e0e0e0"
// });

// const ChatApp = () => {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       sender: "John Doe",
//       content: "Hey, how are you?",
//       timestamp: "10:00 AM",
//       avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
//       isOwner: false
//     },
//     {
//       id: 2,
//       sender: "Me",
//       content: "I'm doing great! How about you?",
//       timestamp: "10:02 AM",
//       avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
//       isOwner: true
//     },
//     {
//       id: 3,
//       sender: "John Doe",
//       content: "Pretty good! What are your plans for the weekend?",
//       timestamp: "10:03 AM",
//       avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
//       isOwner: false
//     }
//   ]);

//   const [newMessage, setNewMessage] = useState("");

//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       const message = {
//         id: messages.length + 1,
//         sender: "Me",
//         content: newMessage,
//         timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//         avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
//         isOwner: true
//       };
//       setMessages([...messages, message]);
//       setNewMessage("");
//     }
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === "Enter" && !event.shiftKey) {
//       event.preventDefault();
//       handleSendMessage();
//     }
//   };

//   return (
//     <Container maxWidth="md">
//       <ChatContainer>
//         <MessagesContainer>
//           {messages.map((message) => (
//             <Grid
//               container
//               spacing={2}
//               key={message.id}
//               direction={message.isOwner ? "row-reverse" : "row"}
//               alignItems="flex-start"
//               sx={{ mb: 2 }}
//             >
//               <Grid item>
//                 <Avatar
//                   src={message.avatar}
//                   alt={message.sender}
//                   sx={{ width: 40, height: 40 }}
//                 />
//               </Grid>
//               <Grid item xs={9}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: message.isOwner ? "flex-end" : "flex-start"
//                   }}
//                 >
//                   <Typography variant="subtitle2" color="textSecondary">
//                     {message.sender}
//                   </Typography>
//                   <MessageBubble isOwner={message.isOwner}>
//                     <Typography variant="body1">{message.content}</Typography>
//                   </MessageBubble>
//                   <Typography
//                     variant="caption"
//                     color="textSecondary"
//                     sx={{ mt: 0.5 }}
//                   >
//                     {message.timestamp}
//                   </Typography>
//                 </Box>
//               </Grid>
//             </Grid>
//           ))}
//         </MessagesContainer>
//         <InputContainer>
//           <Grid container spacing={2} alignItems="center">
//             <Grid item xs>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 placeholder="Type a message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 size="small"
//               />
//             </Grid>
//             <Grid item>
//               <IconButton
//                 color="primary"
//                 onClick={handleSendMessage}
//                 disabled={!newMessage.trim()}
//               >
//                 <IoSend />
//               </IconButton>
//             </Grid>
//           </Grid>
//         </InputContainer>
//       </ChatContainer>
//     </Container>
//   );
// };

// export default ChatApp;