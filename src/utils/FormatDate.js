export const FormatDate = (time) => {
    if (time && Array.isArray(time)) {
      const date = new Date(Date.UTC(...time));
      return date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear();
    } else {
      return null;
    }
  };