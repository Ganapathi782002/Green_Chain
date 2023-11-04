// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tracking {
    enum ShipmentStatus {
        PENDING,
        IN_TRANSIT,
        RECEIVED_BY_TRANSPORTER, 
        IN_CUSTOMS_INSPECTION,  
        DELIVERED
    }


    struct Shipment {
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;
    }


    mapping(address => Shipment[]) public shipments;
    uint256 public shipmentCount;

     struct TyepShipment {
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;
    }

    TyepShipment[] tyepShipments;
    

    event ShipmentCreated(address indexed sender, address indexed receiver, uint256 pickupTime, uint256 distance, uint256 price);
    event ShipmentInTransit(address indexed sender, address indexed receiver, uint256 pickupTime);
    event ShipmentDelivered(address indexed sender, address indexed receiver, uint256 deliveryTime);
    event ShipmentPaid(address indexed sender, address indexed receiver, uint256 amount);
    event ShipmentReceivedByTransporter(address indexed sender, address indexed receiver, uint256 pickupTime);
    event ShipmentInCustomsInspection(address indexed sender, address indexed receiver, uint256 pickupTime);

    constructor() {
        shipmentCount = 0;
    }

     function createShipment(address _receiver, uint256 _pickupTime, uint256 _distance, uint256 _price) public payable {
        require(msg.value == _price, "Payment amount must match the price.");
        
        Shipment memory shipment = Shipment(msg.sender, _receiver, _pickupTime, 0, _distance, _price, ShipmentStatus.PENDING, false);

        shipments[msg.sender].push(shipment);
        shipmentCount++;

         tyepShipments.push(
            TyepShipment(
                msg.sender, 
                _receiver, 
                _pickupTime, 
                0, 
                _distance, 
                _price, 
                ShipmentStatus.PENDING, 
                false
            )
        );
        
        emit ShipmentCreated(msg.sender, _receiver, _pickupTime, _distance, _price);
    }

    function startShipment(address _sender, address _receiver, uint256 _index) public {
        Shipment storage shipment = shipments[_sender][_index];
        TyepShipment storage tyepShipment = tyepShipments[_index];
        
        require(shipment.receiver == _receiver, "Invalid receiver.");
        require(shipment.status == ShipmentStatus.PENDING, "Shipment already in transit.");

        shipment.status = ShipmentStatus.IN_TRANSIT;
        tyepShipment.status = ShipmentStatus.IN_TRANSIT;

        emit ShipmentInTransit(_sender, _receiver, shipment.pickupTime);
    }
    function markShipmentReceivedByTransporter(address _sender, uint256 _index) public {
            Shipment storage shipment = shipments[_sender][_index];

            require(shipment.status == ShipmentStatus.IN_TRANSIT, "Shipment is not in transit.");

            shipment.status = ShipmentStatus.RECEIVED_BY_TRANSPORTER;

                emit ShipmentReceivedByTransporter(_sender, shipment.receiver, shipment.pickupTime);
    }

    function markShipmentInCustomsInspection(address _sender, uint256 _index) public {
            Shipment storage shipment = shipments[_sender][_index];

            require(shipment.status == ShipmentStatus.RECEIVED_BY_TRANSPORTER, "Shipment not received by transporter.");
            require(shipment.status != ShipmentStatus.IN_CUSTOMS_INSPECTION, "Shipment is already in customs inspection.");
            require(!shipment.isPaid, "Shipment is already paid.");

            shipment.status = ShipmentStatus.IN_CUSTOMS_INSPECTION;

            emit ShipmentInCustomsInspection(_sender, shipment.receiver, shipment.pickupTime);
        }


    function completeShipment(address _sender, address _receiver, uint256 _index) public {
        Shipment storage shipment = shipments[_sender][_index];
        TyepShipment storage tyepShipment = tyepShipments[_index];

        require(shipment.receiver == _receiver, "Invalid receiver.");
        require(shipment.status == ShipmentStatus.IN_CUSTOMS_INSPECTION, "Shipment not verified by customs.");
        require(!shipment.isPaid, "Shipment already paid.");

         shipment.status = ShipmentStatus.DELIVERED;
         tyepShipment.status = ShipmentStatus.DELIVERED;
         tyepShipment.deliveryTime = block.timestamp;
         shipment.deliveryTime = block.timestamp;

        uint256 amount = shipment.price;

        payable(shipment.sender).transfer(amount);

        shipment.isPaid = true;
        tyepShipment.isPaid = true;

        emit ShipmentDelivered(_sender, _receiver, shipment.deliveryTime);
        emit ShipmentPaid(_sender, _receiver, amount);
    }

    function getShipment(address _sender, uint256 _index) public view returns (address, address, uint256, uint256, uint256, uint256, ShipmentStatus, bool) {
        Shipment memory shipment = shipments[_sender][_index];
        return (shipment.sender, shipment.receiver, shipment.pickupTime, shipment.deliveryTime, shipment.distance, shipment.price, shipment.status, shipment.isPaid);
    }

    function getShipmentsCount(address _sender) public view returns (uint256) {
        return shipments[_sender].length;
    }

     function getAllTransactions()
        public
        view
        returns (TyepShipment[] memory)
    {
        return tyepShipments;
    }
   
}