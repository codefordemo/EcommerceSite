import "./footer.css";

export const Footer = () => {
  return (
    <>
      <a href="#" className="btn btn-float-action" id="back-to-top">
        <i className="fas fa-arrow-up"></i>
      </a>
      <footer className="footer text-center">
        <div className="footer-header">
          Made with <span className="primary-text-color">&lt;/&gt;</span> by
          B and G
        </div>
        <ul className="inline-list list-style-none footer-social-icons">
          <li className="list-inline-item">
            <a className="link-no-style" href=" ">
              <i className="fab fa-github"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="link-no-style" href=" ">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a
              className="link-no-style"
              href=" " 
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </li>
        </ul>
        <div className="text-light-weight body-cp-md footer-copy">
          © 2021 B<span className="primary-text-color body-cp-sm">&</span>G
          Designs
        </div>
      </footer>
    </>
  );
};
