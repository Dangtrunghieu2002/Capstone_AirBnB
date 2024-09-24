export function formatDateString(dateString, isTrue = true) {
  // Tạo một đối tượng Date từ chuỗi ngày giờ
  const date = new Date(dateString);

  // Lấy năm, tháng và ngày từ đối tượng Date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const day = String(date.getDate()).padStart(2, "0");

  // Trả về ngày theo định dạng YYYY-MM-DD
  if (isTrue) return `${day}-${month}-${year}`;
  else return `${day} thg ${month}`
}

export function calculateDaysBetween(startDateString, endDateString) {
  // Chuyển đổi chuỗi ngày thành đối tượng Date
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  // Tính số ngày giữa hai ngày
  const timeDifference = endDate - startDate; // tính bằng milliseconds
  const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // chuyển đổi sang ngày

  return dayDifference;
}
