export const fetcher = (
  ...args: [input: RequestInfo, init?: RequestInit | undefined]
) =>
  fetch(...args).then((res) => {
    if (!res.ok) {
      throw new Error("An error occurred while fetching the data.");
    }
    return res.json();
  });
