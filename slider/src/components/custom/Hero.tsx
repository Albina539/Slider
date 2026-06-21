import { ChevronRight2 } from "pixelarticons/react";
import logo from "../../assets/logo.svg";
import { Button } from "../ui/button";
import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const { user } = useUser();
  return (
    <div>
      <div className="flex flex-col">
        <img src={logo} alt="logo" width={100} height={100} />
        <h1>Slider</h1>
        <p>Play with ideas. Create design</p>
      </div>
      <div>
        {!user ? (
          <SignInButton
            mode="modal"
            fallbackRedirectUrl="/workspace"
            forceRedirectUrl="/workspace"
          >
            <Button>
              <div>
                <ChevronRight2 />
                <span>Начать</span>
              </div>
            </Button>
          </SignInButton>
        ) : (
          <Link to="/workspace">
            <Button>
              <div>
                <span>Продолжить</span>
              </div>
            </Button>
          </Link>
        )}

        <a href="#">Гайд</a>
        {user ? (
          <SignOutButton>
            <Button>Выйти</Button>
          </SignOutButton>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Hero;
