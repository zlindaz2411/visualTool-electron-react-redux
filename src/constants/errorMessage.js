import { confirmAlert } from "react-confirm-alert";

/**
 * Constants of error message
 */
export const ErrMessage ={
    MST_NOT_FOUND : "MST not found"
}


/**
 * When there isn't a graph, display error message
 */
export function emptyGraphMessage(){
        confirmAlert({
          title: `Warning!`,
          message: `There isn't a submitted graph, please go to "Draw Graph" and submit one`,
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
export function endOfAlgorithmMessage(){
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
export function startOfAlgorithmMessage(){
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
export function noRootSelectedMessage(){
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