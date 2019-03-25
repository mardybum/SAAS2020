import React from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import TableHeaderColumn from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory from "react-bootstrap-table2-editor";



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


class PersonList extends React.Component {
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

    componentDidMount() {
    axios.get("http://localhost:8000/api/zone/")
      .then(res => {
        const zones = res.data;
        this.setState({ zones });
      })
    }


    handleSubmit = e => {

        e.preventDefault();

        const itemToBeSubmitted = {
            title: this.state.activeItem.title,
            description: this.state.activeItem.description,
            completed: this.state.activeItem.completed
        };

        if (itemToBeSubmitted.id) {
            console.log(itemToBeSubmitted)
          axios
            .put(`http://localhost:8000/api/zone/${itemToBeSubmitted.id}/`, itemToBeSubmitted)
            .then(res => this.refreshList());
          return;
        }

        axios
          .post("http://localhost:8000/api/zone/", itemToBeSubmitted)
          .then(res => this.refreshList());
    };

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

    editItem = item => {
        if(this.state.zones[this.state.zones.length - 1].id === item.id)
        {

            console.log(item)
            console.log(this.state.zones[this.state.zones.length - 1].id)

            axios
                .put(`http://localhost:8000/api/zone/${item.id}/`, item)
                .then(res => this.refreshList());


            const itemToBeSubmitted = {
                    title: " ",
                    description: " ",
                    completed: false
             };

            axios
              .post("http://localhost:8000/api/zone/", itemToBeSubmitted)
              .then(res => this.refreshList());
        }
    };

    expandRow = {

        renderer: row => (
          <div>
            {/* Put table here */}
          </div>
        ),
        showExpandColumn: true,
        expandHeaderColumnRenderer: ({ isAnyExpands }) =>
          isAnyExpands ? (
            <MinusCircle width={16} height={16} />
          ) : (
            <PlusCircle width={16} height={16} />
          ),
        expandColumnRenderer: ({ expanded }) =>
          expanded ? (
            <MinusCircle width={16} height={16} />
          ) : (
            <PlusCircle width={16} height={16} />
          )
    };

    tableColumns = [
      {
        dataField: "id",
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
            <Button color="outline-dark" className="mr-1 mb-1" >
                {"Details"}
            </Button>
          );
        }
      }
    ];

    cellEdit = cellEditFactory({

        mode: 'click',
        blurToSave: true,
        afterSaveCell: (oldValue, newValue, row, column) => {
            this.editItem(row)
        }
    });

    PaginationTable = () => (

        <Card>
          <CardHeader>
            <h6 className="card-subtitle text-muted">
              <CenteredModal />
            </h6>
          </CardHeader>
          <CardBody>
            <BootstrapTable
              keyField="id"
              data={this.state.zones}
              columns={this.tableColumns}
              expandRow={this.expandRow}
              bootstrap4
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

    this.state = {};
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

  render() {
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
                  Centered modal
                </ModalHeader>
                <ModalBody className="text-center m-3">
                  <p className="mb-0">
                    Use Bootstrap’s JavaScript modal plugin to add dialogs to
                    your site for lightboxes, user notifications, or completely
                    custom content.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={() => this.toggle(index)}>
                    Close
                  </Button>{" "}
                  <Button
                    color={color.value}
                    onClick={() => this.toggle(index)}
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

export default PersonList;