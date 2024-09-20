import React from "react";

const Mountain = () => {
  const data = [
    {
      title: "Mentone",
      content: "Nhà cho thuê",
    },
    {
      title: "Sedona",
      content: "Chỗ ở cho thuê phù hợp với thú cưng",
    },
    {
      title: "Helen",
      content: "Căn hộ cao cấp cho thuê",
    },
    {
      title: "Pine Mountain",
      content: "Nhà nghỉ dưỡng cho thuê",
    },
    {
      title: "Stone Mountain",
      content: "Cabin cho thuê",
    },
    {
      title: "Island Park",
      content: "Cabin cho thuê",
    },
    {
      title: "Blue Mountains",
      content: "Nhà nghỉ thôn dã cho thuê",
    },
    {
      title: "Asheville",
      content: "Nhà nghỉ thôn dã cho thuê",
    },
    {
      title: "Blowing Rock",
      content: "Nhà nghỉ thôn dã cho thuê",
    },
    {
      title: "Boone",
      content: "Nhà nghỉ dưỡng cho thuê ",
    },
    {
      title: "Hochatown",
      content: "Nhà nghỉ dưỡng cho thuê",
    },
    {
        title: "Pigeon Forge",
        content: "Nhà nghỉ dưỡng cho thuê ",
      },
      {
        title: "Townsend",
        content: "Nhà nghỉ dưỡng cho thuê",
      },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-7">
      {data.map((item, index) => {
        return (
          <div className="space-y-[-4px] cursor-pointer">
            <h3 className="text-[15px] font-medium">{item.title}</h3>
            <p className="text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
              {item.content}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Mountain;
