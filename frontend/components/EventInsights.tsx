import React from 'react'

const EventInsights = () => {
  return (
    <form className="bg-white p-5 rounded-lg shadow-2xl">
      <div className="flex flex-wrap w-full">
        <div className="w-full m-2 flex flex-col mb-4">
          <label className="" htmlFor="eventDescription">
            Event Description
          </label>
          <textarea
            id="eventDescription"
            name="eventDescription"
            rows={4}
            placeholder="Add description"
            required
            className="w-full p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800  focus:outline-none focus:shadow-lg"
          />
        </div>
        <div className="w-full m-2 flex flex-col mb-4">
          <label className="" htmlFor="eventUSP">
            Event USP
          </label>
          <textarea
            id="eventUSP"
            name="eventUSP"
            rows={4}
            placeholder="Add USP"
            required
            className="w-full p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800  focus:outline-none focus:shadow-lg"
          />
        </div>
        <div className="w-full m-2 flex flex-col mb-4">
          <label className="" htmlFor="RewardsAndParticipation">
            Rewards And Prices
          </label>
          <textarea
            id="RewardsAndParticipation"
            name="RewardsAndParticipation"
            rows={4}
            placeholder="Add Rewards"
            required
            className="w-full p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800  focus:outline-none focus:shadow-lg"
          />
        </div>
        <div className="w-full m-2 flex flex-col mb-4">
          <label className="" htmlFor="PlayingRules">
            Playing Rules
          </label>
          <textarea
            id="PlayingRules"
            name="PlayingRules"
            rows={4}
            placeholder="Add Rules"
            required
            className="w-full p-2 bg-white border rounded-md text-sm shadow-2xl text-gray-800 focus:border-gray-800  focus:outline-none focus:shadow-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800  text-white p-2 mx-2 rounded-md mt-4"
        >
          Next
        </button>
      </div>
    </form>
  );
}

export default EventInsights
