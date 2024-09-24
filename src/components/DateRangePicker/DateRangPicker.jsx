import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setEndDateR,
  setStartDateR,
} from "../../redux/SliceUser/InforBookingSlice";
import { DateRangePicker } from "react-date-range";

const DateRangPicker = ({ setIsSelectRange, setIsSelect }) => {
  const { startDate, endDate } = useSelector(
    (state) => state.InforBookingSlice
  );
  const dispatch = useDispatch();
  const handleSelect = (ranges) => {
    setIsSelectRange(true);
    if (ranges.selection.startDate === ranges.selection.endDate)
      setIsSelect(false);
    dispatch(setStartDateR(ranges.selection.startDate));
    dispatch(setEndDateR(ranges.selection.endDate));
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  };
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  return (
    <div>
      <DateRangePicker
        className="mt-5"
        ranges={[selectionRange]}
        minDate={new Date()}
        rangeColors={["#FD5B61"]}
        onChange={handleSelect}
      />
    </div>
  );
};

export default DateRangPicker;
