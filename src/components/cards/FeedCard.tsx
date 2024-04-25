import { Dispatch, SetStateAction, useContext } from "react";

import { useMediaQuery } from "usehooks-ts";

import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

import { themeColors } from "@/core/theme";

import { AppContext, IFeedItem } from "@/core/AppContext";
import useToggle from "@/hooks/useToggle";
import { DirectionType } from "@/types/common";

type Props = {
  data: IFeedItem;
  setBackgroundColor: Dispatch<SetStateAction<string>>;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
  setDirection: Dispatch<SetStateAction<DirectionType | "">>;
  isDragging: boolean;
};

const offsetBoundary = 150;

const inputX = [offsetBoundary * -1, 0, offsetBoundary];
const outputX = [-200, 0, 200];
const outputY = [50, 0, 50];
const outputRotate = [-40, 0, 40];
const outputMainBgColor = [
  themeColors.gameSwipe.left,
  themeColors.gameSwipe.neutral,
  themeColors.gameSwipe.right,
];

const FeedCard = ({
  data: { caption, imageSrc },
  setBackgroundColor,
  setIsDragging,
  setDirection,
  isDragging,
}: Props) => {
  const [isImgLoaded, toggleImgLoaded] = useToggle();
  const { handleNextFeed } = useContext(AppContext);

  const x = useMotionValue(0);

  const isMobile = useMediaQuery("(max-width: 768px)");

  let drivenX = useTransform(x, inputX, outputX);
  let drivenY = useTransform(x, inputX, outputY);
  let drivenRotation = useTransform(x, inputX, outputRotate);
  let drivenBg = useTransform(x, [-50, 0, 50], outputMainBgColor);

  useMotionValueEvent(x, "change", () => {
    //@ts-ignore
    setBackgroundColor(drivenBg);
  });

  return (
    <>
      <motion.div
        className="absolute bg-white p-8 rounded-lg text-center w-full aspect-[100/150] pointer-events-none text-black origin-bottom shadow-card select-none"
        style={{
          y: drivenY,
          rotate: drivenRotation,
          x: drivenX,
        }}
      >
        <div>
          <div className="w-full mx-auto max-w-[250px] aspect-square rounded-full relative">
            <img
              className={`absolute object-cover object-center ${
                isImgLoaded ? "opacity-100" : "opacity-0"
              } duration-500 ease-out`}
              src={imageSrc}
              sizes={`(max-width: 768px) 100vw, 250px`}
              alt="feed-outfit"
              draggable="false"
              onLoad={() => toggleImgLoaded(true)}
            />
          </div>
          <p className="mt-2 text-[20px] leading-tight">{caption}</p>
        </div>
        {/* <div className="flex flex-col justify-center items-center bg-gray-100 min-h-screen">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full">
            <img
              src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606"
              alt="Mountain"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Beautiful Mountain View
              </h2>
              <p className="text-gray-700 leading-tight mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                eu sapien porttitor, blandit velit ac, vehicula elit. Nunc et ex
                at turpis rutrum viverra.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Avatar"
                    className="w-8 h-8 rounded-full mr-2 object-cover"
                  />
                  <span className="text-gray-800 font-semibold">John Doe</span>
                </div>
                <span className="text-gray-600">2 hours ago</span>
              </div>
            </div>
          </div>
        </div> */}
      </motion.div>

      <motion.div
        className={`absolute w-full aspect-[100/150] ${
          !isDragging ? "hover:cursor-grab" : ""
        }`}
        drag="x"
        dragSnapToOrigin
        dragElastic={isMobile ? 0.2 : 0.06}
        dragConstraints={{ left: 0, right: 0 }}
        dragTransition={{ bounceStiffness: 1000, bounceDamping: 50 }}
        onDragStart={() => setIsDragging(true)}
        onDrag={(_, info) => {
          const direction = info.offset.x > 0 ? "right" : "left";
          setDirection(direction);
        }}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          const isOffBoundary =
            info.offset.x > offsetBoundary || info.offset.x < -offsetBoundary;
          const direction = info.offset.x > 0 ? "right" : "left";
          // api call with feed id and swipe direction to upvote / pass

          if (isOffBoundary) {
            handleNextFeed();
          }
        }}
        style={{ x }}
      />
    </>
  );
};

export default FeedCard;
