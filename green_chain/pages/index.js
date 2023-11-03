import React, { useState, useEffect, useContext } from "react";
import {
  // Table,
  // Form,
  // Services,
  // Profile,
  // CompleteShipment,
  // GetShipment,
  // StartShipment,
  Farmers,
  FarmerRegister,
  Restaurant,
  RestaurantRegister,
} from "../Components/index";
import { TrackingContext } from "../Conetxt/TrackingContext";

const Index = () => {
  const {
    currentUser,
    createShipment,
    getAllShipment,
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
      <h1>Home Page</h1>
      {/* <Services
        setOpenProfile={setOpenProfile}
        setCompleteModal={setCompleteModal}
        setGetModel={setGetModel}
        setStartModal={setStartModal}
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
      /> */}

    </>
  );
};

export default Index;
