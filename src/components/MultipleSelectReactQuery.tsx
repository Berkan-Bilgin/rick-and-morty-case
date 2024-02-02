// "use client";
// import React, { useState } from "react";
// import { useQuery } from "react-query";
// import {
//   Autocomplete,
//   TextField,
//   Stack,
//   Box,
//   Typography,
//   CircularProgress,
// } from "@mui/material";

// async function fetchCharacters(name) {
//   const response = await fetch(
//     `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(
//       name
//     )}`
//   );
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// }

// export default function MultipleSelectReactQuery() {
//   const [inputValue, setInputValue] = useState("");
//   const [open, setOpen] = useState(false);

//   const { data, isLoading, isError, error } = useQuery(
//     ["fetchCharacters", inputValue],
//     () => fetchCharacters(inputValue),
//     {
//       // Sadece kullanıcı bir şey yazdığında ve autocomplete açıkken istek yap
//       enabled: !!inputValue && open,
//     }
//   );

//   const characters = data?.results || [];

//   const highlightText = (text, part) => {
//     const parts = text.split(new RegExp(`(${part})`, "gi"));
//     return parts.map((part, index) =>
//       part.toLowerCase() === inputValue.toLowerCase() ? (
//         <b key={index}>{part}</b>
//       ) : (
//         part
//       )
//     );
//   };

//   return (
//     <Stack spacing={3} sx={{ width: 500 }}>
//       <Autocomplete
//         multiple
//         id="filtered-characters-select"
//         options={characters}
//         getOptionLabel={(option) => option.name}
//         onInputChange={(event, newInputValue) => {
//           setInputValue(newInputValue);
//         }}
//         open={open}
//         onOpen={() => setOpen(true)}
//         onClose={() => setOpen(false)}
//         renderOption={(props, option) => (
//           <Box
//             component="li"
//             {...props}
//             sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
//           >
//             <img
//               loading="lazy"
//               width="50"
//               src={option.image}
//               alt={option.name}
//             />
//             <Typography variant="body2" color="textPrimary">
//               {highlightText(option.name, inputValue)}
//             </Typography>
//             - {option.episode.length} episodes
//           </Box>
//         )}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             variant="standard"
//             label="Select Rick and Morty Characters"
//             placeholder="Type to search..."
//             InputProps={{
//               ...params.InputProps,
//               endAdornment: (
//                 <>
//                   {isLoading ? (
//                     <CircularProgress color="inherit" size={20} />
//                   ) : null}
//                   {params.InputProps.endAdornment}
//                 </>
//               ),
//             }}
//           />
//         )}
//       />
//     </Stack>
//   );
// }
