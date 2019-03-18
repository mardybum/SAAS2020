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
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get("http://localhost:8000/api/todos/")
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
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
                { this.state.persons.map((person, key) =>
                    <tr>
                        <td key={person.id}> {person.title} </td>
                        <td key={person.id}> {person.description} </td>
                        <td className="d-none d-md-table-cell">June 21, 1961</td>
                        <td className="table-action">
                            <Edit2 className="align-middle mr-1" size={18} />
                            <Trash className="align-middle" size={18} />
                        </td>
                    </tr>
                )}

            </tbody>
        </Table>
    </Card>
    )
  }
}


const BasicForm = () => (
  <Card>
    <CardHeader>
      <CardTitle tag="h5">Basic form</CardTitle>
      <h6 className="card-subtitle text-muted">
        Default Bootstrap form layout.
      </h6>
    </CardHeader>
    <CardBody>
      <Form>
        <FormGroup>
          <Label>Title</Label>
          <Input type="Title" name="title" placeholder="Title" />
        </FormGroup>
        <FormGroup>
          <Label>Description </Label>
          <Input type="Description" name="description" placeholder="Description" />
        </FormGroup>


        <Button color="primary">Submit</Button>
      </Form>
    </CardBody>
  </Card>
);

const BasicTable = () => (

    <PersonList />
);

const Tables = () => (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Tables</h1>

    <Row>
      <Col lg="6">
        <BasicForm />
      </Col>
    </Row>

    <Row>
      <Col lg="12">
        <BasicTable />
      </Col>
    </Row>


  </Container>
);



export default Tables;
