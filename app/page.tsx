function FileTextIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 2h8l4 4v16H6V2Zm7 1.5V7h3.5L13 3.5ZM8.5 11h7v-1.5h-7V11Zm0 3.5h7V13h-7v1.5Zm0 3.5h5V16.5h-5V18Z" />
    </svg>
  );
}

function BulbIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 21h6v-1.5H9V21Zm3-19a7 7 0 0 0-4 12.75V17h8v-2.25A7 7 0 0 0 12 2Zm2.85 11.55-.85.5V15h-4v-.95l-.85-.5A5 5 0 1 1 14.85 13.55Z" />
    </svg>
  );
}

function AudioIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Zm5 9a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V22h2v-3.08A7 7 0 0 0 19 12h-2Z" />
    </svg>
  );
}

function CrownIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m3 7 4.5 4L12 4l4.5 7L21 7l-2 12H5L3 7Zm4 10h10l.9-5.2-1.9 1.7-4-6.2-4 6.2-1.9-1.7L7 17Z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      className="star-icon"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path d="m12 2 3.1 6.28L22 9.27l-5 4.86L18.18 21 12 17.75 5.82 21 7 14.13 2 9.27l6.9-.99L12 2Z" />
    </svg>
  );
}

function HalfStarIcon() {
  return (
    <svg
      className="half-star-icon"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path
        d="M12 2v15.75L5.82 21 7 14.13 2 9.27l6.9-.99L12 2Z"
        fill="currentColor"
      />
      <path
        d="m12 2 3.1 6.28 6.9.99-5 4.86L18.18 21 12 17.75 5.82 21 7 14.13 2 9.27l6.9-.99L12 2Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 3.5C12.5 3.9 6 8.9 6 15.2c0 .9.16 1.73.45 2.48L3.7 20.43 5.1 21.85l2.55-2.55c1.03.77 2.4 1.2 3.95 1.2 6.3 0 10.4-6.8 8.9-17Zm-8.9 15c-.95 0-1.78-.22-2.44-.64l5.55-5.55-1.42-1.42-5.42 5.42A4.18 4.18 0 0 1 8 15.2c0-4.67 4.56-8.62 10.73-9.48.47 6.17-2.96 12.78-7.13 12.78Z" />
    </svg>
  );
}

const statisticHeadings = [
  "Enhance your knowledge",
  "Achieve greater success",
  "Improve your health",
  "Develop better parenting skills",
  "Increase happiness",
  "Be the best version of yourself!",
];

const secondStatisticHeadings = [
  "Expand your learning",
  "Accomplish your goals",
  "Strengthen your vitality",
  "Become a better caregiver",
  "Improve your mood",
  "Maximize your abilities",
];

const reviews = [
  {
    name: "Hanna M.",
    body: (
      <>
        This app has been a <b>game-changer </b> for me! It&apos;s saved me so
        much time and effort in reading and comprehending books. Highly
        recommend it to all book lovers.
      </>
    ),
  },
  {
    name: "David B.",
    body: (
      <>
        I love this app! It provides <b>concise and accurate summaries </b> of
        books in a way that is easy to understand. It&apos;s also very
        user-friendly and intuitive.
      </>
    ),
  },
  {
    name: "Nathan S.",
    body: (
      <>
        This app is a great way to get the main takeaways from a book without
        having to read the entire thing.{" "}
        <b>The summaries are well-written and informative.</b> Definitely worth
        downloading.
      </>
    ),
  },
  {
    name: "Ryan R.",
    body: (
      <>
        If you&apos;re a busy person who{" "}
        <b>loves reading but doesn&apos;t have the time </b> to read every book
        in full, this app is for you! The summaries are thorough and provide a
        great overview of the book&apos;s content.
      </>
    ),
  },
];

const footerGroups = [
  {
    title: "Actions",
    links: ["Summarist Magazine", "Cancel Subscription", "Help", "Contact us"],
  },
  {
    title: "Useful Links",
    links: [
      "Pricing",
      "Summarist Business",
      "Gift Cards",
      "Authors & Publishers",
    ],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Partners", "Code of Conduct"],
  },
  {
    title: "Other",
    links: ["Sitemap", "Legal Notice", "Terms of Service", "Privacy Policies"],
  },
];

export default function Home() {
  return (
    <main className="home-page">
      <nav className="nav">
        <div className="nav__wrapper">
          <figure className="nav__img--mask">
            <img className="nav__img" src="/assets/logo.png" alt="Summarist" />
          </figure>
          <ul className="nav__list--wrapper">
            <li className="nav__list nav__list--login">Login</li>
            <li className="nav__list nav__list--mobile">About</li>
            <li className="nav__list nav__list--mobile">Contact</li>
            <li className="nav__list nav__list--mobile">Help</li>
          </ul>
        </div>
      </nav>

      <section id="landing">
        <div className="container">
          <div className="row">
            <div className="landing__wrapper">
              <div className="landing__content">
                <h1 className="landing__content__title">
                  Gain more knowledge <br className="remove--tablet" />
                  in less time
                </h1>
                <p className="landing__content__subtitle">
                  Great summaries for busy people,
                  <br className="remove--tablet" />
                  individuals who barely have time to read,
                  <br className="remove--tablet" />
                  and even people who don&apos;t like to read.
                </p>
                <button className="btn home__cta--btn" type="button">
                  Login
                </button>
              </div>
              <figure className="landing__image--mask">
                <img src="/assets/landing.png" alt="Reading summaries" />
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section id="features">
        <div className="container">
          <div className="row">
            <h2 className="section__title">Understand books in few minutes</h2>
            <div className="features__wrapper">
              <div className="features">
                <div className="features__icon">
                  <FileTextIcon />
                </div>
                <h3 className="features__title">Read or listen</h3>
                <p className="features__sub--title">
                  Save time by getting the core ideas from the best books.
                </p>
              </div>
              <div className="features">
                <div className="features__icon">
                  <BulbIcon />
                </div>
                <h3 className="features__title">Find your next read</h3>
                <p className="features__sub--title">
                  Explore book lists and personalized recommendations.
                </p>
              </div>
              <div className="features">
                <div className="features__icon">
                  <AudioIcon />
                </div>
                <h3 className="features__title">Briefcasts</h3>
                <p className="features__sub--title">
                  Gain valuable insights from briefcasts.
                </p>
              </div>
            </div>

            <div className="statistics__wrapper">
              <div className="statistics__content--header">
                {statisticHeadings.map((heading) => (
                  <div className="statistics__heading" key={heading}>
                    {heading}
                  </div>
                ))}
              </div>
              <div className="statistics__content--details">
                <div className="statistics__data">
                  <div className="statistics__data--number">93%</div>
                  <div className="statistics__data--title">
                    of Summarist members <b>significantly increase</b> reading
                    frequency.
                  </div>
                </div>
                <div className="statistics__data">
                  <div className="statistics__data--number">96%</div>
                  <div className="statistics__data--title">
                    of Summarist members <b>establish better</b> habits.
                  </div>
                </div>
                <div className="statistics__data">
                  <div className="statistics__data--number">90%</div>
                  <div className="statistics__data--title">
                    have made <b>significant positive</b> change to their lives.
                  </div>
                </div>
              </div>
            </div>

            <div className="statistics__wrapper">
              <div className="statistics__content--details statistics__content--details-second">
                <div className="statistics__data">
                  <div className="statistics__data--number">91%</div>
                  <div className="statistics__data--title">
                    of Summarist members <b>report feeling more productive</b>{" "}
                    after incorporating the service into their daily routine.
                  </div>
                </div>
                <div className="statistics__data">
                  <div className="statistics__data--number">94%</div>
                  <div className="statistics__data--title">
                    of Summarist members have <b>noticed an improvement</b> in
                    their overall comprehension and retention of information.
                  </div>
                </div>
                <div className="statistics__data">
                  <div className="statistics__data--number">88%</div>
                  <div className="statistics__data--title">
                    of Summarist members <b>feel more informed</b> about current
                    events and industry trends since using the platform.
                  </div>
                </div>
              </div>
              <div className="statistics__content--header statistics__content--header-second">
                {secondStatisticHeadings.map((heading) => (
                  <div className="statistics__heading" key={heading}>
                    {heading}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews">
        <div className="container">
          <div className="row">
            <h2 className="section__title">What our members say</h2>
            <div className="reviews__wrapper">
              {reviews.map((review) => (
                <div className="review" key={review.name}>
                  <div className="review__header">
                    <div className="review__name">{review.name}</div>
                    <div className="review__stars">
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                    </div>
                  </div>
                  <div className="review__body">{review.body}</div>
                </div>
              ))}
            </div>
            <div className="reviews__btn--wrapper">
              <button className="btn home__cta--btn" type="button">
                Login
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="numbers">
        <div className="container">
          <div className="row">
            <h2 className="section__title">Start growing with Summarist now</h2>
            <div className="numbers__wrapper">
              <div className="numbers">
                <div className="numbers__icon">
                  <CrownIcon />
                </div>
                <h3 className="numbers__title">3 Million</h3>
                <p className="numbers__sub--title">
                  Downloads on all platforms
                </p>
              </div>
              <div className="numbers">
                <div className="numbers__icon numbers__rating-stars">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <HalfStarIcon />
                </div>
                <h3 className="numbers__title">4.5 Stars</h3>
                <p className="numbers__sub--title">
                  Average ratings on iOS and Google Play
                </p>
              </div>
              <div className="numbers">
                <div className="numbers__icon">
                  <LeafIcon />
                </div>
                <h3 className="numbers__title">97%</h3>
                <p className="numbers__sub--title">
                  Of Summarist members create a better reading habit
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="footer">
        <div className="container">
          <div className="row">
            <div className="footer__top--wrapper">
              {footerGroups.map((group) => (
                <div className="footer__block" key={group.title}>
                  <h3 className="footer__link--title">{group.title}</h3>
                  <div>
                    {group.links.map((link) => (
                      <div className="footer__link--wrapper" key={link}>
                        <span className="footer__link">{link}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="footer__copyright--wrapper">
              <div className="footer__copyright">
                Copyright &copy; 2023 Summarist.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
