"use client";
import React, { useState } from "react";
import useSWR from "swr";
import {
  Autocomplete,
  TextField,
  Stack,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function MultipleSelectSWR() {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const { data, error, isLoading } = useSWR(
    open && inputValue
      ? `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(
          inputValue
        )}`
      : null,
    fetcher
  );

  const characters = data?.results || [];

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
      {/* Hata durumunda bir uyarı mesajı göster */}
      {error && <Alert severity="error">Failed to load data!</Alert>}
      <Autocomplete
        multiple
        id="filtered-characters-select"
        options={characters}
        getOptionLabel={(option: any) => option.name}
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
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </Stack>
  );
}

export default MultipleSelectSWR;
