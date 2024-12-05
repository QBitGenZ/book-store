// export const getMessageAPI = async (data) => {
//   return await fetch(process.env.CHATBOT_API, {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${process.env.CHATBOT_API_KEY}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       input: {
//         data,
//       },
//     }),
//   }
//   );
// };