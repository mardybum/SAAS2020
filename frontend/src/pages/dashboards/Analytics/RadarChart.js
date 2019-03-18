import React from "react";
import { Radar } from "react-chartjs-2";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";

import { MoreHorizontal } from "react-feather";

const RadarChart = () => {
  const data = {
    labels: ["Technology", "Sports", "Media", "Gaming", "Arts"],
    datasets: [
      {
        label: "Interests",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        borderColor: "#2979ff",
        pointBackgroundColor: "#2979ff",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#2979ff",
        data: [70, 53, 82, 60, 33]
      }
    ]
  };

  const options = { maintainAspectRatio: false };

  return (
    <Card className="flex-fill w-100">
      <CardHeader>
        <div className="card-actions float-right">
          <UncontrolledDropdown>
            <DropdownToggle tag="a">
              <MoreHorizontal />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <CardTitle tag="h5" className="mb-0">
          Interests
        </CardTitle>
      </CardHeader>
      <CardBody className="d-flex">
        <div className="align-self-center w-100">
          <div className="chart">
            <Radar data={data} options={options} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default RadarChart;
