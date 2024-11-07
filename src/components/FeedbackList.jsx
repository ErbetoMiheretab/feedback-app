import React from "react";
import { useContext } from "react";
import PropTypes from "prop-types";
import FeedbackItem from "./FeedbackItem";
import FeedbackContext from "../context/FeedbackContext";


const FeedbackList = () => {
  const{feedback} =useContext(FeedbackContext)

  if (!feedback || feedback.length === 0) {
    return <p>No Feedback Yet</p>;
  }

  return (
    <div className="feedback-list">
      {feedback.map((item) => (
        <FeedbackItem key={item.id} item={item}  />
      ))}
    </div>
  );
};



export default FeedbackList;
