import logo from "../../assets/logo.svg";

const Header = () => {
  return (
    <div className="py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src={logo} alt="logo slider" width={50} height={50} />
        <span className="text-4xl font-bold">Slider</span>
      </div>
    </div>
  );
};

export default Header;
