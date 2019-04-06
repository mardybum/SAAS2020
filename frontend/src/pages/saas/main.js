import React from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import TableHeaderColumn from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory from "react-bootstrap-table2-editor";
import zone from './zone'
import { Switch, Route, Link } from 'react-router-dom'



import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  CustomInput,
  Form,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table
} from "reactstrap";

import { Edit2, Trash, MinusCircle, PlusCircle  } from "react-feather";


import avatar1 from "../../assets/img/avatars/avatar.jpg";
import avatar2 from "../../assets/img/avatars/avatar-2.jpg";
import avatar3 from "../../assets/img/avatars/avatar-3.jpg";
import avatar4 from "../../assets/img/avatars/avatar-4.jpg";

const colors = [

  {
    name: "Add Zone",
    value: "success"
  }
];


class ZoneList extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            activeItem: {
                id: "",
                zone_id: "",
                name: "",
                SLT: "",
                description: "",
                threats: ""
            },

            zones: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    refreshList = () => {
        axios
          .get("http://localhost:8000/api/zone/")
          .then(res => this.setState({ zones: res.data }))
          .catch(err => console.log(err));
    };


    //Allways called when component initializes
    componentDidMount() {
        axios.get("http://localhost:8000/api/zone/")
          .then(res => {
            const zones = res.data;

            this.setState({ zones });

          })
    }


    handleSubmit = e => {

        //stop refreshing the site
        e.preventDefault();

        const itemToBeSubmitted = {
            name: this.state.activeItem.name,
            description: this.state.activeItem.description,
            SLT: this.state.activeItem.completed,
            threats: this.state.activeItem.threats
        };

        if (itemToBeSubmitted.id) {
          axios
            .put(`http://localhost:8000/api/zone/${itemToBeSubmitted.id}/`, itemToBeSubmitted)
            .then(res => this.refreshList());
          return;
        }

        axios
          .post("http://localhost:8000/api/zone/", itemToBeSubmitted)
          .then(res => this.refreshList());
    };


    handleSubmitModal = item => {

        if (item.id) {
          axios
            .put(`http://localhost:8000/api/zone/${item.id}/`, item)
            .then(res => this.refreshList());
          return;
        }
        axios
          .post("http://localhost:8000/api/zone/", item)
          .then(res => this.refreshList());

       console.log(item)
    };

    //used to update the form
    handleChange = e => {
        let { name, value } = e.target;

        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }

        const activeItem = { ...this.state.activeItem, [name]: value };

        this.setState({activeItem });
    };

    handleDelete = item => {
        axios
          .delete(`http://localhost:8000/api/zone/${item}`)
          .then(res => this.refreshList());
    };


    //Toggle the state of the modal (shall it be displayed or not?)
    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    openZone = item => {

       //console.log('openZone')
       // console.log(this.state.zones.find(element => element.id === item.id));
    };




    tableColumns = [
      {
        dataField: "zoneId",
        text: "Zone ID",
        headerStyle: (colum, colIndex) => {
          return { width: '120px'};
        },
        sort: true,
      },
      {
        dataField: "name",
        text: "Zone Name",
        type: 'textarea' ,
        headerStyle: (colum, colIndex) => {
          return { width: '550px'};
        },
        sort: false,
      },
      {
        dataField: "SLT",
        text: "SL-T",
        type: 'textarea' ,
        sort: false,
      },
      {
        dataField: "threats",
        text: "Threats",
        type: 'textarea' ,
        sort: false,
      },
      {
        dataField: 'details',
        isDummyField: true,
        text: 'Details',
        editable: false,
        formatter: (cellContent, row) => {

          return (

            //Pass the zone ID from the row that has been clicked (row.id) and pass it to the link
            //Find the passed property in the zone array and set it to the active item
            <Link to={{ pathname: '/saas/zone', state: { id: row.id} }}>
                <Button color="outline-dark" onClick={() => this.openZone(row)} className="mr-1 mb-1" >
                    {"Details"}
                </Button>
            </Link>

          );
        }
      }
    ];




    PaginationTable = () => (

        <Card>
          <CardHeader>
            <CardTitle tag="h5">Zones</CardTitle>
            <h6 className="card-subtitle text-muted">
              <CenteredModal
                activeItem={this.state.activeItem}
                toggle={this.toggle}
                onSave={this.handleSubmitModal}
                />
            </h6>
          </CardHeader>
          <CardBody>
            <BootstrapTable
              keyField="id"
              data={this.state.zones}
              columns={this.tableColumns}
              bootstrap4
              hover
              bordered={false}>
            </BootstrapTable>

          </CardBody>
        </Card>
    );


    Renderer = () => (

        <Container fluid className="p-0">

            {this.PaginationTable()}
        </Container>

    );

    render() {
        return (
            <div>
                {this.Renderer()}
            </div>
        )
      }
}

class CenteredModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        activeItem: this.props.activeItem
    };

  }

  toggle = index => {
    this.setState(state => ({
      [index]: !state[index]
    }));
  };

  componentWillMount() {
    colors.forEach((color, index) => {
      this.setState(() => ({
        [index]: false
      }));
    });
  }

  resetValues () {

    this.state.activeItem = {
                id: "",
                zone_id: "",
                name: "",
                SLT: "",
                description: "",
                threats: ""
            }
  };

  handleChange = e => {
        let { name, value } = e.target;

        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }

        const activeItem = { ...this.state.activeItem, [name]: value };

        this.setState({activeItem });
    };

  render() {
    const { toggle, onSave } = this.props;
    return (
      <div>

          {colors.map((color, index) => (
            <React.Fragment key={index}>
              <Button
                color={color.value}
                onClick={() => this.toggle(index)}
                className="mr-1"
              >
                {color.name}
              </Button>
              <Modal
                isOpen={this.state[index]}
                toggle={() => this.toggle(index)}
                centered
              >
                <ModalHeader toggle={() => this.toggle(index)}>
                  Zone Creation
                </ModalHeader>
                <ModalBody className="text-center m-3">

                  <Form>
                        <FormGroup row>
                          <Label sm={2} className="text-sm-right">
                            Zone Title
                          </Label>
                          <Col sm={10}>
                            <Input type="text" name="name" value={this.state.activeItem.name}
                            onChange={this.handleChange}
                            placeholder="Zone Title.." />
                          </Col>
                        </FormGroup>

                        <FormGroup row>
                          <Label sm={2} className="text-sm-right">
                            Description
                          </Label>
                          <Col sm={10}>
                            <Input
                              type="textarea"
                              name="description"
                              value={this.state.activeItem.description}
                              onChange={this.handleChange}
                              placeholder="Zone Description.."
                              rows="3"
                            />
                          </Col>
                        </FormGroup>
                  </Form>


                </ModalBody>
                <ModalFooter>
                  <Button color="outline-dark" onClick={() => this.toggle(index)}>
                    Close
                  </Button>{" "}
                  <Button
                    color={color.value}
                    onClick={(event) => { onSave(this.state.activeItem); this.toggle(index); this.resetValues()}}

                  >
                    Save changes
                  </Button>
                </ModalFooter>
              </Modal>
            </React.Fragment>
          ))}
        </div>
    );
  }
}

export default ZoneList;