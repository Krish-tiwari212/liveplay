import React from "react";

const termsdata = [
  {
    title: "Overview ",
    data: `We understand the importance of protecting personally identifiable information ("Personal Information"). We collect certain information from users to provide our services and ensure a safe environment for all participants and organizers. This Privacy Policy applies to all users of the platform, including those who may not be registered members but browse, access or view the site for informational purposes.`,
  },
  {
    title: "Information We Collect",
    data: `We collect login credentials, such as usernames and passwords, and store them in a secure manner. We collect personal information from participants and organizers, including names, addresses, email addresses, phone numbers, gender and identification documents (e.g., PAN, Aadhaar) to ensure event safety and prevent fraud. We may collect information on your browsing behaviour, including pages viewed, IP address, and other information required for analytics purposes. 
Information collected is also used to enhance the user experience and provide personalized services. Your location and language preferences may be used to streamline the Players and sporting events displayed to you on the Website.`,
  },
  {
    title: "How We Use Your Information",
    data: `We use your IP address to help diagnose problems with our server and to administer our Website. Your IP address is also used to help identify you and to gather broad demographic information. We may use your IP address to help protect our partners and ourselves from fraud. We use your contact information to send alerts and updates through WhatsApp, text messages and email regarding event participation, hosting and other platform updates. We share user data with event organizers to facilitate event management, which is a standard practice in the event hosting industry. User data is also shared with third-party analytics and advertisers to improve platform performance and provide relevant content and ads.
    Personal information is never sold or shared with third parties without your consent for any unethical purposes. 
`,
  },
  {
    title: "Sharing of your Information",
    data: `We will transfer information about you if we are acquired by or merged with another company. In such an event, we will notify you by email or by putting a prominent notice on the site before information about you is transferred and becomes subject to a different privacy policy. 
We may release your personal information to a third-party in order to comply with a Court Order or other similar legal procedure, or when we believe in good faith that such disclosure is necessary to comply with the law; prevent imminent physical harm or financial loss; or investigate or take action regarding illegal activities, suspected fraud, or violations of Our Terms of Use. 
We share user data with payment aggregators to process transactions securely. These payment aggregators adhere to PCI-DSS (Payment Card Industry Data Security Standard) norms to ensure secure data handling. We do not store payment-related information on our platform. All transactions are processed through third-party payment processors who maintain their own privacy policies.`,
  },
  {
    title: "Cookie Policy",
    data: `We use "cookies," which are small data files sent to your device, to enhance your experience on the platform. Cookies help us remember user preferences, store login information and provide personalized content. Cookies may be retained on your device temporarily or permanently, depending on their purpose. You can choose to block or delete cookies, but doing so may limit access to certain features of the platform. Our platform uses cookies to track user activities, such as pages visited and browsing behaviour, which help us improve the platform's functionality. 
Some cookies may be used for advertising purposes, including personalized advertisements based on user activity. We also use backend infrastructure services that may have their own cookie policies. Users can refer to those policies directly for more information.`,
  },
  {
    title: "Security of Your Information",
    data: `We take appropriate security measures to protect your personal information. We employ encryption and other data protection techniques to ensure your data is kept secure. User data is stored in secure databases and only accessible by authorized personnel. 
Payment information is handled by PCI-DSS compliant payment aggregators, ensuring that your financial data is processed safely.`,
  },
  {
    title: "Retention of Your Information",
    data: `We retain user data for as long as necessary to fulfil the purposes for which it was collected,
or as required by law. Personal information is retained for up to 10 years, after which it is
deleted or anonymized unless otherwise required for legal reasons.`,
  },
  {
    title: "Third-Party Services",
    data: `Our platform may contain links to third-party services, including payment gateways and
analytics providers. These third-party services have their own privacy policies and we
encourage users to review them. Once you leave our platform or are redirected to a thirdparty website, you are no longer governed by this Privacy Policy.`,
  },
  {
    title: "User Rights and Consent",
    data: `Users have the right to request access to their personal data, update information, or request deletion where applicable. For assistance, users can contact support@liveplay.in. Users, including parents or guardians for minor participants, must consent to the collection and use of personal information as outlined in this policy.`,
  },
  {
    title: "Modifications to the Privacy Policy",
    data: `We reserve the right to update or modify this Privacy Policy at any time without prior notice. Users are advised to review the policy regularly for changes. Continued use of liveplay.in after changes are posted constitutes acceptance of the revised policy.`,
  },
  {
    title: "Disclaimer",
    data: `Although we take all reasonable precautions to protect user data, we cannot guarantee complete security due to the inherent nature of the internet and regulatory requirements. Users are responsible for understanding that there may be risks associated with using online platforms and we encourage them to take necessary precautions.`,
  },
  {
    title: "Governing Law and Dispute Resolution",
    data: `This Privacy Policy shall be governed and construed in accordance with the laws of India. Any disputes arising under this Privacy Policy shall be resolved in accordance with the dispute resolution mechanism provided in our Terms and Conditions.`,
  },
];

const page = () => {
  return (
    <div className="py-8 px-4 md:py-12 md:px-20">
      <h1 className="text-2xl md:text-4xl font-semibold mb-8">
        Privacy Policy
      </h1>
      <p className="mb-2  text-md md:text-xl">
        Impact Stream Ventures ("we", "our", or "us"), the operator of
        liveplay.in, is committed to protecting the privacy of users ("you" or
        "users") who use our platform. This Privacy Policy explains how we
        collect, use, disclose and safeguard your information when you visit our
        website, participate in events, or use our services. By using
        liveplay.in, you agree to the practices described in this policy. If you
        have any questions or concerns regarding this Privacy Policy, you can
        write to us at support@liveplay.in.
      </p>
      {termsdata.map((e, i) => (
        <div key={i}>
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
        <span className="font-bold hover:underline mx-1 cursor-pointer">
          liveplayindia@gmail.com
        </span>
      </p>
    </div>
  );
};

export default page;
