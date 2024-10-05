import React, { useEffect, useState } from "react";
import ContentComponent from "../../components/ListRoomComponent/ContentComponent";
import { useSearchParams } from "react-router-dom";
import { phongService } from "../../service/phong.service";
import MapboxComponent from "../../components/ListRoomComponent/MapboxComponent";
import { useDispatch } from "react-redux";
import { getLocationApiId } from "../../redux/SliceUser/viTriSlice";
const ListRoomPage = () => {
  const [searchParam] = useSearchParams();
  const [listRoom, setListRoom] = useState([]);
  const locations = [
    {
      name: "Hồ Chí Minh",
      coords: "10.7769,106.6959",
      iframe: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.114664847218!2d106.6959!3d10.7769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752c5ae3aa4535%3A0x986a74a8cb7728a5!2sTh%C3%A0nh%20ph%E1%BB%9F%20H%E1%BB%93%20Ch%C3%AD%20Minh!5e0!3m2!1sen!2s!4v1630460123456!5m2!1sen!2s"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className=" h-full xl:w-[450px] 2xl:w-[660px]"
        ></iframe>
      ),
    },
    {
      name: "Nha Trang",
      coords: "12.2388,109.1967",
      iframe: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.341877277334!2d109.1967!3d12.2388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3171a0a4536d067b%3A0xd7655d4eb3f3aa3a!2sNha%20Trang!5e0!3m2!1sen!2s!4v1630460123456!5m2!1sen!2s"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className=" h-full xl:w-[450px] 2xl:w-[660px]"
        ></iframe>
      ),
    },
    {
      name: "Cần Thơ",
      coords: "10.0451,105.7460",
      iframe: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.2407037996396!2d105.7460!3d10.0451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752c04f34e06cb%3A0x5e9d8767b91b5a9e!2sC%E1%BA%A7n%20Th%C6%A1!5e0!3m2!1sen!2s!4v1630460123456!5m2!1sen!2s"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className=" h-full xl:w-[450px] 2xl:w-[660px]"
        ></iframe>
      ),
    },
    {
      name: "Hà Nội",
      coords: "21.0285,105.8542",
      iframe: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.8792374842326!2d105.8542!3d21.0285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abfb8d84c83f%3A0xa546f2e1b49d0735!2zSMOgIEhvw6AgTmd1YXJl!5e0!3m2!1sen!2s!4v1630460123456!5m2!1sen!2s"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className=" h-full xl:w-[450px] 2xl:w-[660px]"
        ></iframe>
      ),
    },
    {
      name: "Phú Quốc",
      coords: "10.2270,103.8882",
      iframe: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.205992834706!2d103.8882!3d10.2270!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31778ef807db1d3d%3A0x409cc4563bc7c7a!2sPh%C3%BA%20Qu%E1%BB%8Dc!5e0!3m2!1sen!2s!4v1630460123456!5m2!1sen!2s"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className=" h-full xl:w-[450px] 2xl:w-[660px]"
        ></iframe>
      ),
    },
    {
      name: "Đà Nẵng",
      coords: "16.0678,108.2200",
      iframe: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.3140502800724!2d108.2200!3d16.0678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31420a7c4d4b1727%3A0x8ec3ccf47d4e28a9!2s%C4%90%C3%A0%20N%E1%BA%B9ng!5e0!3m2!1sen!2s!4v1630460123456!5m2!1sen!2s"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className=" h-full xl:w-[450px] 2xl:w-[660px]"
        ></iframe>
      ),
    },
    {
      name: "Đà Lạt",
      coords: "11.9401,108.4551",
      iframe: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.672243516232!2d108.4551!3d11.9401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317f9e0217a35f6b%3A0x421e06e11190f9c3!2zRGF0IEbDoG5nIHRoYW5nIE5ncm9uZyBhbmQgTmFuZyBsaXdlIHNwbGFzaCBsaXZpbmcgZ2FjaW5hLiBZb3UgbGFuZCB0byBkYXkgY2hhbGxlbmdlLQ!5e0!3m2!1sen!2s!4v1630460123456!5m2!1sen!2s"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className=" h-full xl:w-[450px] 2xl:w-[660px]"
        ></iframe>
      ),
    },
    {
      name: "Phan Thiết",
      coords: "10.9154,108.1045",
      iframe: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3910.7247756595407!2d108.1045!3d10.9154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31740f36f9a7f45b%3A0xd5cc70e7001f0082!2sPhan%20Thi%E1%BA%BFt!5e0!3m2!1sen!2s!4v1630460123456!5m2!1sen!2s"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className=" h-full xl:w-[450px] 2xl:w-[660px]"
        ></iframe>
      ),
    },
    {
      name: "Vĩnh Phúc",
      coords: "20.3833,105.5833",
      iframe: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.6771847695916!2d105.5833!3d20.3833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3138b303c458efbb%3A0x30c7a9e8c4e2d8d6!2zVmnhu51jaCBQaHVvZyBMw6AgQ2FuZyBsaXkgVGhlb2dvb2dvbmcgY29uY3JldGU!5e0!3m2!1sen!2s!4v1630460123456!5m2!1sen!2s"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className=" h-full xl:w-[450px] 2xl:w-[660px]"
        ></iframe>
      ),
    },
    {
      name: "Tiền Giang",
      coords: "10.3646,106.3474",
      iframe: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.816368990122!2d106.3474!3d10.3646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ca14f3f3a41%3A0x161d2a84ab7ed693!2zVGllbiBHaWFuZyBQaHVvYyDEkOG7nW5nIE5hbGxpc2luIEVudHlnb24gQ2hhbGxlbmdlIHNhcyBhbGJhbWVv!5e0!3m2!1sen!2s!4v1630460123456!5m2!1sen!2s"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className=" h-full xl:w-[450px] 2xl:w-[660px]"
        ></iframe>
      ),
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLocationApiId(searchParam.get("maViTri")));
  }, []);
  useEffect(() => {
    const maViTri = searchParam.get("maViTri");
    phongService
      .layPhongTheoViTri(maViTri)
      .then((res) => {
        setListRoom(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchParam]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex pl-10 pr-2 xl:pl-20 justify-between mt-20">
      <div className=" xl:w-[62%] w-full">
        <ContentComponent listRoom={listRoom} />
      </div>
      <div className="sticky top-0 h-screen hidden xl:block">
        <MapboxComponent locations={locations} />
      </div>
    </div>
  );
};

export default ListRoomPage;
