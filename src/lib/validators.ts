export const isValidEmail = (email: string) => {
  const emailList = email.split(",").map((e: string) => e.trim());
  if (emailList.length > 1) {
    return false; // Multiple emails detected.
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(emailList[0]);
}; 