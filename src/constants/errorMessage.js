import { confirmAlert } from "react-confirm-alert";

/**
 * Constants of error message
 */
export const ErrMessage = {
  MST_NOT_FOUND: "MST not found",
  CMST_NOT_FOUND: "CMST not found",
  DCMST_NOT_FOUND: "DCMST not found"
};

/**
 * When there isn't a graph, display error message
 */
export function emptyGraphMessage() {
  confirmAlert({
    title: `Warning!`,
    message: `You haven't submitted a graph yet. Please go to "Draw Graph" and submit one`,
    buttons: [
      {
        label: "Cancel"
      }
    ]
  });
}

/**
 * When the input is not only digit display;
 */
export function onlyNumberErrorMessage() {
  confirmAlert({
    title: `Warning!`,
    message: `You must enter a number`,
    buttons: [
      {
        label: "Cancel"
      }
    ]
  });
}

/**
 * When the input is empty; display error message
 */
export function emptyInputErrorMessage() {
  confirmAlert({
    title: `Warning!`,
    message: `The field cannot be empty`,
    buttons: [
      {
        label: "Cancel"
      }
    ]
  });
}

/**
 * When there isn't a graph, display error message
 */
export function algorithmErrorMessage() {
  confirmAlert({
    title: `Error!`,
    message: `Unable to find a solution. Please check your inputs.`,
    buttons: [
      {
        label: "Cancel"
      }
    ]
  });
}

/**
 * At the end of the algorithm, when user try to go further, display message
 */
export function endOfAlgorithmMessage() {
  confirmAlert({
    title: `Warning!`,
    message: `End of the algorithm`,
    buttons: [
      {
        label: "Cancel"
      }
    ]
  });
}

/**
 * At the start of the algorithm, when user try to go to previous state, display message
 */
export function startOfAlgorithmMessage() {
  confirmAlert({
    title: `Warning!`,
    message: `Nothing before the start of the algorithm`,
    buttons: [
      {
        label: "Cancel"
      }
    ]
  });
}

/**
 * When user has not selected the root and tries to do else, display message
 */
export function noRootSelectedMessage() {
  confirmAlert({
    title: `Warning!`,
    message: `You must select a root node`,
    buttons: [
      {
        label: "Cancel"
      }
    ]
  });
}

/**
 * When the graph is not selected and the user wants to do somthing with the graph, display message
 */
export function graphNotSelectedMessage() {
  confirmAlert({
    title: `Warning!`,
    message: `You have not selected a graph`,
    buttons: [
      {
        label: "Cancel"
      }
    ]
  });
}
