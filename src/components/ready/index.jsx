import { useContext } from "react";
import Button from "../button/";
import AppContext from "../../contexts/AppContext";
import { Link } from "react-router-dom";

export const Ready = () => {
  const { setReadyHandler, ready } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Button
        text={"Are you ready to recite the Shahada"}
        height={"40px"}
        rounded={"6px"}
        width={"280px"}
        onClick={() => setReadyHandler(null)}
      />
      {ready.isReady === true && ready.language === null ? (
        <div className="flex gap-4 sm:flex-row flex-col">
          <Link to="/Shahada">
            <Button
              text={"Say it with Arabic"}
              height={"40px"}
              rounded={"6px"}
              width={"280px"}
              onClick={() => setReadyHandler("ar")}
            />
          </Link>
          <Link to="/Shahada">
            <Button
              text={"Say it with English"}
              height={"40px"}
              rounded={"6px"}
              width={"280px"}
              onClick={() => setReadyHandler("en")}
            />
          </Link>
        </div>
      ) : null}
    </div>
  );
};
