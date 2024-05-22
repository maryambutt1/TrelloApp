import React, { useState } from "react";
import { Plus, X } from "react-feather";

export default function AddCard(props) {
  const [show, setShow] = useState(false);
  const [card, setCard] = useState("");

  const saveCard = () => {
    if (!card) {
      return;
    }
    props.getCard(card);
    setCard("");
    setShow(!show);
  };

  const close = () => {
    setCard("");
    setShow(!show);
  };

  return (
    <div className="">
      <div className="flex flex-col">
        {show && (
          <div>
            <textarea
              value={card}
              onChange={(e) => setCard(e.target.value)}
              className="p-1 w-full rounded-lg border-2 bg-gray-100 text-black"
              placeholder="Enter a title for this card..."
              cols="30"
              rows="2"
            ></textarea>

            <div className="flex p-1">
              <div className="flex gap-x-2">
                <button
                  onClick={() => saveCard()}
                  className="text-white px-2 py-1 rounded items-center hover:bg-blue-700 bg-blue-600"
                >
                  Add Card
                </button>
                <button
                  onClick={() => close()}
                  className="hover:bg-gray-400 text-black rounded p-2"
                >
                  <X size={18}></X>
                </button>
              </div>
            </div>
          </div>
        )}
        {!show && (
          <button
            onClick={() => setShow(!show)}
            className={`flex items-center gap-x-2 hover:bg-gray-400 p-1 rounded w-full h-8 text-black cursor-pointer ${
              props.isDisabled
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-400"
            }`}
            disabled={props.isDisabled}
          >
            <Plus size={18}></Plus>
            Add a card
          </button>
        )}
      </div>
    </div>
  );
}
