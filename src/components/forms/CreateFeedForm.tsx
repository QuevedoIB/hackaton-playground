import useToggle from "@/hooks/useToggle";
import { toast } from "react-toastify";
import IconRocket from "@/assets/images/rocket.component.svg";
import Loader from "@/components/common/Loader";

const CreateFeedForm = ({ onClose }: { onClose: () => void }) => {
  const [isValidForm, setIsValidForm] = useToggle();
  const [isLoading, setIsLoading] = useToggle();
  return (
    <form
      className="mt-8 space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);
        // Upload data to service

        setTimeout(() => {
          toast.success(
            <div className="flex">
              <span className="mr-1">Feed created successfully!</span>
              <IconRocket />
            </div>
          );
          onClose();
        }, 1000);
      }}
    >
      <div className="grid grid-cols-1 space-y-2">
        <label
          htmlFor="title"
          className="text-sm font-bold text-gray-500 tracking-wide"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          type=""
          placeholder="Image title"
        />
      </div>
      <div className="grid grid-cols-1 space-y-2">
        <label className="text-sm font-bold text-gray-500 tracking-wide">
          Upload Image
        </label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
            <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-blue-400 group-hover:text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                <img
                  className="has-mask h-36 object-center"
                  src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                  alt="freepik image"
                />
              </div>
              <p className="pointer-none text-gray-500 ">
                <span className="text-sm">Drag and drop</span> images here{" "}
                <br /> or{" "}
                <span className="text-blue-600 hover:underline cursor-pointer">
                  select an image
                </span>{" "}
                from your computer
              </p>
            </div>
            <input
              name="image"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
              onChange={() => setIsValidForm(true)}
            />
          </label>
        </div>
        <p className="text-sm text-gray-300">
          <span>Image type: jpg, jpeg, png</span>
        </p>
      </div>

      <div className="grid grid-cols-1 space-y-2 pb-4">
        <label
          htmlFor="caption"
          className="text-sm font-bold text-gray-500 tracking-wide"
        >
          Image caption
        </label>
        <textarea
          id="caption"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
          placeholder="Write your thoughts here..."
        ></textarea>
      </div>

      <div className="flex justify-end">
        <button
          disabled={!isValidForm || isLoading}
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 disabled:bg-gray-300 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:border-indigo-500 sm:text-sm min-w-24"
        >
          {isLoading ? <Loader /> : "Upload"}
        </button>
      </div>
    </form>
  );
};

export default CreateFeedForm;
