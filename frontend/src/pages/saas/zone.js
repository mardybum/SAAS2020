import ZoneList from './main'
import React from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import TableHeaderColumn from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory from "react-bootstrap-table2-editor";
import './style.css';


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


const colors = [

  {
    name: "Add Component",
    value: "success"
  }
];



class Zone extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            activeItem: {
                id: "",
                componentName: "",
                componentDescription: "",
                zone: ""
            },
            zones: [],
            components: [],
            activeComponent: []
        };
    }

    refreshList = () => {
        axios
          .get("http://localhost:8000/api/zone/")
          .then(res => this.setState({ zones: res.data }))
          .catch(err => console.log(err));

        axios
          .get("http://localhost:8000/api/component/")
          .then(res => this.setState({ components: res.data }))
          .catch(err => console.log(err));
    };

//Allways called when component initializes
    componentDidMount() {

        axios.get("http://localhost:8000/api/zone/")
          .then(res => {
            const zones = res.data;
            this.setState({zones: zones });

            //Find the passed property in the zone array and set it to the active item
            this.state.activeItem = this.state.zones.find(element => element.id === this.props.location.state.id)
          })

          axios.get("http://localhost:8000/api/component/")
          .then(res => {
            const component = res.data;
            this.setState({components: component });

          })
    }

   handleDelete = item => {
        axios
          .delete(`http://localhost:8000/api/component/${item}`)
          .then(res => this.refreshList());

        //console.log(this.state.components.filter(compElement => compElement.zone === this.props.location.state.id))
    };


    //Edit the last item of a table
    editItem = item => {

        axios
            .put(`http://localhost:8000/api/component/${item.id}/`, item)



        //Check if the user operates on the last row; This is in order to add requirements directly in the last row
        //of the table
        if(this.state.zones[this.state.zones.length - 1].id === item.id)
        {

            console.log(item)
            console.log(this.state.zones[this.state.zones.length - 1].id)

            axios
                .put(`http://localhost:8000/api/component/${item.id}/`, item)
                .then(res => this.refreshList());


            const itemToBeSubmitted = {
                    title: " ",
                    description: " ",
                    completed: false
             };

            axios
              .post("http://localhost:8000/api/component/", itemToBeSubmitted)
              .then(res => this.refreshList());
        }
    };

       //Toggle the state of the modal (shall it be displayed or not?)
    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    handleSubmitModal = item => {


        item.zone = this.props.location.state.id

        if (item.id) {
          axios
            .put(`http://localhost:8000/api/component/${item.id}/`, item)
            .then(res => this.refreshList());
          return;
        }
        axios
          .post("http://localhost:8000/api/component/", item)
          .then(res => this.refreshList());

        console.log(item)
    };


    //Call the edit item function in order to edit a cell of a table (in this case the last element
    cellEdit = cellEditFactory({

        mode: 'click',
        blurToSave: true,
        afterSaveCell: (oldValue, newValue, row, column) => {
            this.editItem(row)
        }
    });

    componentTableColumns = [
        {
            dataField: "id",
            text: "ID",
            editable: false,
            headerStyle: (colum, colIndex) => {
              return { width: '120px'};
            },
            sort: true,
        },
        {
            dataField: "componentName",
            text: "Component",
            type: 'textarea' ,
            headerStyle: (colum, colIndex) => {
              return { width: '250px'};
            },
            sort: false,
        },
        {
            dataField: "componentDescription",
            text: "Description",
            type: 'textarea' ,
            headerStyle: (colum, colIndex) => {
              return { width: '450px'};
            },
            sort: false,
        },
        {
            dataField: 'df1',
            isDummyField: true,
            text: 'Action',
            editable: false,
            formatter: (cellContent, row) => {


              return (
                  <h5>
                    <Trash className="align-middle" type="submit" onClick={() => this.handleDelete(row.id)} size={18}  />
                  </h5>
                );
              }
        }
    ];


    componentTable = () => (

        //Find the foreign key in the list of the components; The foreign key is passed from the main.js
        //The foreign key is searched in the "zone" element of the components and the foreign key comes from
        //selected zone

        <Card>
          <CardHeader>
            <CardTitle tag="h5">Components</CardTitle>
            <h6 className="card-subtitle text-muted">
                <Createcomponentmodal
                    activeItem={this.state.activeItem}
                    toggle={this.toggle}
                    onSave={this.handleSubmitModal}
                    />
            </h6>
          </CardHeader>
          <CardBody>
            <BootstrapTable
              keyField="id"
              data={this.state.components.filter(compElement => compElement.zone === this.props.location.state.id)}
              columns={this.componentTableColumns}
              deleteRow={ true }
              bootstrap4
              //striped
              hover
              maxHeight={5}
              cellEdit={ this.cellEdit }
              bordered={false}>
            </BootstrapTable>





          </CardBody>



        </Card>
    );


    Tables = () => (

        <Container fluid className="p-0">

                {this.componentTable()}

        </Container>

    );

    render() {
        return (
            <div>
                {this.Tables()}
            </div>
        )
      }
}



class Createcomponentmodal extends React.Component {
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

    this.state.activeItem = ""
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
                  Component Creation
                </ModalHeader>
                <ModalBody className="text-center m-3">

                  <Form>
                        <FormGroup row>
                          <Label sm={2} className="text-sm-right">
                            Name:
                          </Label>
                          <Col sm={10}>
                            <Input type="text" name="componentName" value={this.state.activeItem.componentName || ''}
                            onChange={this.handleChange}
                            placeholder="Component Name.." />
                          </Col>
                        </FormGroup>

                        <FormGroup row>
                          <Label sm={2} className="text-sm-right">
                            Description:
                          </Label>
                          <Col sm={10}>
                            <Input
                              type="textarea"
                              name="componentDescription"
                              value={this.state.activeItem.componentDescription}
                              onChange={this.handleChange}
                              placeholder="Component Description.."
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

export default Zone;