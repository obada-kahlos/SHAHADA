import { useNavigate } from "react-router-dom";

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="h-screen w-full flex items-center justify-center flex-col bg-firstDarkBgColor">
        <h1 className="lg:text-[250px] md:text-[150px] text-[80px] dark:text-titleDarkColor text-titleLightColor">
          404<span className="text-main-color">.</span>
        </h1>
        <p className="dark:text-titleDarkColor text-titleLightColor md:text-[32px] text-[20px]">
          Look like you are lost
        </p>
        <p className="dark:text-[#ffffff90] text-titleLightColor md:text-[20px] text-[16px]">
          the page you are looking for not available!
        </p>
        <div className="my-[20px]">
          <button
            className="text-white bg-main-color w-40 rounded-[4px] p-4"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};
