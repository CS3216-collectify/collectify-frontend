import { IonButton } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import useToastContext from "../../hooks/useToastContext";
import useUserContext from "../../hooks/useUserContext";
import { trackDeleteAccountEvent } from "../../services/react-ga";
import { deleteCurrentUser } from "../../services/users";
import { logoutUser } from "../../utils/auth/actions";
import ConfirmAlert from "../alert/ConfirmAlert";
import "./button.scss";

const DeleteAccountButton = () => {
  const history = useHistory();
  const setToast = useToastContext();
  const { setIsUserAuthenticated } = useUserContext();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const deleteHandler = async () => {
    try {
      await deleteCurrentUser();
      trackDeleteAccountEvent();
      logoutUser();
      setToast({ message: "Account was successfully deleted.", color: "success" });
      history.replace("/");
      setIsUserAuthenticated(false);
    } catch (e) {
      setToast({ message: "Account deletion failed. Please try again later.", color: "danger" });
    } finally {
      setDeleteConfirm(false);
    }
  };

  return (
    <>
      <ConfirmAlert
        title="Delete Account?"
        message="All you account data will be permanently deleted."
        isOpen={deleteConfirm}
        onCancel={() => setDeleteConfirm(false)}
        onConfirm={deleteHandler}
      />
      <IonButton fill="outline" color="danger" expand="block" className="follow-button" size="medium" onClick={() => setDeleteConfirm(true)}>
        Delete Account
      </IonButton>
    </>
  );
};

export default DeleteAccountButton;
