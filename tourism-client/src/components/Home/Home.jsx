import React from 'react';

import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="bgd1 vh-100"></div>

      <section className="slogan">
        <div className="slog1">
          <h1>Let's know More about Pharaohs</h1>
        </div>
        <div className="slog2">
          <h1>Let's Talk With Them...!</h1>
        </div>
      </section>

      <section className="container py-5">
        <h1
          className="text-center"
          style={{
            fontFamily:
              "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
          }}
        >
          Egypt's Best 5 Museums
        </h1>

        <div className="row row-cols-1 row-cols-md-3 g-4 py-5">
          <div className="col">
            <div className="card" style={{ width: '18rem' }}>
              <img src="/images/img1.jpg" className="card-img-top" alt="pic" />
              <div className="card-body">
                <h5 className="card-title">The Egyptian Museum</h5>
                <p className="card-text">
                  Since it debuted in 1902, the distinctive pink palace
                  overlooking Cairo’s Tahrir Square has been the world’s premier
                  showcase of ancient Egyptian artifacts .it consists of more
                  than 120,000 objects.
                </p>
                <Link
                  to={'/artifacts/3d45124c-95b6-4efc-b972-b4d05423de82'}
                  className="btn btn-primary"
                >
                  Check Here
                </Link>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card" style={{ width: '18rem' }}>
              <img
                src="/images/home/img2 (1).webp"
                className="card-img-top"
                alt="pic"
              />
              <div className="card-body">
                <h5 className="card-title">Grand Egyptian Museum</h5>
                <p className="card-text">
                  The instituition will be the largest in the world dedicated to
                  a single civilisation. The museum will exhibit Egypt’s most
                  precious and revered artefacts and treasures including its
                  most popular pharaoh, King Tutankhamun.
                </p>
                <Link
                  to={'/artifacts/70c7d560-9105-49cd-8f2a-2693c5216728'}
                  className="btn btn-primary"
                >
                  Check Here
                </Link>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card" style={{ width: '18rem' }}>
              <img
                src="/images/home/img3.webp"
                className="card-img-top"
                alt="pic"
              />
              <div className="card-body">
                <h5 className="card-title">The Coptic Museum</h5>
                <p className="card-text">
                  The home of the largest collection of Christians who trace
                  their faith to the first century AD and the evangelical work
                  of St. Mark. Many of the treasures date from the Roman and
                  Byzantine period, when Christianity was Egypt’s primary
                  religion.
                </p>
                <Link
                  to={'/artifacts/c4a91945-c9d7-4fd9-893a-d727fb0d92a5'}
                  className="btn btn-primary"
                >
                  Check Here
                </Link>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card" style={{ width: '18rem' }}>
              <img
                src="/images/home/img4.webp"
                className="card-img-top"
                alt="pic"
              />
              <div className="card-body">
                <h5 className="card-title">Bibliotheca Alexandria</h5>
                <p className="card-text">
                  This site is a reincarnation of the ancient Library of
                  Alexandria, destroyed in the third century AD during the Roman
                  occupation. It houses four permanent museums devoted to
                  Egyptian antiquities, manuscripts, the history of science
                </p>
                <Link
                  to={'/artifacts/b8877c8d-f8d2-439a-8cae-15cb17b851b6'}
                  className="btn btn-primary"
                >
                  Check Here
                </Link>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card" style={{ width: '18rem' }}>
              <img
                src="/images/home/img5.webp"
                className="card-img-top"
                alt="pic"
              />
              <div className="card-body">
                <h5 className="card-title">Luxor Museum</h5>
                <p className="card-text">
                  Unveiled in 1975 as one of Egypt’s first modern museum, the
                  Luxor . Items on display include a partial reconstruction of a
                  rare Akhenatan temple, a life-sized statue of Amenhotep III
                  with the crocodile god Sobek, and the mummies of pharaohs
                  Ramses I and Ahmose I.
                </p>
                <Link
                  to={'/artifacts/f581192e-f776-426e-a942-94d22d6df7c7'}
                  className="btn btn-primary"
                >
                  Check Here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid">
        <div className="text-center highlight">Highlights</div>
        <div className="center">
          <div id="carouselExampleIndicators" className="carousel slide">
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row">
                  <div className="col-lg-4">
                    <img
                      src="/images/home/p1.webp"
                      className="d-block w-100 h-100"
                      alt="pic"
                    />
                  </div>
                  <div className="col-lg-4">
                    <img
                      src="/images/home/p2.webp"
                      className="d-block w-100 h-100"
                      alt="pic"
                    />
                  </div>
                  <div className="col-lg-4">
                    <img
                      src="/images/home/p3.webp"
                      className="d-block w-100 h-100"
                      alt="pic"
                    />
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row">
                  <div className="col-lg-4">
                    <img
                      src="/images/home/p4.webp"
                      className="d-block w-100 h-100"
                      alt="..."
                    />
                  </div>
                  <div className="col-lg-4">
                    <img
                      src="/images/home/p5.webp"
                      className="d-block w-100 h-100"
                      alt="..."
                    />
                  </div>
                  <div className="col-lg-4">
                    <img
                      src="/images/home/p6.webp"
                      className="d-block w-100 h-100"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row">
                  <div className="col-lg-4">
                    <img
                      src="/images/home/p8.webp"
                      className="d-block w-100 h-100"
                      alt="..."
                    />
                  </div>
                  <div className="col-lg-4">
                    <img
                      src="/images/home/p7.webp"
                      className="d-block w-100 h-100"
                      alt="..."
                    />
                  </div>
                  <div className="col-lg-4">
                    <img
                      src="/images/home/p9.webp"
                      className="d-block w-100 h-100"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon p-4"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon p-4"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      <section className="chatbot">
        <div className="container-fluid">
          <div className="row d-flex justify-content-between align-items-center">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <h1>
                Now you can see and talk to the pharaohs
                <span style={{ color: 'rgb(224, 224, 55)', fontSize: '40px' }}>
                  ...!
                </span>
              </h1>
              <p>
                The chatbot will allow you to chat directly with the monuments
                and receive information about them. The chatbot will be
                animated, with each monument having its own character. This will
                enable to interact with the monuments in a fun and engaging way.
                The chatbot can also be used in museums to provide information
                about specific exhibits or to answer general questions about the
                museum
              </p>
              <a href="#">
                <button className="btn-primary">Chatbot</button>
              </a>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 photo">
              <img src="images/home/picture.webp" alt="pic" />
            </div>
          </div>
        </div>
      </section>

      <section className="predict py-5 line">
        <div className="container">
          <h1 className="text-center">
            you can send photo of any unknown statue to know it
          </h1>
          <div className="row d-flex justify-content-between align-items-center">
            <div className="pic_pred col-lg-4 col-md-4 col-sm-4">
              <img src="images/home/Thutmosis_III-2.webp" alt="pic" />
              <p>Who is this pharaoh?</p>
            </div>
            <div className="center-pred col-lg-4 col-md-4 col-sm-4">
              <img src="images/home/line.webp" alt="pic" />
            </div>
            <div className="pic_pred col-lg-4 col-md-4 col-sm-4">
              <img src="images/home/Thutmosis_III-2.webp" alt="pic" />
              <p>Thutmosis III</p>
            </div>
          </div>
        </div>
      </section>

      {/* <footer>
        <div className="container">
          <a href="#" id="footer_a">
            Questions? Contact us.
          </a>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-5">
              <ul style={{ listStyle: 'none' }}>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Media Center</a>
                </li>
                <li>
                  <a href="#">Ways to watch</a>
                </li>
                <li>
                  <a href="#">cookie Preferences</a>
                </li>
                <li>
                  <a href="#">Speed Test</a>
                </li>
              </ul>
              <p>Monu Talk</p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4">
              <ul style={{ listStyle: 'none' }}>
                <li>
                  <a href="#">Help Center</a>
                </li>
                <li>
                  <a href="#">Investor Relations</a>
                </li>
                <li>
                  <a href="#">Terms of Use</a>
                </li>
                <li>
                  <a href="#">Corporate Information</a>
                </li>
                <li>
                  <a href="#">Legal Notices</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-3">
              <ul style={{ listStyle: 'none' }}>
                <li>
                  <a href="#">Account</a>
                </li>
                <li>
                  <a href="#">Jobs</a>
                </li>
                <li>
                  <a href="#">Privacy</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Only on Netflix</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer> */}

      {/* <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossorigin="anonymous"
      ></script> */}
    </>
  );
};

export default Home;
