import logo from "../../../assets/logo.png";

/** Logo + tagline, rộng bằng sidebar */
export default function HeaderBrand() {
  return (
    <div className="app-header-brand d-flex flex-column justify-content-center flex-shrink-0 h-100 ps-3 ps-lg-4">
      <img src={logo} alt="TekShot" className="app-header-logo" />
      <span className="app-header-subtitle">POS MANAGEMENT</span>
    </div>
  );
}
