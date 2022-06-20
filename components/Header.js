import headerStyles from "../styles/Header.module.css";

const Header = () => {
  return (
    <div>
      <h1>
        <span className={headerStyles.title}>WebDev</span> News
      </h1>
      <p className={headerStyles.description}>Keep up to date with the news!</p>
    </div>
  );
};

export default Header;
