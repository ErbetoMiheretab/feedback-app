import { createContext, useState, useEffect } from "react";
const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback()
  }, []);

  const fetchFeedback = async () => {
    const response = await fetch(
      `/feedback?_sort=id&_order=desc`
    )
    const data = await response.json()
    setFeedback(data)
    setIsLoading(false)
    
  };

  const deleteFeedback = async (id) => {
    if (window.confirm("Are u sure u want to delete?")) {
      await fetch(`/feedback/${id}`, {method: 'DELETE'})
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const addFeedback =async (newFeedback) => {
   const response = await fetch('/feedback',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newFeedback),
   })
    const data = await response.json()
    setFeedback([data, ...feedback]);
  };

  //Update Feedback item
  const updateFeedback = async (id, upItem) => {
    const response = await fetch (`/feedback/${id}`,{
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(upItem)
    })
    const data = await response.json()
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };

  //Set item to be Updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
