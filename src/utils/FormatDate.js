export const FormatDate = (time) => {
    if (time && Array.isArray(time)) {
      const date = new Date(Date.UTC(...time));
      return date.getDay()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    } else {
      return null;
    }
  };

  export const FormatDateBirthday = (dateString) => {
    if (typeof dateString === 'string') {
      const dateParts = dateString.split(",");
      if (dateParts.length !== 3) {
        return ""; // Trả về chuỗi rỗng nếu định dạng không hợp lệ
      }
      const [year, month, day] = dateParts;
      return `${day}/${month}/${year}`;
    } else {
      return "";
    }
  };
  
  