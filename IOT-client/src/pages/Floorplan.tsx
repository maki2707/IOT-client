import React, { useState } from "react";
import Plan from "../floorplan.png";
import ImgMapper from "react-img-mapper";

interface Area {
  id: string;
  shape: string;
  coords: number[];
  alt: string;
  title: string;
}

const Floorplan: React.FC = () => {
  const [lastClickedRoom, setLastClickedRoom] = useState<string>("");

  const handleAreaClick = (areaTitle: string | undefined) => {
    console.log(areaTitle);
    setLastClickedRoom(areaTitle || "");
  };

  const isRoomClicked = (areaTitle: string) => {
    return areaTitle === lastClickedRoom ? "highlighted-room" : "";
  };

  const areas: Area[] = [
    {
      id: "office1",
      shape: "rect",
      coords: [4, 115, 371, 355],
      alt: "Office 1",
      title: "Office 1",
    },
    {
      id: "office2",
      shape: "rect",
      coords: [7, 428, 246, 677],
      alt: "Office 2",
      title: "Office 2",
    },
    {
      id: "office3",
      shape: "rect",
      coords: [250, 428, 430, 674],
      alt: "Office 3",
      title: "Office 3",
    },
    {
      id: "office4",
      shape: "rect",
      coords: [432, 428, 617, 673],
      alt: "Office 4",
      title: "Office 4",
    },
    {
      id: "office5",
      shape: "rect",
      coords: [619, 427, 921, 673],
      alt: "Office 5",
      title: "Office 5",
    },
    {
      id: "breakroom",
      shape: "rect",
      coords: [371, 4, 919, 405],
      alt: "Break room",
      title: "Break room",
    },
  ];

  return (
    <>
      <div>{lastClickedRoom}</div>
    <div style={{height: '60vh'}}>
      <ImgMapper
          src={Plan}
          map={{ name: "image-map", areas }}
          onClick={(area) => handleAreaClick(area.id)}
          lineWidth={1}
        />
    </div>
      
    </>
  );
};

export default Floorplan;
