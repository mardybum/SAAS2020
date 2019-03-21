import React from "react";
import axios from "axios";




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

import { Edit2, Trash } from "react-feather";

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


        handleSubmit = () => {

            console.log(this.state.activeItem)

            const itemToBeSubmitted = {
                title: this.state.activeItem.title,
                description: this.state.activeItem.description,
                completed: this.state.activeItem.completed
            };


            if (itemToBeSubmitted.id) {
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

            console.log(item)

            axios
              .delete(`http://localhost:8000/api/todos/${item.id}`)
              .then(res => this.refreshList());
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

BasicTable = () => (

    <Card>
        <CardHeader>
        <CardTitle tag="h5">Basic Table</CardTitle>
        <h6 className="card-subtitle text-muted">
        Using the most basic table markup, here’s how .table-based tables look
        in Bootstrap.
        </h6>
        </CardHeader>

        <Table>
        <thead>
            <tr>
                <th style={{ width: "40%" }}>Name</th>
                <th style={{ width: "25%" }}>Phone Number</th>
                <th className="d-none d-md-table-cell" style={{ width: "25%" }}>
                Date of Birth
                </th>
                <th>Actions</th>
            </tr>
        </thead>
            <tbody>
                { this.state.todolist.map((todo, key) =>
                    <tr>
                        <td key={todo.id}> {todo.title} </td>
                        <td key={todo.id}> {todo.description} </td>
                        <td className="d-none d-md-table-cell">June 21, 1961</td>
                        <td className="table-action">
                        <Edit2 className="align-middle mr-1" size={18} />
                        <Trash className="align-middle" type="submit" onClick={() => this.handleDelete(todo)} size={18}  />
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
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

        <Row>
            <Col lg="12">
            {this.BasicTable()}
        </Col>
        </Row>
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
