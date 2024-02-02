export const highlightText = (
  text: string,
  part: string,
  inputValue: string
): (string | JSX.Element)[] => {
  const parts = text.split(new RegExp(`(${part})`, "gi"));
  return parts.map((part, index) =>
    part.toLowerCase() === inputValue.toLowerCase() ? (
      <b key={index}>{part}</b>
    ) : (
      part
    )
  );
};
