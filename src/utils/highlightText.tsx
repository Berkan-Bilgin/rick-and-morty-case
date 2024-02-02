export const highlightText = (
  text: string,
  part: string
): (string | JSX.Element)[] => {
  const parts = text.split(new RegExp(`(${part})`, "gi"));
  return parts.map((part, index) =>
    part.toLowerCase() === text.toLowerCase() ? ( // Bu satır muhtemelen hatalı, düzeltilmesi gerekiyor.
      <b key={index}>{part}</b>
    ) : (
      part
    )
  );
};
