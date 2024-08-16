import React from 'react';
import '@/assets/scss/privacyPolicy/index.css';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="privacy-policy-container">
      <h1 className="mainheading">PRIVACY POLICY</h1>
      <h2 className="heading">I. Introduction</h2>
      <p className="paragraph">
        When you use GRAUN’s product and services , you trust us with your personal data. We’re committed to keeping
        that trust. That first starts with helping you understand our privacy practices.
      </p>
      <p className="paragraph">
        This notice describes the personal data (“data”) we collect, how it’s used and shared, and your choices
        regarding this data. We recommend that you read this along with our{' '}
        <a href="#overview">
          <span style={{ color: 'blue' }}>overview</span>
        </a>
        , which highlights information about our privacy practices and provides summaries of the data we collect and how
        we use it.
      </p>
      <h2 className="heading">II. Overview</h2>
      <h3 className="subheading">A. Scope</h3>
      <p className="paragraph">This notice applies to users of GRAUN’s apps, websites, and other services globally.</p>
      <p className="paragraph">
        This notice describes how GRAUN and its affiliates collect and use data. This notice applies to all GRAUN users
        globally, unless they use a service covered by a separate privacy notice. This notice specifically applies to:
      </p>
      <li className="list-item">
        <span style={{ fontWeight: 'bold' }}>Order recipients:</span> those who request or receive food or other
        products and services for delivery or pick-up via their{' '}
        <a href="#graun-eats-link">
          <span style={{ color: 'blue' }}>GRAUN EATS LINK</span>
        </a>{' '}
        or account. This includes those who use guest checkout features to access delivery or pick-up services without
        creating and/or logging into their account.
      </li>
      <li className="list-item">
        <span style={{ fontWeight: 'bold' }}>Delivery Drivers:</span> those who provide delivery services via GRAUN’s
        Restaurant Manager App.
      </li>
      <p className="paragraph">
        This Policy also governs GRAUN’s other collections of data in connection with its services. For example, we may
        collect contact information of owners or employees of restaurants or merchants on the GRAUN platforms; contact
        information of those who manage and use accounts owned by Enterprise Customers; or data of those who start but
        do not complete their applications to be drivers.
      </p>
      <p className="paragraph">All those subject to this notice are referred to as “users” in this Policy.</p>
      <p className="paragraph">
        Our privacy practices are subject to applicable laws in the places in which we operate. This means that we
        engage in the practices described in this notice in a particular country or region only if permitted under the
        laws of those places.
      </p>

      <h2 className="heading">III. Data Collections and Uses</h2>
      <h3 className="subheading">A. The data we collect</h3>
      <p className="paragraph">GRAUN collects data:</p>
      <div className="numbers">
        <li className="list-item">Provided by users to GRAUN</li>
        <li className="list-item">Created during use of our services</li>
        <li className="list-item">From other sources</li>
      </div>
      <p className="sub-subheading">Graun collects the following data from these sources: </p>
      <p className="sub-subheading">1. Data provided by users. This includes:</p>
      <li className="list-item">
        <span style={{ fontWeight: 'bold' }}>Account information:</span> We collect data when users create or update
        their GRAUN accounts, or place orders via guest checkout features. This includes first and last name, email,
        phone number, login name and password, address, profile picture, payment or banking information (including
        related payment verification information), user settings (including accessibility settings), and loyalty program
        information for GRAUN partners.
      </li>
      <p className="list-item">
        For delivery drivers, this also includes vehicle or insurance information, emergency contact information, and
        evidence of health or fitness to provide services using GRAUN’s driver apps.
      </p>
      <li className="list-item">
        <span style={{ fontWeight: 'bold' }}>Background check information (delivery drivers):</span> This includes
        information submitted during the delivery driver application process, such as driver history or criminal record
        (where permitted by law), license status, known aliases, prior addresses, and right to work. This information
        may be collected by GRAUN service providers.
      </li>
      <li className="list-item">
        <span style={{ fontWeight: 'bold' }}>Identity verification documents and photos:</span> This includes government
        issued identification such as driver’s license or passports (which may contain identification photos and
        numbers, date of birth, and gender), and user-submitted photos such as selfies and profile pictures.
      </li>
      <li className="list-item">
        <span style={{ fontWeight: 'bold' }}>Demographic data:</span> We collect demographic data such as birth
        date/age, gender, or occupation when necessary to enable certain features, or provide access to age-restricted
        products or services. We also collect demographic data, such as age group and household composition, through
        user surveys.
      </li>
      <li className="list-item">
        <span style={{ fontWeight: 'bold' }}>User content:</span> We collect data (including chat logs) when users
        contact GRAUN customer support, provide ratings or feedback for users, or restaurants use features that enable
        users to upload content.
      </li>
      <p className="sub-subheading">2. Data created during use of our services. This includes:</p>
      <li className="list-item">
        Location data (delivery drivers): We collect precise and approximate location data from delivery drivers’ mobile
        devices when the GRAUN app is running in the foreground (app open and on-screen) or background (app open but not
        on-screen).
      </li>
      <li className="list-item">
        Location data (drivers and order recipients): We collect precise and/or approximate location information from
        drivers’ and order recipients’ mobile devices if they enable us to do so via their device settings. GRAUN
        collects such data from the time an order is requested until it is finished, and any time the app is running in
        the foreground (app open and on-screen). See “Choice and transparency” below for information on how driver’s and
        order recipients can enable precise location data collection.
      </li>
      <p className="list-item">
        Order recipients may use the GRAUN website without enabling collection of location data from their mobile
        devices. However, this may affect certain features in the GRAUN apps. For example, a driver who has not enabled
        precise location data will have to manually enter their preferred location of work.
      </p>
      <li className="list-item">
        Transaction information: We collect transaction information related to the use of our services, including the
        type of services requested or provided; order details (such as date and time, requested pick-up and drop off
        addresses, distance travelled and items ordered, such as food, prescription drugs or other delivery items); and
        payment transaction information (such as a restaurant’s or merchant's name and location, amount charged, and
        payment method). We also associate a user’s name with that of anyone who uses their promotion code.
      </li>
      <p className="list-item">
        {' '}
        This also includes information provided by users when placing their order, such as their allergies information.
      </p>
      <li className="list-item">
        Usage data: We collect data about how users interact with our services. This includes access dates and times,
        app features or pages viewed, browser type, and app crashes and other system activity.
      </li>
      <li className="list-item">
        Device data: We collect data about the devices used to access our services, including the hardware models,
        device IP address or other unique device identifiers, operating systems and versions, software, preferred
        languages, advertising identifiers, device motion data, and mobile network data.
      </li>
      <li className="list-item">
        Communications data: We collect data regarding communications between users that are enabled through GRAUN apps.
        This includes communication type (phone, text, or in-app message), date/time, and content (including recordings
        of phone calls solely when users are notified of the recording in advance).
      </li>
      <h4 className="subheading">B. How we use data</h4>
      <p className="paragraph">
        GRAUN uses data to enable reliable and convenient transportation, delivery, and other products and services. We
        also use data:
      </p>
      <li className="list-item">To enhance the safety and security of our users and services</li>
      <li className="list-item">For customer support</li>
      <li className="list-item">For research and development</li>
      <li className="list-item">To enable communications between users</li>
      <li className="list-item">For marketing and advertising</li>
      <li className="list-item">To send non-marketing communications to users</li>
      <li className="list-item">In connection with legal proceedings</li>

      <p className="sub-subheading">GRAUN uses the data we collect:</p>
      <p className="paragraph">
        1. To provide our services: GRAUN uses data to provide, personalize, maintain, and improve our services. This
        includes using data to:
      </p>
      <li className="list-item"> Create/update accounts.</li>
      <li className="list-item">Enable delivery and other services/features, such as:</li>
      <div className="list-round">
        <li className="list-item">
          Using location data to navigate driver pick-ups and order drop-offs, calculate ETAs, and track the progress of
          deliveries.
        </li>
        <li className="list-item">
          Enabling features that involve data sharing, such as sharing driver first name and vehicle information with
          restaurants to facilitate pick-ups, or features that enable ETA sharing.
        </li>
        <li className="list-item">
          Matching available drivers to users requesting services, including based on personal data such as location and
          proximity to other users, and user settings/preferences (such as preferred destinations), and non-personal
          data such as vehicle type requested.
        </li>
      </div>

      <p className="paragraph">
        2. Safety, fraud protection, and security: We use data to help maintain the safety, security, and integrity of
        our services and users. This includes:
      </p>
      <li className="list-item">Verifying users' accounts, identity, or compliance with safety requirements.</li>
      <p className="list-item">
        For example, we review driver background checks (including criminal history where required or permitted by law)
        to verify their identities and eligibility to provide deliveries. 
      </p>
      <p className="paragraph">
        Graun may also use facial recognition technology to prevent fraudulent use of Graun’s accounts by those other
        than the account owner.  Graun may also use selfies to verify that users are wearing helmets or other safety
        gear through the use of object verification technology. We may use this and data from delivery driver’s devices
        to verify the type of vehicles they use to provide deliveries.
      </p>
      <p className="paragraph">
        The fraud and unsafe driving prevention and detection activities described above may be considered profiling
        under applicable laws, and can result in deactivation of users (generally only after human review). For
        information regarding how to object to the above activities, please see “Choice and transparency” below.
      </p>
      <p className="paragraph">
        Graun performs the above activities on the grounds that they are necessary to fulfil the terms of our agreements
        with users, and/or for purposes of the legitimate safety and security interests of Graun.
      </p>
      <p className="paragraph">
        3. Customer support : We use the information we collect (which may include call recordings, chat logs, in-app
        audio recordings and dashcam footage) to provide customer support, including to investigate and address user
        concerns and to monitor and improve our customer support responses and processes.
      </p>
      <p className="paragraph">
        4. Research and development : We use data for analysis, machine learning, product development, research, and
        testing. This helps us make our services more convenient and easier-to-use, enhance the safety and security of
        our services, and develop new services and features. 
      </p>
      <p className="paragraph">
        Graun performs the above activities on the grounds that they are necessary for purposes of Graun’s legitimate
        interests in improving and developing new services and features.
      </p>
      <p className="paragraph">
        5. Enabling communications between users. For example, a driver may message or call a restaurant to confirm a
        pick-up location or delivery driver may contact an order recipient with information about their order.
      </p>
      <p className="paragraph">
        6. Marketing and Advertising. Graun uses data (other than guest users’ data) to market its services, and those
        of Graun’s partners. We specifically use account, approximate location, device and usage data, preferred
        language, and order history to provide ads and marketing communications that are personalized based on users
        observed or inferred location, interests and characteristics (which may include inferred gender*).
      </p>
      <p className="paragraph">
        7. Non-marketing communications. Graun may use data to send surveys and other communications that are not for
        the purpose of marketing the services or products of Graun or its partners. We may also send users
        communications regarding elections, ballots, referenda, and other political processes that relate to our
        services. For example, Graun has notified users of ballot measures or pending legislation relating to Graun’s
        services in those users’ areas.
      </p>
      <p className="paragraph">
        8. Legal proceedings and requirements. We use data to investigate or address claims or disputes relating to use
        of Graun’s services, to satisfy requirements under applicable laws, regulations, operating licenses or
        agreements, insurance policies, or pursuant to legal process or governmental request, including from law
        enforcement.
      </p>
      <p className="paragraph">
        Graun performs the above activities on the grounds that they are necessary for purposes of Graun’s legitimate
        interests in investigating and responding to claims and disputes relating to use of Graun’s services and
        features, and/or necessary for compliance with applicable legal requirements.
      </p>
      <h3 className="subheading">C. Cookies and Third-Party Technologies</h3>
      <p className="paragraph">
        GRAUN and its partners use cookies and other identification technologies on our apps, websites, emails, and
        online ads for purposes described in this notice,
      </p>
      <p className="paragraph">
        Cookies are small text files that are stored on browsers or devices by websites, apps, online media, and ads.
        GRAUN uses cookies and similar technologies for purposes such as:
      </p>
      <li className="list-item">Authenticating users</li>
      <li className="list-item">Remembering user preferences and settings</li>
      <li className="list-item">Determining the popularity of content</li>
      <li className="list-item">Delivering and measuring the effectiveness of advertising campaigns</li>
      <li className="list-item">
        Analyzing site traffic and trends, and generally understanding the online behaviors and interests of people who
        interact with our services
      </li>
      <p className="paragraph">
        We may also allow others to provide audience measurement and analytics services for us, to serve advertisements
        on our behalf across the internet, and to track and report on the performance of those advertisements. These
        entities may use cookies, web beacons, SDKs, and other technologies to identify the devices used by visitors to
        our websites, as well as when they visit other online sites and services.
      </p>

      <h3 className="subheading">D. Data Sharing and Disclosure</h3>
      <p className="paragraph">
        Some of Graun’s services and features require that we share data with other users, or at users’ request or with
        their consent. We may also share such data with our affiliates, subsidiaries, and partners, for legal reasons or
        in connection with claims or disputes.
      </p>
      <p className="sub-subheading">Graun may share data: </p>
      <p className="paragraph">1. With other users</p>
      <p className="paragraph">This includes sharing: </p>
      <li className="list-item">drivers’ first name, rating, and pickup and/or drop off locations with drivers.</li>
      <li className="list-item">
        order recipients’ first name and order details, including items ordered, allergies or food preferences and
        special instructions, with other recipients in a group order.
      </li>
      <li className="list-item">
        order recipients’ first name, delivery address, and order information (including drug prescriptions, special
        instructions, allergies or food preferences) with the restaurant or merchant and, for order deliveries, with the
        delivery driver. We may also share ratings and feedback, or other information to the extent required by law,
        with the restaurant or merchant and, for order deliveries, the delivery person.
      </li>
      <li className="list-item">
        for drivers, we may share data with the riders, order recipients and restaurants or merchants, including name
        and photo; vehicle make, model, colour, license plate, and vehicle photo; location (before and during trip);
        average rating provided by users; total number of trips; period of time since they signed up to be a driver or
        delivery person; contact information; and driver or delivery person profile, including compliments and other
        feedback submitted by past users.
      </li>
      <li className="list-item">
        We may also provide driver’s and order recipients with receipts containing information such as a breakdown of
        amounts charged, delivery driver’s first name, photo, and route map. We also include other information on those
        receipts if required by law.
      </li>
      <li className="list-item">
        for those who participate in Graun’s referral program, we share certain data of referred users, such as order
        count, with the user who referred them as necessary to determine the referral bonus.
      </li>
      <p className="paragraph">2. At users’ request or with users’ consent </p>
      <p className="paragraph">This includes sharing data with:</p>
      <li className="list-item">
        Other people at a user’s request. For example, we share a user’s ETA and location with a friend when requested
        by that user
      </li>
      <li className="list-item">
        GRAUN business partners. For example, if a user requests a service through a partnership or promotional offering
        made by a third party, GRAUN may share certain data with those third parties. This may include, for example,
        other services, platforms, apps, or websites that integrate with our APIs; those with an API or service with
        which we integrate; or restaurant or merchant partners, or other GRAUN business partners and their users in
        connection with promotions, contests, or specialized services.
      </li>
      <li className="list-item">
        Emergency services. We offer features that enable users to share their data with police, fire, and ambulance
        services in the event of an emergency or after certain incidents. For more information, please see “Choice and
        Transparency” and “Emergency Data Sharing” below. 
      </li>
      <li className="list-item">
        Insurance companies. If a user has reported or submits a claim to an insurance company relating to Graun
        services, Graun will share certain data with that insurance company for the purpose of adjusting or handling the
        user’s insurance claim.
      </li>
      <p className="paragraph">3. With Graun service providers and business partners</p>
      <p className="paragraph">
        These include the third parties, or categories of third parties, listed below. Where a third party is
        identified, please see their linked privacy notices for information regarding their collection and use of
        personal data.
      </p>
      <li className="list-item">
        payment processors and facilitators, including  {''}
        <a href="https://stripe.com/" target="_blank" rel="noopener noreferrer">
          <span style={{ color: 'blue' }}>stripe</span>
        </a>
        .{' '}
      </li>
      <li className="list-item">background check, identity verification and risk solutions providers.</li>
      <li className="list-item">Cloud storage providers</li>
      <li className="list-item">Map Box, here Maps in connection with the use of Map Box Maps in Graun’s apps</li>
      <li className="list-item">
        Marketing partners and marketing platform providers, including social media advertising services, advertising
        networks, third-party data providers, and other service providers to reach or better understand our users and
        measure advertising effectiveness.
      </li>
      <p className="paragraph">4. For legal reasons or in the event of a dispute</p>
      <p className="paragraph">
        GRAUN may share users’ data if we believe it’s required by applicable law, regulation, operating agreement,
        legal process or governmental request, or where the disclosure is otherwise appropriate due to safety or similar
        concerns.
      </p>
      <p className="paragraph">
        This includes sharing data with law enforcement officials, public health officials, other government
        authorities, airports (if required by the airport authorities as a condition of operating on airport property),
        insurance companies, or other third parties as necessary to enforce our Terms of Service, user agreements, or
        other policies; to protect Graun’s rights or property or the rights, safety, or property of others; or in the
        event of a claim or dispute relating to the use of our services. In the event of a dispute relating to use of
        another person’s credit card, we may be required by law to share a user’s data, including order information,
        with the owner of that credit card.
      </p>
      <p className="paragraph">5. With your consent</p>
      <p className="paragraph">
        GRAUN may share your data other than as described in this notice if we notify you and you consent to the
        sharing.
      </p>

      <h3 className="subheading">E. Data Retention and Deletion</h3>
      <p className="paragraph">
        Graun retains user data for as long as necessary for the purposes described above. Users may request account
        deletion through the Graun apps and websites.  
      </p>
      <p className="paragraph">
        Graun retains user data for as long as necessary for the purposes described above, which varies depending on
        data type, the category of user to whom the data relates, the purposes for which we collected the data, and
        whether the data must be retained after an account deletion request for the purposes described below. 
        <p>For example, we retain data:</p>
      </p>
      <li className="list-item">
        for the life of users’ accounts if such data is necessary to provide our services. E.g., account data.{' '}
      </li>
      <li className="list-item">
        for 7 years if necessary to comply with tax requirements. E.g., drivers’ and or delivery location information.{' '}
      </li>
      <li className="list-item">
        for defined periods as necessary for purposes of safety or fraud prevention. E.g., we retain incomplete driver
        applications for 1 year, and rejected driver applications for 7 years.{' '}
      </li>
      <p className="paragraph">
        Following an account deletion request, we delete the user’s account and data, except as necessary for purposes
        of safety, security, fraud prevention or compliance with legal requirements, or because of issues relating to
        the user’s account (such as an outstanding credit or an unresolved claim or dispute). For delivery drivers, this
        generally means that we retain certain of their data for as long as necessary for actual or potential tax,
        litigation, or insurance claims. For rider and order recipients, we generally delete data within 90 days of an
        account deletion request, except where retention is necessary for the above reasons.
      </p>

      <h3 className="subheading">V. Legal information</h3>
      <h4 className="sub-subheading">A.  Data controllers and Data Protection Officer </h4>
      <p className="paragraph">
        Graun Ltd is controller of the data processed in connection with use of Graun’s services, except where it is
        joint controller with other Graun’s affiliates.
      </p>
      <p className="paragraph">
        Users may submit requests to exercise their rights regarding their data (order recipients and delivery driver by
        emailing at info@grauns.com.
      </p>
      <h4 className="sub-subheading">B. Legal Framework for Data Transfers </h4>
      <p className="paragraph">
        Graun operates, and processes user data within United Kingdom. We comply with applicable legal frameworks
        relating to the transfer of data.{' '}
      </p>
      <p className="paragraph">
        Graun may operate, and may processes user data, globally. This may result in processing of your personal data in
        countries, including the United States, whose data protection laws may differ from those where you live. This
        includes processing of your data on Graun’s servers in the United States, and transferring or enabling access to
        your data globally, in order to:
      </p>
      <li className="list-item">provide you services wherever you request them.</li>
      <li className="list-item">
        provide you access to your information, such as order history, wherever you request it. {' '}
      </li>
      <li className="list-item">provide access to and responses from Graun’s customer service agents. </li>
      <h3 className="subheading">C. Updates to this Privacy Notice  </h3>
      <div className="style">We may occasionally update this notice. </div>
      <p className="paragraph">
        We may occasionally update this notice. If we make significant changes, we will notify users in advance of the
        changes through the Graun Apps or through other means, such as email. We encourage users to periodically review
        this notice for the latest information on our privacy practices.{' '}
      </p>
      <p className="paragraph">
        Use of our services after an update constitutes consent to the updated notice to the extent permitted by law.{' '}
      </p>
    </div>
  );
};
export default PrivacyPolicy;
