import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  Form,
  Services,
  Profile,
  CompleteShipment,
  GetShipment,
  StartShipment,
  Transport,
  Customs,
} from "../Components/index";
import { TrackingContext } from "../Conetxt/TrackingContext";

const Tracking = () => {
  const {
    currentUser,
    createShipment,
    getAllShipment,
    markInCustomsInspection,
    markReceivedByTransporter,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentsCount,
  } = useContext(TrackingContext);


  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [getModel, setGetModel] = useState(false);
  const [transportModal, setTransportModal] = useState(false);
  const [customsModal, setCustomsModal] = useState(false);

  const [allShipmentsdata, setAllShipmentsData] = useState([]);

  useEffect(() => {
    const getCampaignsData = getAllShipment();
    const fetchData = async () => {
      const allData = await getCampaignsData;
      setAllShipmentsData(allData);
    };

    fetchData();
  }, []);

  return (
    <>
      <Services
        setOpenProfile={setOpenProfile}
        setCompleteModal={setCompleteModal}
        setGetModel={setGetModel}
        setStartModal={setStartModal}
        setCustomsModal={setCustomsModal}
        setTransportModal={setTransportModal}
      />
      <Table
        setCreateShipmentModel={setCreateShipmentModel}
        allShipmentsdata={allShipmentsdata}
      />
      <Form
        createShipmentModel={createShipmentModel}
        createShipment={createShipment}
        setCreateShipmentModel={setCreateShipmentModel}
      />
      <Profile
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        currentUser={currentUser}
        getShipmentsCount={getShipmentsCount}
      />
      <CompleteShipment
        completeModal={completeModal}
        setCompleteModal={setCompleteModal}
        completeShipment={completeShipment}
      />
      <GetShipment getModel={getModel} setGetModel={setGetModel} getShipment={getShipment} />
      <StartShipment
        startModal={startModal}
        setStartModal={setStartModal}
        startShipment={startShipment}
      />
      <Transport
        transportModal={ transportModal}
        setTransportModal={setTransportModal}
        markReceivedByTransporter={markReceivedByTransporter}
      />
      <Customs
        customsModal={customsModal}
        setCustomsModal={setCustomsModal}
        markInCustomsInspection={markInCustomsInspection}
      />
    </>
  );
};

export default Tracking;