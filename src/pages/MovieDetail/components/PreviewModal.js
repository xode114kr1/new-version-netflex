import Modal from "react-bootstrap/Modal";
import "./PreviewModal.style.css";
import YouTube from "react-youtube";
import { useYoutubeByIdQuery } from "../../../hooks/useYoutubeById";
import { Alert } from "react-bootstrap";

const PreviewModal = ({ isModalShow, handleModalClose, id }) => {
  const opts = {
    height: "540",
    width: "960",
  };

  const {
    data: youtubeId,
    isloading,
    isError,
    error,
  } = useYoutubeByIdQuery(id);
  if (isloading || !youtubeId) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <Alert variant="danger">{error}</Alert>;
  }
  console.log(youtubeId[0]?.key);
  return (
    <Modal
      show={isModalShow}
      onHide={handleModalClose}
      dialogClassName="no-background-modal"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <YouTube videoId={youtubeId[0]?.key} opts={opts} />
      </div>
    </Modal>
  );
};

export default PreviewModal;
