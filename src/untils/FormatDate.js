export const FormatDate = (time) => {
    if (time && Array.isArray(time)) {
      const date = new Date(Date.UTC(...time));
      const dateString = date.toISOString().split("T")[0];
      return dateString;
    } else {
      return null;
    }
  };