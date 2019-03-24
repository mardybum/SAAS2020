import React, { Component } from "react";
    import Modal from "./components/Modal";
    import axios from "axios";

    class App extends Component {
      constructor(props) {
        super(props);
        this.state = {
          viewCompleted: false,
          activeItem: {
            title: "",
            description: "",
            completed: false
          },
          todoList: []
        };
      }

      componentDidMount() {
        this.refreshList();
      }

      refreshList = () => {
        axios
          .get("http://localhost:8000/api/todos/")
          .then(res => this.setState({ todoList: res.data }))
          .catch(err => console.log(err));
      };

      displayCompleted = status => {
        if (status) {
          return this.setState({ viewCompleted: true });
        }
        return this.setState({ viewCompleted: false });
      };


      renderTabList = () => {
        return (
          <div className="my-5 tab-list">
            <span
              onClick={() => this.displayCompleted(true)}
              className={this.state.viewCompleted ? "active" : ""}
            >
              complete
            </span>
            <span
              onClick={() => this.displayCompleted(false)}
              className={this.state.viewCompleted ? "" : "active"}
            >
              Incomplete
            </span>
          </div>
        );
      };

      renderItems = () => {
        const { viewCompleted } = this.state;

        const newItems = this.state.todoList.filter(
          item => item.completed === viewCompleted
        );

        return newItems.map(item => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
            <span
              className={`todo-title mr-2 ${
                this.state.viewCompleted ? "completed-todo" : ""
              }`}
              title={item.description}
            >
              {item.title}
            </span>
            <span>
              <button
                onClick={() => this.editItem(item)}
                className="btn btn-secondary mr-2"
              >
                {" "}
                Edit{" "}
              </button>

              <button
                onClick={() => this.handleDelete(item)}
                className="btn btn-danger"
              >
                Delete{" "}
              </button>

            </span>
          </li>
        ));
      };

      toggle = () => {
        this.setState({ modal: !this.state.modal });
      };


      handleSubmit = item => {
        this.toggle();
        if (item.id) {
          axios
            .put(`http://localhost:8000/api/todos/${item.id}/`, item)
            .then(res => this.refreshList());
          return;
        }
        axios
          .post("http://localhost:8000/api/todos/", item)
          .then(res => this.refreshList());
      };


      handleDelete = item => {
        axios
          .delete(`http://localhost:8000/api/todos/${item.id}`)
          .then(res => this.refreshList());
      };


      createItem = () => {
        const item = { title: "", description: "", completed: false };
        this.setState({ activeItem: item, modal: !this.state.modal });
      };


      editItem = item => {
        this.setState({ activeItem: item, modal: !this.state.modal });
      };


      render() {
        return (
          <main className="content">
            <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
            <div className="row ">
              <div className="col-md-6 col-sm-10 mx-auto p-0">
                <div className="card p-3">
                  <div className="">
                    <button onClick={this.createItem} className="btn btn-primary">
                      Add task
                    </button>
                  </div>
                  {this.renderTabList()}
                  <ul className="list-group list-group-flush">
                    {this.renderItems()}
                  </ul>
                </div>
              </div>
            </div>
            {this.state.modal ? (
              <Modal
                activeItem={this.state.activeItem}
                toggle={this.toggle}
                onSave={this.handleSubmit}
              />
            ) : null}
          </main>
        );
      }
    }
    export default App;



    // frontend/src/components/Modal.js

    import React, { Component } from "react";
    import {
      Button,
      Modal,
      ModalHeader,
      ModalBody,
      ModalFooter,
      Form,
      FormGroup,
      Input,
      Label
    } from "reactstrap";

    export default class CustomModal extends Component {
      constructor(props) {
        super(props);
        this.state = {
          activeItem: this.props.activeItem
        };
      }
      handleChange = e => {
        let { name, value } = e.target;
        if (e.target.type === "checkbox") {
          value = e.target.checked;
        }
        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem });
      };
      render() {
        const { toggle, onSave } = this.props;
        return (
          <Modal isOpen={true} toggle={toggle}>
            <ModalHeader toggle={toggle}> Todo Item </ModalHeader>
            <ModalBody>
              <Form>
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
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                Save
              </Button>
            </ModalFooter>
          </Modal>
        );
      }
    }










<Table deleteRow={ true } selectRow={ this.selectRowProp }>
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




    <Card>
        <CardHeader>
        <CardTitle tag="h5">Basic Table</CardTitle>
        <h6 className="card-subtitle text-muted">
        Using the most basic table markup, here’s how .table-based tables look
        in Bootstrap.
        </h6>
        </CardHeader>

        <Table deleteRow={ true } selectRow={ this.selectRowProp }>
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