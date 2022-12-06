import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy</title>
      </Helmet>
      <Navbar />
      <div className="container my-5 py-5">
        <p>
          This Privacy Policy governs the manner in which phptravels collects,
          uses, maintains and discloses information collected from users (each,
          a "User") of the www.phptravels.com website ("Site"). This privacy
          policy applies to the Site and all products and services offered by
          phptravels. <br />
          <br />
          Personal identification information
          <br />
          <br />
          We may collect personal identification information from Users in a
          variety of ways, including, but not limited to, when Users visit our
          site, place an order, and in connection with other activities,
          services, features or resources we make available on our Site. Users
          may be asked for, as appropriate, name, email address, mailing
          address, phone number, credit card information. We will collect
          personal identification information from Users only if they
          voluntarily submit such information to us. Users can always refuse to
          supply personally identification information, except that it may
          prevent them from engaging in certain Site related activities.
          <br />
          <br />
          Non-personal identification information
          <br />
          <br />
          We may collect non-personal identification information about Users
          whenever they interact with our Site. Non-personal identification
          information may include the browser name, the type of computer and
          technical information about Users means of connection to our Site,
          such as the operating system and the Internet service providers
          utilized and other similar information.
          <br />
          <br />
          Web browser cookies
          <br />
          <br />
          Our Site may use "cookies" to enhance User experience. User's web
          browser places cookies on their hard drive for record-keeping purposes
          and sometimes to track information about them. User may choose to set
          their web browser to refuse cookies, or to alert you when cookies are
          being sent. If they do so, note that some parts of the Site may not
          function properly.
          <br />
          <br />
          How we use collected information
          <br />
          <br />
          phptravels may collect and use Users personal information for the
          following purposes:
          <br />
          <br />
          - To improve customer service
          <br />
          <br />
          Information you provide helps us respond to your customer service
          requests and support needs more efficiently. - To personalize user
          experience
          <br />
          <br />
          We may use information in the aggregate to understand how our Users as
          a group use the services and resources provided on our Site.
          <br />
          <br />
          - To improve our Site
          <br />
          <br />
          We may use feedback you provide to improve our products and services.
          <br />
          <br />
          - To process payments
          <br />
          <br />
          We may use the information Users provide about themselves when placing
          an order only to provide service to that order. We do not share this
          information with outside parties except to the extent necessary to
          provide the service.
          <br />
          <br />
          - To send periodic emails
          <br />
          <br />
          We may use the email address to send User information and updates
          pertaining to their order. It may also be used to respond to their
          inquiries, questions, and/or other requests. If User decides to opt-in
          to our mailing list, they will receive emails that may include company
          news, updates, related product or service information, etc. If at any
          time the User would like to unsubscribe from receiving future emails,
          they may do so by contacting us via our Site.
          <br />
          <br />
          How we protect your information
          <br />
          <br />
          We adopt appropriate data collection, storage and processing practices
          and security measures to protect against unauthorized access,
          alteration, disclosure or destruction of your personal information,
          username, password, transaction information and data stored on our
          Site.
          <br />
          <br />
          Sensitive and private data exchange between the Site and its Users
          happens over a SSL secured communication channel and is encrypted and
          protected with digital signatures.
          <br />
          <br />
          <br />
          <br />
          Sharing your personal information
          <br />
          <br />
          We do not sell, trade, or rent Users personal identification
          information to others. We may share generic aggregated demographic
          information not linked to any personal identification information
          regarding visitors and users with our business partners, trusted
          affiliates and advertisers for the purposes outlined above.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
