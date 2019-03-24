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
  Row,
  Table
} from "reactstrap";

import { Edit2, Trash, MinusCircle, PlusCircle  } from "react-feather";


import avatar1 from "../../assets/img/avatars/avatar.jpg";
import avatar2 from "../../assets/img/avatars/avatar-2.jpg";
import avatar3 from "../../assets/img/avatars/avatar-3.jpg";
import avatar4 from "../../assets/img/avatars/avatar-4.jpg";


class PersonList extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            activeItem: {
                title: "",
                description: "",
                completed: false
            },

            todolist: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    refreshList = () => {
        axios
          .get("http://localhost:8000/api/todos/")
          .then(res => this.setState({ todolist: res.data }))
          .catch(err => console.log(err));
    };

      componentDidMount() {
        axios.get("http://localhost:8000/api/todos/")
          .then(res => {
            const todolist = res.data;
            this.setState({ todolist });
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
                .put(`http://localhost:8000/api/todos/${itemToBeSubmitted.id}/`, itemToBeSubmitted)
                .then(res => this.refreshList());
              return;
            }

            axios
              .post("http://localhost:8000/api/todos/", itemToBeSubmitted)
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
              .delete(`http://localhost:8000/api/todos/${item}`)
              .then(res => this.refreshList());
        };

        editItem = item => {


            if(this.state.todolist[this.state.todolist.length - 1].id === item.id)
            {

                console.log(item)
                console.log(this.state.todolist[this.state.todolist.length - 1].id)

                axios
                    .put(`http://localhost:8000/api/todos/${item.id}/`, item)
                    .then(res => this.refreshList());


                  const itemToBeSubmitted = {
                        title: " ",
                        description: " ",
                        completed: false
                    };


            axios
              .post("http://localhost:8000/api/todos/", itemToBeSubmitted)
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



BasicForm = () => (

    <Card>
        <CardHeader>
            <CardTitle tag="h5">Basic form</CardTitle>
            <h6 className="card-subtitle text-muted">
            Default Bootstrap form layout.
            </h6>
        </CardHeader>
        <CardBody>
            <Form onSubmit={this.handleSubmit}>

                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input
                    type="text"
                    name="title"
                    value={this.state.activeItem.title}
                    onChange={this.handleChange}
                    placeholder="Enter Todo Title"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input
                    type="text"
                    name="description"
                    value={this.state.activeItem.description}
                    onChange={this.handleChange}
                    placeholder="Enter Todo description"
                  />
                </FormGroup>
                <FormGroup check>
                  <Label for="completed">
                    <Input
                      type="checkbox"
                      name="completed"
                      checked={this.state.activeItem.completed}
                      onChange={this.handleChange}
                    />
                    Completed
                  </Label>
                </FormGroup>

                <Button color="primary" type="submit">Submit</Button>
            </Form>
        </CardBody>
    </Card>
);


tableColumns = [
  {
    dataField: "title",
    text: "title",
    sort: true,
  },
  {
    dataField: "description",
    text: "description",
    type: 'textarea' ,
    sort: true,
  },
  {
    dataField: 'df1',
    isDummyField: true,
    text: 'Action 1',
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
        <CardTitle tag="h5">Pagination</CardTitle>
        <h6 className="card-subtitle text-muted">
          Pagination by react-bootstrap-table2
        </h6>
      </CardHeader>
      <CardBody>
        <BootstrapTable
          keyField="id"
          data={this.state.todolist}
          columns={this.tableColumns}
          deleteRow={ true }
          expandRow={this.expandRow}
          bootstrap4
          cellEdit={ this.cellEdit }
          bordered={false}>
        </BootstrapTable>

      </CardBody>
    </Card>
);

Tables = () => (

    <Container fluid className="p-0">
        <h1 className="h3 mb-3">Tables</h1>

        <Row>
            <Col lg="6">
            {this.BasicForm()}
            </Col>
        </Row>

        {this.PaginationTable()}
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

export default PersonList;