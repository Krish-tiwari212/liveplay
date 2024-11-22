import React from 'react'

const termsdata = [
  {
    title: "Definitions",
    data: `Platform: The term "Platform" refers to the website (www.liveplay.in) operated by Impact Stream Ventures (PAN: AALFI0173P), providing a space for hosting, managing and participating in sports events. 
Players: Players are users who register on the platform to participate in sports events. Players can be of any age, including children, as long as they register with parental or guardian consent. 
Organizers: Organizers are users who host and manage sports events on the platform. Organizers must be of legal age to enter into a binding agreement and are responsible for the events they host.`,
  },
  {
    title: "General Terms",
    data: `liveplay.in is operated by Impact Stream Ventures, a registered partnership firm operating from Pune, India. It is a sports event hosting platform that connects event organizers and participants. 
Organizers can host events on our platform, while players can register for events. This document is published in accordance with the provisions of Rule 3 (1) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021. By using liveplay.in, you acknowledge that you have read and agree to comply with these terms. liveplay.in reserves the right to modify these terms at any time. Changes will be effective immediately, and users will be notified of updates.`,
  },
  {
    title: "User Accounts and Registration",
    data: `Registration is mandatory to participate in events and access the dashboard. Users must provide accurate and complete personal information, including name, address, date of birth, gender, and identification (Additionally, PAN, GST Details, Aadhaar and Bank Details shall be uploaded by organizers to comply with verification and payout processes). Users are allowed to have only one account, and sharing of accounts is strictly prohibited. There are no age restrictions for registering on the platform. Players, including children, can register with parental or guardian consent. Organizers must be of legal age to enter into a binding agreement to accept these terms. All users, including children, must accept these terms and conditions before registering on the platform. For players under the legal age, a parent or legal guardian must consent to these terms on their behalf. Organizers and players are required to provide accurate details for event hosting and participation. 
liveplay.in does not have separate agreements with turfs or playing venues. liveplay.in provides a free match generator tool for all users, even if their event is not hosted on the platform. This tool can be used without signing up. Users are responsible for maintaining the confidentiality of their account credentials. Any unauthorized access must be reported immediately. liveplay.in reserves the right to terminate access or accounts without prior notice for breach of these Terms.`,
  },
  {
    title: "Content Guidelines and Responsibilities",
    data: `All content uploaded on the platform by organizers or players, including event descriptions, event details, event posters, and Q&A contributions, must be suitable for all age groups and shall be classified as "U" rating. Users are strictly prohibited from hosting, displaying, uploading, modifying, publishing, transmitting, storing, updating, or sharing any content that is harmful to children or inappropriate for a general audience. Organizers are solely responsible for ensuring that the content they upload complies with applicable laws and regulations, including the Information Technology (Intermediaries guidelines) Rules, 2021. 
liveplay.in reserves the right to remove or moderate any content that violates these guidelines or is deemed harmful, offensive, or inappropriate. Users, who fail to comply with these content guidelines may face account termination and be debarred from future participation or event hosting on the platform.`,
  },
  {
    title: "Services and Limitation of Liability",
    data: `liveplay.in provides a platform for sports event hosting and participation, including event management tools, match fixtures, live scoring, and more. liveplay.in acts as an intermediary platform and is not a party to any communication or interaction between users, organizers, or participants. Event organizers are solely responsible for the quality, safety, and compliance of their events with applicable laws and regulations. Users (players and organizers) are solely responsible for ensuring they meet all event requirements, including health and skill prerequisites. 
liveplay.in is not liable for any injury, loss, damage, or disputes arising from participation in events. liveplay.in is not responsible for event cancellations, rescheduling, or disputes between event organizers and participants.`,
  },
  {
    title: "User Conduct",
    data: `Users must not engage in any illegal activities or use the platform to harass or defraud others. Users agree to indemnify and hold harmless liveplay.in, its partners and affiliates from any claims, damages or losses arising out of breaches of these terms, misuse of the platform or participation in events. 
The platform reserves the right to terminate user access or accounts without prior notice in the event of a breach of these terms.`,
  },
  {
    title: "Organizer Event Hosting",
    data: `Event organizers can host events without paying any upfront fees. A platform fee amounting to 10% of the net event sales (“Net event sales” shall be computed by deducting discounts & refunds from the event registration fees collected for an event) will be deducted from event sales proceeds and net proceeds shall be remitted to the Organizers post successful event completion. Organizers must upload bank details and necessary documents, such as PAN and Aadhaar, to receive payouts
Organizers are responsible for providing accurate event details, including date, venue, and regulations. Event organizers must ensure all business information and event details are correct. Incorrect details may lead to penalties or cancellation. Organizers are solely responsible for ensuring the accuracy of player information and the creditworthiness of participants`,
  },
  {
    title: "Event Booster Plans",
    data: `Organizers can opt for event booster plans (Standard, Pro, Elite) to access additional features. Upon payment of the booster plan subscription fee (which is on a per-event basis), the features of the chosen booster plan will be automatically enabled on the organizer's account. The booster plan validity lasts until the completion of the event. 
Pro and Elite organizers get a featured listing for their event, prominently displayed on the landing page for 3 days (Pro) or 7 days (Elite). Pro and Elite organizers receive dedicated badges that remain visible on their profiles even after event completion. Pro organizers can edit event dates once after going live, while Elite organizers can do so twice. Standard users do not have this feature and must cancel and recreate the event if needed. Elite organizers pay a lower cancellation fee of 5%, while Pro and Standard users pay 7.5% of net event sales. Only Elite organizers have access to live match score updates and receive priority support for event setup and management.`,
  },
  {
    title: "Privacy and Data Collection",
    data: `Types of user data collected include name, contact details, payment information, and identification documents for organizers. User data is collected solely for facilitating account creation, payments, and event participation. Details of data usage are available in the Privacy Policy. User data is shared with event organizers for participants who have registered for their events. 
Data may also be shared with third parties for analytics and advertising purposes. Appropriate security measures are taken to protect user data. liveplay.in ensures that personal user data is securely handled and protected`,
  },
  {
    title: "Payment Methods",
    data: `Payments may be made via UPI, Credit/Debit Cards, Net Banking and other available payment modes. 
Our payment aggregators comply with PCI-DSS (Payment Card Industry Data Security Standard) norms in India, ensuring that all transactions are conducted securely. liveplay.in does not store any payment-related information on its servers. All payment details are handled by the payment aggregators, which adhere to PCI-DSS compliance standards for data security.`,
  },
  {
    title: "Intellectual Property",
    data: `Any disputes arising from the use of liveplay.in will be resolved exclusively through arbitration in Pune, Maharashtra, India, in accordance with the Arbitration and Conciliation Act, 1996.`,
  },
  {
    title: "Dispute Resolution",
    data: `Payments may be made via UPI, Credit/Debit Cards, Net Banking and other available payment modes. 
Our payment aggregators comply with PCI-DSS (Payment Card Industry Data Security Standard) norms in India, ensuring that all transactions are conducted securely. liveplay.in does not store any payment-related information on its servers. All payment details are handled by the payment aggregators, which adhere to PCI-DSS compliance standards for data security.`,
  },
  {
    title: "Limitation of Liability",
    data: `Impact Stream Ventures is not liable for any loss or damages arising from the use of the platform, including event cancellations, player withdrawals, or disputes between organizers and participants. Users agree to use liveplay.in at their own risk.`,
  },
];

const page = () => {
  return (
    <div className="py-8 px-4 md:py-12 md:px-20">
      <h1 className="text-2xl md:text-4xl font-semibold mb-8">
        Terms and Conditions
      </h1>
      <p className="mb-2  text-md md:text-xl">
        Welcome to liveplay.in - Your go-to platform for hosting and
        participating in sports events. Please carefully read our Terms and
        Conditions, Refund Policy and Cancellation Policy before using our
        platform. By accessing and using liveplay.in, you agree to comply with
        the following terms:
      </p>
      {termsdata.map((e, i) => (
        <div>
          <h1 className="font-bold text-md md:text-xl mb-1">
            {i + 1}. {e.title}
          </h1>
          <p className="mb-3 text-base md:text-lg whitespace-pre-line">
            {e.data}
          </p>
        </div>
      ))}

      <p className="mb-10 text-sm md:text-lg">
        For any questions or concerns regarding these terms, please contact us
        at
        <span className="font-bold hover:underline mx-1">support@liveplay.in</span>
      </p>
    </div>
  );
}

export default page
