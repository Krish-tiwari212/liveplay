import React from "react";

const page = () => {
  return (
    <div className="py-8 px-4 md:py-12 md:px-20">
      <h1 className="text-2xl md:text-4xl font-semibold mb-8">Refund Policy</h1>
      <p className="mb-4 text-base md:text-lg">
        Players may withdraw from an event or event category after successful
        registration and payment, provided that the withdrawal is initiated
        immediately after registration but no later than the last day to
        withdraw as specified by the event organizer.
      </p>
      <p className="mb-4 text-base md:text-lg">
        To initiate the withdrawal, players must access the withdrawal option in
        the registration panel within the event card, available in their player
        dashboard. From there, players can select the specific event categories
        they wish to withdraw from.
      </p>
      <p className="mb-4 text-base md:text-lg">
        Refunds will only be available if the player has opted for the
        withdrawal fee at the time of registration, amounting to 5% of the
        registration fee. In such cases, the withdrawal fee is non-refundable.
      </p>
      <p className="mb-4 text-base md:text-lg">
        Upon receipt of a valid withdrawal request, liveplay.in shall initiate
        the refund process within 5-7 working days, and the amount will be
        credited to the player's bank account. Please note that the refund will
        not include the optional 5% withdrawal fee.
      </p>
      <p className="mb-4 text-base md:text-lg">
        In the event of an organizer's cancellation of an event, all registered
        players are entitled to a full refund of the registration fee, which
        will be initiated within 7 business days. If an organizer fails to
        conduct an event without prior notice or proper cancellation, a refund
        will be provided to all registered players after deduction of the
        applicable cancellation fee. Should the organizer fail to pay this
        cancellation fee, resulting in the burden falling on the players, the
        organizer will be prohibited from hosting any future events on the
        platform. Strict action will be taken in such circumstances.
      </p>
      <p className="mb-10  text-base md:text-lg">
        For any questions or concerns regarding refunds, please contact us at
        <span className="font-bold mx-1 hover:underline cursor-pointer">
          liveplayindia@gmail.com
        </span>
      </p>
    </div>
  );
};

export default page;
