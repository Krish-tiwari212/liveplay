import React from "react";

const page = () => {
  return (
    <div className="py-8 px-4 md:py-12 md:px-20">
      <h1 className="text-2xl md:text-4xl font-semibold mb-8">Refund Policy</h1>
      <p className="mb-2 font-medium text-base md:text-lg">
        Players can withdraw from an event at any point before the event
        withdrawal deadline only if they have opted to pay the withdrawal fee
        while registration amounting to 5% of the registration fee. Their refund
        will be processed within a reasonable time. Refunds for players shall
        not include the optional 5% withdrawal fee if the player has opted for
        withdrawal before the event's completion.
      </p>
      <p className="mb-10 font-medium text-base md:text-lg">
        In case an organizer cancels an event, all registered players will
        receive a full refund of the registration fee. Refunds will be initiated
        within 7 business days. If an organizer fails to conduct an event
        without prior notice or cancellation, all registered players will
        receive a refund after deduction of the cancellation fee from their
        registration fees paid. In such situations, where the organizers do not
        pay the cancellation fee and the players are required to bear the
        cancellation fee, the organizer shall be debarred from hosting any
        future event on the platform. The platform shall take strict action
        against such issues.
      </p>
    </div>
  );
};

export default page;
