export const parseError = async (response: Response) => {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json(); // JSON error response
  } else {
    return { status: response.status, message: await response.text() }; // Fallback for plain text errors
  }
};
