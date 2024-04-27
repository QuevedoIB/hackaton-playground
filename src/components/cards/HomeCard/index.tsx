import homeCard from "@/assets/images/home-card.jpg";
import { Link } from "react-router-dom";
import "./HomeCard.css";

const HomeCard = () => {
  return (
    <article className="p-6 bg-white -rotate-3 home-card--container pb-40">
      <div className="relative">
        <img src={homeCard} />
        <div
          style={{ bottom: "-9rem" }}
          className="absolute w-full flex items-center flex-col"
        >
          <h1 className="home-card__app-name text-8xl text-center w-full mb-4">
            <span className="mr-1">All</span>
            <span>Stars</span>
          </h1>
          <Link
            style={{ width: "fit-content" }}
            to="/all-stars/feed"
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Dress the world
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default HomeCard;
