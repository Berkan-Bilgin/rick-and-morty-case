"use client";
import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, Stack, Box, Typography } from "@mui/material";

export default function FilteredCharacterSelect() {
  const [inputValue, setInputValue] = useState("");
  const [characters, setCharacters] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!inputValue || !open) return;

    const url = `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(
      inputValue
    )}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCharacters(data.results || []))
      .catch((error) =>
        console.error("Fetching filtered characters failed", error)
      );
  }, [inputValue, open]);

  const highlightText = (text, part) => {
    const parts = text.split(new RegExp(`(${part})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === inputValue.toLowerCase() ? (
        <b key={index}>{part}</b>
      ) : (
        part
      )
    );
  };

  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        id="filtered-characters-select"
        options={characters}
        getOptionLabel={(option) => option.name}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        renderOption={(props, option) => (
          <Box
            component="li"
            {...props}
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          >
            <img
              loading="lazy"
              width="50"
              src={option.image}
              alt={option.name}
            />
            <Typography variant="body2" color="textPrimary">
              {highlightText(option.name, inputValue)}
            </Typography>
            - {option.episode.length} episodes
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Select Rick and Morty Characters"
            placeholder="Type to search..."
          />
        )}
      />
    </Stack>
  );
}
